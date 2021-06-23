# Todoist Task Timer
A simple demo app that shows elapsed time since a task was created in todoist tasks


# How to run this project

### Step: 1

First, you need to create a new app on todoist developer console using this link [Todoist Developer Console](https://developer.todoist.com/appconsole.html)

### Step: 2

Create an .env file in this projects root directory and copy the clientID and client secret of your app in the two following variable names respectively

`REACT_APP_CLIENT_ID=<yourclientid>`


`REACT_APP_CLIENT_SECRET=<yourclientsecret>`

### Step: 3

Set the Redirect url of your app in the todoist developer console to the following url

`Oauth Redirect Url: http://localhost:3000/auth/`


### Step: 4
If you do not have nodejs installed install it first from [Nodejs Download Page](https://nodejs.org/en/download/)

It will install both node and npm

Then go to the root directory of this project and run the following command in terminal to install all the dependencies using\
`npm install`


### Step: 5
Run The project using\
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Step: 6
Now create any task in any of your todoist project and it will show the time elapsed since each task was first created in a bar chart

![screenshot](https://raw.githubusercontent.com/ayonshafiul/todoist-task-timer/main/ss.jpg "Scrennshot")
