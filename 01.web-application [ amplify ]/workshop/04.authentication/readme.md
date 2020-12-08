# 04. AUTHENTICATION

## LAB PURPOSE

Create User Directory and authenticaction for the users

## DEFINITIONS
----
### Amazon Cognito

Amazon Cognito lets you add user sign-up, sign-in, and access control to your web and mobile apps quickly and easily. We just made a User Pool, which is a secure user directory that will let our users sign in with the username and password pair they create during registration. Amazon Cognito (and the Amplify CLI) also supports configuring sign-in with social identity providers, such as Facebook, Google, and Amazon, and enterprise identity providers via SAML 2.0

## STEPS

### AUTHENTICATION

1. Be sure to be in **library** directory 

2. Run ```amplify add auth``` to add authentication to the app

3. Select **Default Configuration** when asked if you’d like to use the default authentication and security configuration

4. **Select Username** when asked how you want users to sign in

5. Select **No, I am done**

7. Run ```amplify push``` to create these changes in the cloud

8.  Add the **aws-amplify** and **aws-amplify-react** modules to our app by typing 
```bash
npm install --save aws-amplify@3.0.7 aws-amplify-react@3.1.9
```

9. Replace **src/App.js** with file **App.js** which is saved in **source** directory

### CREATE AN ACCOUNT

1. Create an account in the app’s web interface by providing a username, password, and a valid email address (to receive a confirmation code at).

2. Check your email. You should have received a confirmation code message. Copy and paste the confirmation code into your app and you should then be able to log in with the username and password you entered during sign up.

3. Once you sign in, the form disappears and you can see our App component rendered below a header bar that contains your username and a ‘Sign Out’ button.

