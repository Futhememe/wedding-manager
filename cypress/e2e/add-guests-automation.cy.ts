const nomes_casamento: any = [];

describe("Add a list of guests", () => {
  it("add guest by list", () => {
    cy.visit("http://localhost:3000/");

    nomes_casamento.map((guest: string) => {
      cy.intercept({ method: "GET", url: "/api/guests" }).as("getGuests");
      cy.wait("@getGuests").then(() => {
        cy.get(".invite-button").click();
        cy.get(".guest-name").clear();
        cy.get(".guest-name").type(guest);
        cy.get(".guest-save-button").click();
      });
    });
  });
});
