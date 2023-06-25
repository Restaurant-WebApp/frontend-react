describe("Product API Test", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://localhost:44379/products").as("fetchProducts"); // Alias the API call
    cy.visit("http://localhost:3000/menu");
  });

  it("displays the products returned from the API", () => {
    cy.wait("@fetchProducts")
      .its("response.statusCode")
      .should("eq", 200);

    cy.get(".product-card").should("exist");
    cy.get(".product-card").each((productCard) => {
      cy.wrap(productCard).find(".product-name").should("exist");
      cy.wrap(productCard).find(".product-description").should("exist");
      cy.wrap(productCard).find(".product-price").should("exist");
      cy.wrap(productCard).find(".btn-addtocart").should("exist");
    });
  });
});
