# HopOn
**Contributors:** Sneha Agarwal, Riya Gupta, Sanjana Rathore, Aaryan Rustagi, Rushil Shah, Suhani Shukla

HopOn is a full stack web application built using the MERN stack designed for college students. HopOn allows students to post their ride details including starting location, destination, time, and available seats. Other students can then join the ride through the app if they need transportation to the same destination or somewhere along the way.

## Overview of Topics
- [Setup](#cloning-the-repo-locally)
- [Features](#when-do-we-need-databases)
- [Technology](#types-of-databases)
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

**Setting up Dependencies + Running the App
Client Side
1. cd client
2. npm install
3. npm start


Server Side
1. cd server
2. npm install body-parser cors express mongoose nodemon axios
3. npm start

Open 2 terminals for client and server and run npm start in both. 


