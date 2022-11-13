describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config().baseUrl}/p/raphael`);
  });

  it("goes to a profile page and validates the UI", () => {
    cy.get("body").within(() => {
      cy.get("div").should("contain.text", "raphael");
      cy.get("div").should("contain.text", "Raffaello Sanzio da Urbino");
      cy.get("div").should("contain.text", "5 photos");
      cy.get("div").should("contain.text", "3 followers");
      cy.get("div").should("contain.text", "0 following");
    });
  });
});
