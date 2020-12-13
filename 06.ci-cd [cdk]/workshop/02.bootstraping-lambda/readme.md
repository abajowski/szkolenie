# 01. Bootstraping

## LAB PURPOSE

Create CDK based empty project

# Boostraping project

```
 mkdir pipeline && cd pipeline
```
```
    cdk init app --language=typescript
```

Select `app`

Modify `~/.aws/credentials` to rename the profile to cdk

```bash
    cdk bootstrap aws://365033952998/eu-west-1
```

add 
```
        "aws-cdk": "*",
        "@aws-cdk/core": "*",
        "@aws-cdk/assert": "*",
        "@aws-cdk/aws-apigateway": "*",
        "@aws-cdk/aws-codebuild": "*",
        "@aws-cdk/aws-codecommit": "*",
        "@aws-cdk/aws-codepipeline": "*",
        "@aws-cdk/aws-codepipeline-actions": "*",
        "@aws-cdk/aws-cloudformation": "*",
```
to package.json

create lambda-stack.ts in lib directory

