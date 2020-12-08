# 05. CREATE API 

## LAB PURPOSE

Create API Gateway and AWS Lambda for render and serve contenent

## DEFINITIONS
----

### AWS LAMBDA

AWS Lambda allow you to run code without provisioning or managing servers. You pay only for the compute time you consume - there is no charge when your code is not running.

### API GATEWAY

Amazon API Gateway is an AWS service for creating, publishing, maintaining, monitoring, and securing REST, HTTP, and WebSocket APIs at any scale.

## STEPS

### CREATE LAMBDA FUNCTION

2. Inside **modules**  directory create **api** directory

3. Inside **api** directory create two files **lambda.tf** and **variables.tf**

4. Define variables for the the api module in the **variables.tf** file

```terraform
variable "application" {
  description = "Application name"
}

variable "environment" {
  description = "Environment (e.g. `prod`, `dev`, `staging`)"
}

variable "region" {
  description = "Region where vpc should be deployed"
}

variable "blog_table_name" {
  description = "Blog table name"
}

variable "blog_table_arn" {
  description = "Blog table arn"
}
```

5. Now let's prepare the nextjs code to be run on lambda function. To do so, copy **src** directory into **api** directory