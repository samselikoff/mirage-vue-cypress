// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

let mirageFunctions = [];

Cypress.on("window:before:load", win => {
  win.mirageFunctions = mirageFunctions;
  win.resetMirageFunctions = function() {
    mirageFunctions = [];
  };
});

Cypress.Commands.add("mirage", (appIsRunning, userFunction) => {
  if (appIsRunning) {
    cy.window().then(win => {
      userFunction(win.server);
    });
  } else {
    mirageFunctions.push(userFunction);
  }

  // cy.window().then(win => {
  //   if (win.server) {
  //     userFunction(win.server);
  //   } else {
  //     Cypress.on("window:before:load", win => {
  //       win.mirageFunctions = win.mirageFunctions || [];

  //       win.mirageFunctions.push(userFunction);
  //     });
  //   }
  // });

  // Cypress.on("window:unload", win => {
  //   // console.log("unloading...");
  // });
});
