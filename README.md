## HopOn
**Authors:** Sneha Agarwal, Riya Gupta, Sanjana Rathore, Aaryan Rustagi, Rushil Shah, Suhani Shukla

HopOn is a full stack web application built using the MERN stack designed for college students. HopOn allows students to post their ride details including starting location, destination, time, and available seats. Other students can then join the ride through the app if they need transportation to the same destination or somewhere along the way.

## Table of Contents
- [Setup](#cloning-the-repo-locally)
- [Features](#features)
- [Technology](#technology)
- [Demo](#demo)

## Cloning the Repo Locally
1. cd Desktop
2. git clone <url link>
3. cd hopon

You are now in the hopon project folder!

**This project runs node version 16.20.2**

Using nvm to run the right version https://github.com/nvm-sh/nvm
1. $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
2. add it to your path: $ export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
3. run $ nvm install 16.20.2
4. $ nvm use 16.20.2 

**Setting up Dependencies + Running the App**

Client Side
1. cd client
2. npm install
3. npm start


Server Side
1. cd server
2. npm install body-parser cors express mongoose nodemon axios
3. npm start

Open 2 terminals for client and server and run npm start in both.

## Features
- **User Authentication:** Users will provide their email address to make an account. To verify that the users are college students, we will require that the user provide a university-issued email address ending with .edu. A verification email will be sent to the provided email address to confirm the email address in order to finish account creation.  
- **Post a Ride:** Users can post a ride for other users to join with the following fields: starting location, ending location, date, and time. 
- **Find a Ride:** Users can filter through posted rides using the same fields as above, with a search bar-type functionality. Using the Google Maps API, we created a function to display rides with starting and ending locations within a 5-mile radius of the search filters. The rides displayed are also within a 30-minute window of the entered start time. 
- **Join a Ride:** Users can join posted rides and also email the poster of the ride (at their registered email address). Once a user joins a ride, the number of seats available dynamically updates as well.
- **Google Maps API** Uses the Google Maps API for autocomplete when users are posting a ride through "Post a Ride" and querying in "Find a Ride." Dynamically renders based on the users starting and ending destination to route their trip and notify the user of the trip distance.
- **Contact Ride Poster:**: Users can contact the poster of specific rides via email at the poster's registered email address. The body of the email is dynamically generated to include information about the ride. 

## Tech Stack
-  **Frontend:** React.js, Javascript, Node.js
-  **Backend:** MongoDB, Express.js

## Demo
Here is the [link](https://youtu.be/ZYFLZG8MmI8) to our demo!
Link to the [slides](https://docs.google.com/presentation/d/1Ue1jCFV2XnbQSuY8iBo3NQaR9KuW1c-cmDeJW9I-z8Y/edit?usp=sharing)
