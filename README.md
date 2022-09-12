# YelpCamp
Full Stack Web Application which shows different campgrounds uploaded by users for rent.

## Requirements:
* MongoDB: [Installation Link](https://www.mongodb.com/docs/manual/administration/install-community/)
* NodeJs: [Installation Link](https://nodejs.org/en/download/)

## Steps to run the Application:

### Step1:
Install and Setup the above requirements.

### Step2:
Download and save the Repository at your desired location.

### Step3:
Open Terminal and enter ``mongod`` command to start the MongoDB Database, and leave it running in the background.

### Step4:
Open new Terminal window at the root of the saved Repository.

### Step5:
Enter the following commands in the given order:
* ``npm init`` - This command will install all the dependencies.
* ``node seeds/seed.js`` - This command will populate the database with testing data.
* ``nodemon app.js`` - This command will start the application.

### Step6:
Once all the above steps are done, Open any brower and go to [localhost:3000](https://localhost:3000/campgrounds) to use the application.
