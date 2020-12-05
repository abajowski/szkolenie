# 06. STORAGE

## LAB PURPOSE

Build storage for hosting images

## DEFINITIONS
----
### AWS S3

Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. This means customers of all sizes and industries can use it to store and protect any amount of data for a range of use cases, such as data lakes, websites, mobile applications, backup and restore, archive, enterprise applications, IoT devices, and big data analytics. Amazon S3 provides easy-to-use management features so you can organize your data and configure finely-tuned access controls to meet your specific business, organizational, and compliance requirements. 

## STEPS

### AUTHENTICATION

1. Be sure to be in ***albums** directory 

2. Run ```amplify add storage``` to add storage

3. Select ***Content** at the prompt

4. Enter values or accept defaults for the resource category and bucket name

5. Choose Auth users only when asked who should have access. Configure it so that authenticated users have access with create/update, read, and delete access (use the spacebar to toggle on/off, the arrow keys to move, and Enter to continue).

6. Select Yes when asked to add a Lambda Trigger for your S3 Bucket and select Create new function. This will create a Lambda function that will get triggered by S3 Events. Later on we’ll use this function for photo processing.

7. Select No when asked to edit a the Lambda function. We’ll do this at a later step in the workshop.

8. Run amplify push

9. Press Enter to confirm the changes

### UPDATE THE APP

1. From the albums directory, run ```npm install --save uuid @aws-amplify/storage```

2. Replace ***src/App.js*** with file ***App.js*** which is saved in ***source*** directory

3. Check out the app now and try out the new features