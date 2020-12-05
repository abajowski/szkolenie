# Usage:
#  ./deploy-with-ci.sh param1 param2 param3 param4
#
# * param1: Project name
# * param2: AWS Region
# * param3: Environment. Allowed values: dev, test, prod
#
# Example:
#  ./deploy-with-ci.sh device-manager eu-west-1 dev

PROJECT_NAME=$1
AWS_REGION=$2
ENVIRONMENT=$3
DEPLOYMENT_TYPE=C

echo '###### ARTIFACTS STACK ######'

aws cloudformation deploy  --template-file infrastructure/artifacts.yaml --stack-name "$PROJECT_NAME-artifacts" --capabilities CAPABILITY_NAMED_IAM --parameter-overrides ProjectyName=$PROJECT_NAME --region=$AWS_REGION
BUCKET=$(aws cloudformation describe-stacks --stack-name "$PROJECT_NAME-artifacts" --query "Stacks[0].Outputs[?OutputKey=='ArtifactBucket'].OutputValue" --output text --region=$AWS_REGION)

echo '###### CI STACK ######'

aws cloudformation deploy  --template-file infrastructure/ci.yaml --stack-name "$ENVIRONMENT-$PROJECT_NAME-ci" --capabilities CAPABILITY_NAMED_IAM --parameter-overrides ProjectyName=$PROJECT_NAME RepositoryName=$PROJECT_NAME Environment=$ENVIRONMENT --region=$AWS_REGION
