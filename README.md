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

On the server-side `.env` file, add your proxy and jwt_secret, for example:

```
PORT=8080
JWT_SECRET=hello
```

## 🔑 Required API Key

This project requires you to create your own API key from the
[Google Maps Platform](https://developers.google.com/maps/documentation/javascript/get-api-key).

After registering your API key, enter it in the `.env` file.

## Usage

To be updated.
