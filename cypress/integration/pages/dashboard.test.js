describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config().baseUrl}/login`);
    cy.get("body").within(() => {
      cy.get("div").should("contain.text", "Don't have an account? Sign up");
    });
    cy.get("div")
      .find("img")
      .should("be.visible")
      .should("have.attr", "alt")
      .should("contain", "Iphone with Instagram");
    cy.get("form").within(() => {
      cy.get("input:first")
        .should("have.attr", "placeholder", "Email address")
        .type("nstlopez@gmail.com");

      cy.get("input:last")
        .should("have.attr", "placeholder", "Password")
        .type("password");
      cy.get("button").should("contain.text", "Login").click();
    });

    cy.get("div")
      .find("img")
      .should("be.visible")
      .should("have.attr", "alt")
      .should("contain", "Instagram");
  });

  it("logs the user in, shows the dashboard and does basic checks around the UI", () => {
    cy.get("body").within(() => {
      cy.get("div").should("contain.text", "nstlopez");
      cy.get("div").should("contain.text", "Nestor Lopez");
      cy.get("div").should("contain.text", "Suggestions for you");
    });
  });

  it("logs the user in and adds a comment to a photo", () => {
    cy.get('[data-testid="add-comment-8rYFYWQYEDaYQgQrIU2m"]')
      .should("have.attr", "placeholder", "Add a comment...")
      .type("Amazing !");
    cy.get('[data-testid="add-comment-submit-8rYFYWQYEDaYQgQrIU2m"]').submit();
  });

  it("logs the user in and likes a photo", () => {
    cy.get('[data-testid="like-photo-8rYFYWQYEDaYQgQrIU2m"]').click();
  });

  it("logs the user in and then signs out", () => {
    cy.get('[data-testid="sign-out"]').click();
    cy.wait(1000);
    cy.get("div").should("contain.text", "Don't have an account? Sign up");
  });
});
