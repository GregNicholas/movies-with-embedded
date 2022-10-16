This app is a simple movie display list consuming a list of movies from the API, https://api.themoviedb.org/. A second web application is embedded. That app is an empty scrollable list. When a card from the main application is clicked, the title of the movie will be added to the list in the embedded app.

The layout is similar to the sample given. In the interest of time, a simple flex is used to display the cards with a title, poster image, and movie description. Many potential layouts could be used here. Focus was given to emphasized points in the assignment.

An iframe element was used to hold the embedded app. The size is set in css to fit the container given. To be able to communicate with the embedded web app, I used a ref for the iframe element, and then postMessage to send the movie title to the embedded app. This is in an onClick handler function.

In the embedded app, there is an event listener, listening for a message, checking if the origin is correct, then appending an li to the list. 

Possible enhancements could be checking for duplicates, removing items from the list in the embedded app, pagination and search for the parent app.

## Running the App

The app is deployed at https://movies-list-gregschoenberg.netlify.app/ and will run with the embedded app using its url below.

The embedded app is deployed at http://csb-v9xs7u.net

## Running Locally 
Clone the repo and put the embedded-list app in another directory, In the movies app, you can run:

### `npm i`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

In another window, run the embedded app.
In the index.js file of the embedded app, change the origin url to where the movies app is running.
In the movies app, App.js, in the postMessage function, change the url to where the embedded app is running


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).