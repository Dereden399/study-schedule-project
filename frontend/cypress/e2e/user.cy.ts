describe("Registration  works", () => {
  it("registration works", () => {
    cy.visit("http://localhost:5173/auth/register");
    cy.request("POST", "http://localhost:3001/test/resetDb");
    cy.get('[data-cy="username-field"]').type("admin");
    cy.get('[data-cy="password-field"]').type("admin");
    cy.get('[data-cy="submit-button"]').click();
    cy.url().should("equal", "http://localhost:5173/schedules");
  });
  it("login works", () => {
    cy.visit("http://localhost:5173/auth/login");
    cy.get('[data-cy="username-field"]').type("admin");
    cy.get('[data-cy="password-field"]').type("admin");
    cy.get('[data-cy="submit-button"]').click();
    cy.url().should("equal", "http://localhost:5173/schedules");
  });
  it("logout works", () => {
    cy.visit("http://localhost:5173/auth/login");
    cy.get('[data-cy="username-field"]').type("admin");
    cy.get('[data-cy="password-field"]').type("admin");
    cy.get('[data-cy="submit-button"]').click();
    cy.wait(500); // need to wait until javascript is loaded. Otherwise pop up won't appear
    cy.get('[data-cy="open-avatarmenu-button"]').click();
    cy.get('[data-cy="logout-button"]').click();
    cy.url().should("equal", "http://localhost:5173/");
  });
});
