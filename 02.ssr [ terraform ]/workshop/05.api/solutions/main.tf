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
}

module "api" {
  source          = "./modules/api"
  environment     = local.environment
  application     = var.application
  region      = var.aws_region
  blog_table_name = module.storage.blog_table_name
  blog_table_arn  = module.storage.blog_table_arn
  
}
