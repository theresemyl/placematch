# 🍽️ PlaceMatch

PlaceMatch is a full-stack web app that lets you swipe on local restaurants with a friend to find your next place to eat, from anywhere in the world.

On the front-end, the project uses React and the Google Maps/Places API.

On the back-end, the project uses Node, Express, MySQL, and Knex.

## 🛠️ Installation

Use npm install to install node modules for client and server-side.

```bash
cd client
npm install

cd server
npm install
```

Create tables for the users, likes, and matches tables. Running seed data is optional as it is only sample data for a few users and likes.
You'll be able to sign up and add users to the database on the client-side once the project is up and running.

```bash
knex migrate:latest
knex seed:run
```

On the client-side `package.json`, add your localhost server to the proxy, for example:

```
"proxy": "http://localhost:8080"
```

On the server-side `.env` file, add your proxy and jwt_secret, for example:

```
PORT=8080
JWT_SECRET=hello
```

Run `npm start` to run the project on your browser.

## 🔑 Required API Key

This project requires you to create your own API key from the
[Google Maps Platform](https://developers.google.com/maps/documentation/javascript/get-api-key).

After registering your API key, enter it in the client-side `.env` file, for example:

```
REACT_APP_GOOGLE_API_KEY=apikeyhere
```

## 💡 Features

- Sign up, Login, and Logout functionality with JWT Tokens and authentication
- Choose Location on map powered by Google Maps API
- Google Places API pulls data of restaurants within the radius
- Ability to enter the username of a friend you want to swipe with
- Swipe functionality to swipe on restaurants
- Popup when match occurs with a link to all matches
- Matches pages with all previous matches
- Dashboard page with a button to click for a randomized "like"

## 🐛 Limitations

Currently working on the following bugs:
- Google Map not updating until second re-render, requires you to click out of the map page and back to register the location selected to pull a new list of restaurants. In the process of testing a few solutions. 
- API call to Nearby Search can timeout if the call is taking too long. 
