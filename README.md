## _**PLEASE READ THIS TO COMPLETION BEFORE ASKING ANY QUESTIONS!**_

### _**IMPORTANT NOTES**_ - 
DEVELOPMENT.
- local development: create a config file (make sure to name it dev.env) in the config folder including you variables in .sample.env. 

##  Screens
![Start](https://i.ibb.co/DVXCRqR/start-scr.png)
![Quiz](https://i.ibb.co/Pz5c48P/quiz-scr1.png)
![Quiz](https://i.ibb.co/TgcKhK5/quiz-scr2.png)
![Quiz](https://i.ibb.co/TmQtVCq/quiz-scr3.png)
![Final](https://i.ibb.co/rHQXW61/Final-scr.png)

## Available Scripts

For server app
Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:4000) to view the client in the browser.
-development
### `yarn  dev`

-production
### `yarn start`

-build
### `yarn build`

-test
### `yarn test`


For client app
Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `yarn start`

Note: No tests for client app.



## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `screens` - These represent a all screens in out application
    - #### `API` - These represent a all services(requests) our app needed
    - #### `context` - These represent a contexts used as global state store to our app
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines yarn behaviors and packages for the client
#### `server` - Holds the server application
- #### `src`
    - #### `config` - This holds our configuration files, like PORT.
    - #### `controllers` - These hold all of the callback functions that each route will call
    - #### `Data` - This holds all of our data in json file
    - #### `tests` - This holds all of our server tests that we have defined
    - #### `app.ts` - Defines our app configuration, middlewares and etc..
    - #### `server.ts` - Defines network configuration of our app
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!

