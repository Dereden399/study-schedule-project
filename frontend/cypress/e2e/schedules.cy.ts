describe("Schedules tests", () => {
  // reset Db and register new user
  beforeEach(() => {
    cy.visit("http://localhost:5173/auth/register");
    cy.request("POST", "http://localhost:3001/test/resetDb");
    cy.get('[data-cy="username-field"]').type("admin");
    cy.get('[data-cy="password-field"]').type("admin");
    cy.get('[data-cy="submit-button"]').click();
    cy.wait(1000);
    cy.visit("http://localhost:5173/schedules");
    cy.get('[data-cy="open-addSchedule-popover"]').click();
    cy.get('[data-cy="add-name"]').type("test");
    cy.get('[data-cy="add-submit-button"]').click();
  });

  it("Can add schedule", () => {
    cy.wait(200);
    cy.get('[data-cy="open-addSchedule-popover"]').click();
    cy.get('[data-cy="add-name"]').type("test2");
    cy.get('[data-cy="add-submit-button"]').click();
    cy.get('[data-cy="schedule-box"]').should("have.length", 2);
  });

  it("Can modify schedule", () => {
    cy.visit("http://localhost:5173/schedules");
    cy.get('[data-cy="schedule-box"]').last().click({ force: true });
    cy.get('[data-cy="open-editSchedule-modal"]').click();

    cy.get('[data-cy="edit-name"]').clear().type("new Name");
    cy.get('[data-cy="edit-submit-button"]').click();
    cy.get('[data-cy="schedule-box"]')
      .last()
      .should("contain.text", "new Name");
  });

  it("Can delete schedule", () => {
    cy.visit("http://localhost:5173/schedules");
    cy.get('[data-cy="schedule-box"]').last().click({ force: true });
    cy.get('[data-cy="delete-schedule-button"]').click();
    cy.get('[data-cy="confirm-delete"]').click();
    cy.get('[data-cy="schedule-box"]').should("not.exist");
  });
});
