describe('ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--primary'));
  it('should render the component', () => {
    cy.get('shop-button').should('exist');
  });
});
