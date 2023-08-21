describe("Registration  works", () => {
  it("registration works", () => {
    cy.visit("http://localhost:5173/auth/register");
    cy.request("POST", "http://localhost:3001/test/resetDb");
    cy.get("#username_field").type("admin");
    cy.get("#password_field").type("admin");
    cy.get("#submit_button").click();
    cy.url().should("equal", "http://localhost:5173/schedules");
  });
});
