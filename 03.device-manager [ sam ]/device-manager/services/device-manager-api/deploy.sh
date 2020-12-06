#!/bin/bash

# Usage:
#  ./deploy.sh param1 param2 param3 param4 param5
#
# * param1: Project name
# * param2: Name of the bucket for lambda artifacts
# * param3: Deployment type. Could be 'L' ( for deployment from local computer ) or 'C' ( for deployment from  codepipeline )
# * param4: Region
# * param5: Environment. Allowed values dev, test, prod
#
# Example:
#  ./deploy.sh device-manager-api abajowski L eu-west-1 dev

echo -e '\n## INSTALLING NPM DEPENDENCIES:\n'
npm install --quiet

echo -e '\n## AUDITING PACKAGE DEPENDENCIES FOR SECURITY VULNERABILITIES\n'
npm audit

echo -e '\n## RUNNING UNIT TESTS\n'
npm run test

echo -e '\n## REMOVING DEV DEPENDENCIES\n'
npm prune --production

echo -e '\n## CREATING DIRECTORY FOR TEMPORARY FILES\n'
mkdir ./temp

echo -e '\n## PREPARING OPEN API DOCUMENTATION FOR API\n'
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --output text --query 'Account')
export AWS_REGION=$4
npx envsub ./docs/open-api.tpl.yaml ./temp/open-api.yaml

echo -e '\n## DEPLOYING LAMBDAS TO S3 & PERFORMING CLOUDFORMATION TRANSFORMATION\n'
aws cloudformation package --template-file infrastructure.yaml --s3-bucket $2 --output-template-file temp/device-manager-api-tmp.yaml
if [ $3 == "L" ]
then
  echo -e '\n## DEPLOYING CLOUDFORMATION SCRIPT\n'
  aws cloudformation deploy  --template-file temp/device-manager-api-tmp.yaml --stack-name $1 --capabilities CAPABILITY_NAMED_IAM --parameter-overrides ProjectName=$1 Environment=$5 NewDeviceTopicArn=$6 --region=$4
fi


