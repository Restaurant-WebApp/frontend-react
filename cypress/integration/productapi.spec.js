describe('API Fetch Test', () => {
    it('successfully fetches and displays data from the API', () => {
      cy.intercept('GET', 'https://localhost:44379/products', {   // Mock the API response
        fixture: 'products.json',  // Create a fixture file with example response data
      }).as('fetchProducts');
  
      cy.visit('http://localhost:3000/menu');  // Assuming the 'Menu' component is rendered on the root URL
  
      cy.wait('@fetchProducts').its('response.statusCode').should('eq', 200);  // Wait for the API request and check status code
  
      // Get the rendered product cards and verify the data
      cy.get('.product-card').should('have.length', 3);  // Assuming there are 3 products in the fixture data
      cy.get('.product-card').eq(0).contains('Example Product 1');
      cy.get('.product-card').eq(1).contains('Example Product 2');
      cy.get('.product-card').eq(2).contains('Example Product 3');
    });
  });
  