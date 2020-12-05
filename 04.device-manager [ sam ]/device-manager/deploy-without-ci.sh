# Usage:
#  ./deploy-without-ci.sh param1 param2 param3 param4
#
# * param1: Project name
# * param2: AWS Region
# * param3: Environment. Allowed values: dev, test, prod
#
# Example:
#  ./deploy-without-ci.sh device-manager eu-west-1 dev

PROJECT_NAME=$1
AWS_REGION=$2
ENVIRONMENT=$3
DEPLOYMENT_TYPE=L

echo '###### ARTIFACTS STACK ######'

aws cloudformation deploy  --template-file infrastructure/artifacts.yaml --stack-name "$PROJECT_NAME-artifacts" --capabilities CAPABILITY_NAMED_IAM --parameter-overrides ProjectyName=$PROJECT_NAME --region=$AWS_REGION
BUCKET=$(aws cloudformation describe-stacks --stack-name "$PROJECT_NAME-artifacts" --query "Stacks[0].Outputs[?OutputKey=='ArtifactBucket'].OutputValue" --output text --region=$AWS_REGION)

echo '###### MANAGER API STACK ######'

cd ./services/device-manager-api/
./deploy.sh "$ENVIRONMENT-$PROJECT_NAME-api" $BUCKET $DEPLOYMENT_TYPE $AWS_REGION $ENVIRONMENT
cd ../../

NEW_DEVICE_SNS_ARN=$(aws cloudformation describe-stacks --stack-name "$ENVIRONMENT-device-manager-api" --query "Stacks[0].Outputs[?OutputKey=='NewDeviceSnsArn'].OutputValue" --output text --region=$AWS_REGION)

echo '###### DEVICE CONFIGURATION STACK ######'

cd ./services/device-configuration/
./deploy.sh "$ENVIRONMENT-$PROJECT_NAME-configuration" $BUCKET $DEPLOYMENT_TYPE $AWS_REGION $ENVIRONMENT $NEW_DEVICE_SNS_ARN
cd ../../

echo '###### DEVICE STORAGE STACK ######'

cd ./services/device-storage/
./deploy.sh "$ENVIRONMENT-$PROJECT_NAME-storage" $BUCKET $DEPLOYMENT_TYPE $AWS_REGION $ENVIRONMENT $NEW_DEVICE_SNS_ARN
cd ../../

echo '###### SAP NOTIFICATIONS STACK ######'

cd ./services/sap-notification/
./deploy.sh "$ENVIRONMENT-$PROJECT_NAME-sap-notification" $BUCKET $DEPLOYMENT_TYPE $AWS_REGION $ENVIRONMENT $NEW_DEVICE_SNS_ARN
cd ../../