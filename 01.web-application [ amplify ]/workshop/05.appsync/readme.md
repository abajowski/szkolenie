# 05. APP SYNC

## LAB PURPOSE

Build AWS AppSync API, a managed GraphQL service for building data-driven apps. 

## DEFINITIONS
----
### AWS AppSync

AWS AppSync is a fully managed service that makes it easy to develop GraphQL APIs by handling the heavy lifting of securely connecting to data sources like AWS DynamoDB, Lambda, and more. Adding caches to improve performance, subscriptions to support real-time updates, and client-side data stores that keep off-line clients in sync are just as easy. Once deployed, AWS AppSync automatically scales your GraphQL API execution engine up and down to meet API request volumes.

## STEPS

### AUTHENTICATION

1. Be sure to be in ***library** directory 

2. Run ```amplify add api``` to add authentication to the app

3. Select ***GraphQL** from one of the listed services

4. Provide API name: ***albums***

5. Choose an authorization type for the API ***Amazon Cognito User Pool***

6. Choose ***No** for the question: Do you have an annotated GraphQL schema

7. Select ***yes*** for the question: Do you want a guided schema creation

8. Set ***One-to-many relationship*** as an option which best describe the project

9. Select ***Yes*** for thq question: Do you want to edit the schema now

10. Replace the file with the content of the file ***schema.graphql*** located in src directory

11. Return to your command prompt and press Enter once to continue

12. Run ***amplify push*** and confirm you’d like to continue with the updates

13. When prompted about code generation, select ***Yes***, then choose ***javascript***, and accept the defaults for the remaining prompts.

14. Wait a few minutes while Amplify takes care of provisioning new resources for us

15. At this point, without having to write any code, we now have a GraphQL API that will let us perform CRUDL operations on our Album and Photo data types!

16. Open the AWS Console, browse to AppSync, make sure you’re in your chosen region and click into the albums-master API. Now we can start poking around with the API.

17. Click Queries in the sidebar on the left.

18. Click the Login with User Pools button at the top of the query editor.

19. Look up the value for the ClientId, to do so In Cloud9, open ***albums/src/aws-exports.js***
Copy the value of the ***aws_user_pools_web_client_id*** property

20. Paste the value into the ClientId field

21. Enter your credentials for the user you created when we added authentication

22. Click Login

23. Add a new album by copy/pasting the following and running the query:

```
mutation {
    createAlbum(input:{name:"First Album"}) {
        id
        name
    }
}
```

24. Add another album by editing and re-running your createAlbum mutation with another album name:
mutation {
    createAlbum(input:{name:"Second Album"}) {
        id
        name
    }
}

25. List all albums by running this query:
query {
    listAlbums {
        items {
            id
            name
        }
    }
}

### UPDATE THE APP

1. From the albums directory, ```run npm install --save react-router-dom @aws-amplify/api``` to add new dependencies for routing and specific modules we’ll use from Amplify.

2. Replace ***src/App.js*** with file ***App.js*** which is saved in ***source*** directory

3. Check out the app now and try out the new features