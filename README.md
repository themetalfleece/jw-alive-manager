# Jurassic World Alive - Dinosaur Manager

Manages your dinosaurs, while offering sorting by any stat
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)..

## Installation guide

1) Install [node.js](https://nodejs.org/en/). Optionally install [yarn](https://yarnpkg.com/lang/en/docs/install/), which is an alternative package manager to npm (node's default package manager)
2) Clone this repo `git clone https://github.com/themetalfleece/jw-alive-manage`
3) Navigate to its path `cd jw-alive-manager`
4) Install the node modules - `npm install`, or if you have yarn, `yarn`
5) Start the server `npm start` or `yarn start`
6) You will automatically be directed to `http://localhost:3000/`

This is the development build. If you want to create the production build, run `npm run build` or `yarn run build`

## Project Structure
Since it's built with react, the entire logic is at js and css files. The main file is `src/components/DinosaurManager.js`, along with its css file.

Some reusable components are at their own files, like `NameInput.js`. Optimally, some html code (jsx to be precise) used in the main js file, could be in their own file, like the table and the table rows. If the project gets more complicated, this would be a better solution.

It also registers a service worker, for caching and offline usage. Keep in mind that it's only available in production builds. See the `registerServiceWorker.js` file for more info.