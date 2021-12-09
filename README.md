# CornBot

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.

To run application: 

npm install

ng serve --port 8081

Note: At one point, ngx charts was causing compilation errors regarding missing types for d3. This issue should be fixed with a rollback to a previous ngx chart version, but if you do see these errors, run ‘npm install @types/d3 --save-dev’ to resolve. It is not necessary to run every command recommended by the compiler. 

Follow instructions in backend repository to run Django backend

## Release Notes: Code Milestone 1

User authentication (registration and login) is functional. Front end angular is communicating with Django backend to create and authenticate users using HTTP service calls. 

## Release Notes: Code Milestone 2

User can use Activity One to train 10 images (selected at random from the backend). Each user label is posted to the backend for persistence. 

## Release Notes: Code Milestone 3

Activity 1 and 2 are functional. User labels are posted to backend, and the model is being run on those choices. 

## Release Notes: Code Milestone 4

All learning activities and leaderboard are fully functional. 

## Release Notes: Code Milestone 5

All learning activities, leaderboard, and second analytics page are fully functional. 
