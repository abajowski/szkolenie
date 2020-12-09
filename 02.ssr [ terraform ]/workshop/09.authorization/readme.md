# 08. Authorization

## LAB PURPOSE

Create User Directory and authenticaction for the users

## DEFINITIONS
----
### Amazon Cognito

Amazon Cognito lets you add user sign-up, sign-in, and access control to your web and mobile apps quickly and easily. We just made a User Pool, which is a secure user directory that will let our users sign in with the username and password pair they create during registration. Amazon Cognito (and the Amplify CLI) also supports configuring sign-in with social identity providers, such as Facebook, Google, and Amazon, and enterprise identity providers via SAML 2.0

## STEPS

### CREATE COGNITO


1. Inside **modules**  directory create **user-directory** directory

2. Inside **user-directory** directory create two files  **user-directory.tf** and **variables.tf**

3. Define variables for the the cdm module in the **variables.tf** file

```terraform
variable "application" {
  type        = string
  description = "Application name"
}

variable "environment" {
  type        = string
  description = "Environment (e.g. `prod`, `dev`, `staging`)"
}

variable "region" {
  type        = string
  description = "Region where app should be deployed"
}

```

4. Add to the ***user-directory.tf** code that create Cognito User Pool

```terraform
resource "aws_cognito_user_pool" "user_directory" {
  name = "cognito-user-pool-${var.environment}-${var.application}"

  admin_create_user_config {
    allow_admin_create_user_only = false
  }

  auto_verified_attributes = ["email"]
  username_attributes      = ["email"]


  username_configuration {
    case_sensitive = false
  }


  password_policy {
    minimum_length                   = 8
    require_uppercase                = true
    require_lowercase                = true
    require_numbers                  = false
    require_symbols                  = true
    temporary_password_validity_days = 7
  }

  schema {
    name                = "email"
    attribute_data_type = "String"
    mutable             = false
    required            = true

    string_attribute_constraints {
      min_length = 0
      max_length = 100
    }
  }

  lifecycle {
    ignore_changes = [
      schema
    ]
  }
}

```

5. Add Coggnito Client 

```
resource "aws_cognito_user_pool_client" "user_pool_client" {
  name = "cognito-user-pool-client-${var.environment}-${var.application}"

  user_pool_id    = aws_cognito_user_pool.user_directory.id
  generate_secret = false

  explicit_auth_flows = [
    "ADMIN_NO_SRP_AUTH",
    "USER_PASSWORD_AUTH",
  ]

}

```

6. Add User Pool Domain

```
resource "aws_cognito_user_pool_domain" "main" {
  domain       = "${var.environment}-${var.application}"
  user_pool_id = aws_cognito_user_pool.user_directory.id
}
```

7. Now let's create a lambda function which will be modyfiying token generate by cognito, to do so copy directory **functions** to **user-directory** module, and then add terraform resources


```terraform
data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "lambda_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = [
        "lambda.amazonaws.com"
      ]
    }
  }
}

resource "aws_iam_role" "lambda_execution_role" {
  name               = "cognito-lambda-execution-role-${var.environment}-${var.application}"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attachement" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

resource "aws_iam_policy" "lambda_policy" {
  name   = "cognito-lambda-policy-${var.environment}-${var.application}"
  policy = data.aws_iam_policy_document.lambda_policy_document.json
}

data "aws_iam_policy_document" "lambda_policy_document" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    effect    = "Allow"
    resources = ["arn:aws:logs:*:*:*"]
  }
}

data "archive_file" "pre_token_generation" {
  type        = "zip"
  output_path = "${path.module}/tmp/bundle.zip"
  source_dir  = "${path.module}/functions"
}

resource "aws_lambda_function" "pre_token_generation" {
  description      = "Function customize message sent to the users"
  filename         = data.archive_file.pre_token_generation.output_path
  function_name    = "${var.environment}-${var.application}-pre-token-generation"
  handler          = "pre-token-generation.handler"
  memory_size      = 256
  role             = aws_iam_role.lambda_execution_role.arn
  runtime          = "nodejs12.x"
  source_code_hash = data.archive_file.pre_token_generation.output_base64sha256
  timeout          = 60
  publish          = true
}

resource "aws_lambda_permission" "pre_token_generation" {
  principal     = "cognito-idp.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.pre_token_generation.arn
  source_arn    = aws_cognito_user_pool.user_directory.arn
}

resource "aws_cloudwatch_log_group" "pre_token_generation" {
  name              = "/aws/lambda/${var.environment}-${var.application}-pre-token-generation"
  retention_in_days = 14
}
```

8. Now let's connect lamnbda with cognito. To do so you have to add to the **aws_cognito_user_pool** resource

```
  lambda_config {
    pre_token_generation = aws_lambda_function.pre_token_generation.arn
  }
```

your resource should looks like that:

```
resource "aws_cognito_user_pool" "user_directory" {
  name = "cognito-user-pool-${var.environment}-${var.application}"

  admin_create_user_config {
    allow_admin_create_user_only = false
  }

  auto_verified_attributes = ["email"]
  username_attributes      = ["email"]


  username_configuration {
    case_sensitive = false
  }

  lambda_config {
    pre_token_generation = aws_lambda_function.pre_token_generation.arn
  }

  password_policy {
    minimum_length                   = 8
    require_uppercase                = true
    require_lowercase                = true
    require_numbers                  = false
    require_symbols                  = true
    temporary_password_validity_days = 7
  }

  schema {
    name                = "email"
    attribute_data_type = "String"
    mutable             = false
    required            = true

    string_attribute_constraints {
      min_length = 0
      max_length = 100
    }
  }

  lifecycle {
    ignore_changes = [
      schema
    ]
  }
}

```

8. Add the module to the project. In the **main.tf** file in the **ssr** directory add
```terraform
module "user_directory" {
  source      = "./modules/user-directory"
  environment = local.environment
  application = var.application
  region      = var.aws_region
}

```

9. Go to **ssr** directory and deploy the infrastructure

```terraforrm
terraform init
```

```terraforrm
terraform plan
```

```terraforrm
terraform apply
```

10. Go to AWS console and verify if lambda and coggnito is created
