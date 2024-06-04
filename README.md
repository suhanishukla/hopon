# HopOn
**Date:** May 14, 2024
**Contributors:** Sneha Agarwal, Riya Gupta, Sanjana Rathore, Aaryan Rustagi, Rushil Shah, Suhani Shukla

Color Codes: 
Background White: FFFFFF
Eggshell White: F0EAD6
Brown: #401c19

## Cloning the Repo
1. cd Desktop
2. git clone <url link>
3. cd hopon

You are now in the hopon project folder!
## This project runs node version 16.20.2
Using nvm to run the right version https://github.com/nvm-sh/nvm
1. $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
2. add it to your path: $ export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
3. run $ nvm install 16.20.2
4. $ nvm use 16.20.2 

## Setting up Dependencies + Running the App
Client Side
1. cd client
2. npm install
3. npm start


Server Side
1. cd server
2. npm install body-parser cors express mongoose nodemon axios
3. npm start

Open 2 terminals for client and server and run npm start in both. 


