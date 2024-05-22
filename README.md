# HopOn
**Date:** May 14, 2024
**Contributors:** Sneha Agarwal, Riya Gupta, Sanjana Rathore, Aaryan Rustagi, Rushil Shah, Suhani Shukla

Color Codes: 
Background White: FFFFFF
Eggshell White: F0EAD6
Brown: 3d2814

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

## Setting up Dependencies
Client Side
1. cd client
2. npm install --legacy-peer-deps
3. npm install react-typed --legacy-peer-deps
4. npm install @material-ui/core --legacy-peer-deps
5. npm install reactjs-popup --legacy-peer-deps
6. npm install react-icons --save
7. npm install react-router-dom --legacy-peer-deps


Server Side
1. cd server
2. npm install body-parser cors express mongoose nodemon

Run npm start in client. 


