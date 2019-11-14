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
  win.runCypressMirageFunctions = function() {
    win.mirageFunctions.forEach(f => f(win.server));
  };
});

afterEach(() => {
  mirageFunctions = [];

  cy.window({ log: false }).then(win => {
    if (win.server) {
      win.server.shutdown();
      win.server = null;
    }
  });
});

Cypress.Commands.add("mirage", userFunction => {
  cy.window().then(win => {
    if (win.server) {
      userFunction(win.server);
    } else {
      mirageFunctions.push(userFunction);
    }
  });
});
