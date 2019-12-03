// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

/*
  Define a function on the app's window object, that the app will call
  whenever it makes a network request.

  This function receives the request object (coming from a separate Mirage
  instance running in the app's iframe), and turns it into a fetch request
  within the Cypress iframe.
  
  Because the "real" Mirage server is running in Cypress's iframe, when the
  fetch request goes out, Mirage will handle it correctly & respond with the
  request data.
*/

Cypress.on("window:before:load", win => {
  win.handleFromCypress = function(request) {
    return fetch(request.url, {
      method: request.method,
      body: request.requestBody
    }).then(res => {
      if (res.headers.map["content-type"] === "application/json") {
        return res.json();
      } else {
        return "";
      }
    });
  };
});
