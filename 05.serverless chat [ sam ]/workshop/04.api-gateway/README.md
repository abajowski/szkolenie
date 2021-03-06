# 04 API GATEWAY

## LAB PURPOSE

Create WebSocket API in API Gateway that handles the connections between the client and service

## DEFINITIONS
----

### API GATEWAY

Amazon API Gateway is an AWS service for creating, publishing, maintaining, monitoring, and securing REST, HTTP, and WebSocket APIs at any scale.

## STEPS

### API GATEWAY

1. Copy the **infrastructure.yaml** file from the previous lab to this directory.

2. You need to create API Gateway. Below you have cloudformation resource which is responsible for that. You need to add this clloudformation resource to your **infrastructure.yaml** file. Please add it to section **Resources**. If you need any help check how the solution should look like. To check what each field represent go to cloudformation documentation **hhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html**

  ```yaml
  ApiGateway:
    Type: AWS::ApiGatewayV2::Api
    Properties:
      Name: ApiGateway
      ProtocolType: WEBSOCKET
      RouteSelectionExpression: "$request.body.action"
  ```


3. Upload local artifacts that might be required by your template. To do so, use the command listed below. In response, you should see serverless-chat-tmp.yaml. This is a template after SAM transformation. Open it and familiarize with its structure.

```bash
 aws cloudformation package --template-file infrastructure.yaml --s3-bucket $ARTIFACT_BUCKET --output-template-file serverless-chat-tmp.yaml
```

4. After you package your template's artifacts, run the deploy command to deploy the returned template.

```bash
  aws cloudformation deploy --template-file serverless-chat-tmp.yaml --stack-name $PROJECT_NAME --capabilities CAPABILITY_NAMED_IAM --parameter-overrides ProjectName=$PROJECT_NAME Environment=$ENVIRONMENT
```

5. Go to cloudformation console  https://console.aws.amazon.com/cloudformation, find your stack **serverless-chat**, and verify what resources have been created, to do that, go to section **Resources**. 

6. Go to dynamo db console **https://console.aws.amazon.com/dynamodb**, find your table, and verify what have been created

7. End of the lab. Your first cloudformation stack is ready.
