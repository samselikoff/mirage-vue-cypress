import { makeServer } from "../../../src/server";

// let appsWindow;
// let appsOriginalXmlHttpRequest;
//
Cypress.on("window:before:load", win => {
  win.shouldRunMirage = true;
  // win.XMLHttpRequest = window.XMLHttpRequest;
  // appsWindow = win;
  // appsOriginalXmlHttpRequest = appsWindow.XMLHttpRequest;
  // appsWindow.XMLHttpRequest = window.XMLHttpRequest;
});

afterEach(() => {
  cy.window().then(win => {
    win.resetMirageFunctions();
  });
  // cy.window().then(win => {
  //   win.mirageFunctions = [];
  // });
  // server = makeServer("test");
  // });
  // afterEach(() => {
  // cy.window().then(win => {
  //   console.log("length is: ", win.mirageFunctions.length);
  //   if (win.server) {
  //     win.server.shutdown();
  //     win.server = null;
  //   }
  //   win.mirageFunctions = [];
  //   console.log("just reset functions");
  // });
});

it("works with 2 movies", function() {
  let appIsRunning = false;

  cy.mirage(appIsRunning, server => {
    server.createList("movie", 2);
  });

  cy.visit("/");

  appIsRunning = true;

  cy.get("h1").should("include.text", "Moviezzzs");

  cy.mirage(appIsRunning, server => {
    expect(server.db.movies.length).to.equal(2);
  });
});

it("works with 5 movies", function() {
  let appIsRunning = false;
  cy.mirage(appIsRunning, server => {
    server.createList("movie", 5);
  });

  cy.visit("/");
  appIsRunning = true;

  cy.get("h1").should("include.text", "Moviezzzs");

  cy.mirage(appIsRunning, server => {
    expect(server.db.movies.length).to.equal(5);
  });
});

// it("works", function() {
// cy.server({
//   onAnyRequest: (route, proxy) => {
//     debugger;
//     console.log("here");

//     // proxy.xhr.setRequestHeader("CUSTOM-HEADER", "Header value");
//     proxy.xhr.responseText = "foo";
//     proxy.xhr = null
//   }
// });
// console.log(server.db.dump());
// cy.window().then(win => {

// })

// cy.window().then(win => {
//   // console.log(win);
//   console.log("in cy.window");
//   win.wat = "foo";

//   win.modifyMirage = function(server) {
//     server.createList("movie", 5);
//   };
//   //   console.log("is vue?");
//   //   console.log(win.thisIsVue);
//   //   // console.log("setting");
//   //   // win.samAndRyan = 123;
//   //   // win.server.create

//   //   // debugger;
//   //   // console.log(win);
//   //   // win.XMLHttpRequest = window.XMLHttpRequest;
//   //   // debugger;
// });

// function modifyMirage(server) {
//   server.createList("movie", 5);
// }

// cy.visit("/", { onBeforeLoad: win => (win.modifyMirage = modifyMirage) });
// it("works", function() {
//   cy.visit("/");

//   cy.get("h1").should("include.text", "Mov");
// });

// it("works", function() {
//   cy.visit("/");

//   cy.get("h1").should("include.text", "Moviezz");
// });

// it("shows the movies", function() {
//   cy.window().then(win => {
//     console.log(win.XMLHttpRequest);
//   });
//   server.createList("movie", 11);
//
//   cy.visit("/");
//
//   cy.get("li.movie").should("have.length", 11);
// });

// it("shows more movies", function() {
//   // server.createList("movie", 10);
//   cy.server();
//   cy.route("GET", "api/movies", () => {
//     return { movies: [{ id: 1 }, { id: 2 }] };
//   });
//
//   cy.visit("/");
//
//   cy.get("li.movie").should("have.length", 2);
// });

// it("shows the movies", function() {
//   // server.createList("movie", 9);
//
//   cy.visit("/");
//
//   cy.get("li.movie").should("have.length", 9);
// });
//
// it("shows the movies", function() {
//   // server.createList("movie", 8);
//
//   cy.visit("/");
//
//   cy.get("li.movie").should("have.length", 8);
// });

// it("can delete a movie", function() {
//   server.createList("movie", 3);
//
//   cy.visit("/");
//   cy.contains("Delete 2").click();
//
//   cy.get("li.movie").should("have.length", 2);
// });

// it("1 test", function() {
//   expect(true).to.equal(true);
// });
//
// it("2 test", function() {
//   expect(true).to.equal(true);
// });
//
// it("3 test", function() {
//   expect(true).to.equal(true);
// });
//
// it("4 test", function() {
//   expect(true).to.equal(true);
// });
