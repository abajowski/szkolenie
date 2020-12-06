# DEVICE STORAGE SERVICE

# DEPLOYMENT

Run the script responsible for creating all components 

  ```bash
    ./deploy.sh param1 param2 param3 param4 param5 param6
  ```
 
 ```
  param1: Project name. Allowed valued:  Only alphanumeric characters and hyphens
  param2: Name of the bucket for lambda artifacts
  param3: Deployment type. Could be 'L' ( for deployment from local computer ) or 'C' ( for deployment from  codepipeline )
  param4: AWS Region
  param5: Environment. Allowed values dev, test, prod
  param6: Arn of the sns topic which comes from device manager API
```


Example:
  ```bash
    ./deploy.sh device-storage abajowski L eu-west-1 dev arn:aws:sns:eu-west-1:646407006236:device-manager-api-NewDeviceSns-97EZUWZAYBGG
  ```