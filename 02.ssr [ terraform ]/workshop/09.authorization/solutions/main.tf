locals {
  environment = "dev"
}

provider "aws" {
  region  = var.aws_region
}

provider "aws" {
  alias   = "us-east-1"
  region  = "us-east-1"
}

terraform {

  backend "s3" {
    bucket  = "cd-nextjs-on-the-edge"
    key     = "terraform.tfstate"
    region  = "eu-west-1"
    encrypt = true
  }
}

module "storage" {
  source                 = "./modules/storage"
  environment            = local.environment
  application            = var.application
  origin_access_identity = module.cdn.origin_access_identity
}

module "cdn" {
  source             = "./modules/cdn"
  environment        = local.environment
  origin_domain_name = module.storage.origin_domain_name
  orgin_api_domain_name = trimprefix(trimsuffix(module.api.domain_name, "/${local.environment}"), "https://")
  application        = var.application
  origin_request     = module.lambda_at_edge.origin_request
  
  providers = {
    aws = aws.us-east-1
  }
}

module "lambda_at_edge" {
  source      = "./modules/lambda-at-edge"
  environment = local.environment
  application = var.application
  providers = {
    aws = aws.us-east-1
  }
}

module "api" {
  source          = "./modules/api"
  environment     = local.environment
  application     = var.application
  region      = var.aws_region
  blog_table_name = module.storage.blog_table_name
  blog_table_arn  = module.storage.blog_table_arn
  
}

module "user_directory" {
  source      = "./modules/user-directory"
  environment = local.environment
  application = var.application
  region      = var.aws_region
}
