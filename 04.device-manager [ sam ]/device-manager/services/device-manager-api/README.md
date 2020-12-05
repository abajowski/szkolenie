# DEVICE MANAGER API

# DEPLOYMENT

Run the script responsible for creating all components 

  ```bash
    ./deploy.sh param1 param2 param3 param4 param5
  ```
 
 ```
  param1: Project name. Allowed valued:  Only alphanumeric characters and hyphens
  param2: Name of the bucket for lambda artifacts
  param3: Deployment type. Could be 'L' ( for deployment from local computer ) or 'C' ( for deployment from  codepipeline )
  param4: AWS Region
  param5: Environment. Allowed values dev, test, prod
```


Example:
  ```bash
    ./deploy.sh device-manager-api abajowski L eu-west-1 dev
  ```

 