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
