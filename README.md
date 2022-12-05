# Capstone Project
Carbs & Me is a clone full-stack web application inspired by YouTube.

[visit the liveLink here](https://carbsandme.onrender.com)

## Wiki Link
https://github.com/CasstielP/Captstone-Project/wiki

## Technologies 
1. Python 
2. Flask
3. Javascript
4. React
5. Redux
6. AWS s3


## MVP Core features
Carbs&Me, a video-sharing service, is a website for users to share videos, see other users' video-posts, and interact with the community by liking and commenting.

## 1. New account creation, log in, log out, and guest/demo login
* Users can sign up, log in, and log out.
* Users can use a demo login to try the site.
* Users can't use certain features without logging in (like upload videos and commenting).
* Logged in users are directed to home page where all the available videos are displayed. 
* Logged out users can also be on the home page and the video detail page, no access to perform actions like comments, liking, or uploading videos.

## 2. Hosting on Render

## 3. Videos (CRUD)
* Logged in users can upload videos. 
* Logged in users can edit and delete their own videos.
* Logged in and logged out users can videos all available videos as well as the video detail page to watch the video.

## 4. Comments (CRUD)
* Logged in users can post comments on videos(not including their own). 
* Logged in users can edit and delete their own comments.
* Logged in and logged out users can view the comments on a video.

 







## Home Page
![image](https://user-images.githubusercontent.com/106496513/205553801-4f91eda2-8e24-4f77-a120-e2dfb81f33cb.png)

## Login & Sign Up Page
![image](https://user-images.githubusercontent.com/106496513/205553919-08978708-977a-44d7-8718-705494f6d095.png)
![image](https://user-images.githubusercontent.com/106496513/205553937-e6f6f4fe-6634-47fb-8859-ba7565d079c2.png)


## Video Detail Page
![image](https://user-images.githubusercontent.com/106496513/205554056-1152a440-9f38-4352-94bb-891f1806f098.png)


## User Profile Page
![image](https://user-images.githubusercontent.com/106496513/205554116-f51a2692-1299-46bc-8c42-d566ed8de1ea.png)




## Future Implementation Goals
##  Likes (CRUD)
Logged in users can like or unlike on videos and comments.
logged in users can remove like or unlike of videos or comments by click on the buttons again.
the amount of likes and unlikes will be displayed as numbers along side of the videos and comment components. 

##  Search bars 
logged in users and logged out users can use search bar to search for videos with titles that are part, or of the input typed in the search bar

##  subscribe (CRD)
Logged in users can subscribe and unsubscribe to the channel (other user' account) 


## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file


5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
