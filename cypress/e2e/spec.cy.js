describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost/testsol/testsol/')
  })
  it('must have placeholders', () => {
    cy.get('input').should('have.attr', 'placeholder')
  })

  it('.clear() it should have a button that empty the form', () => {
    // https://on.cypress.io/clear
    cy.get('.action-clear').type('Clear this text')
      .should('have.value', 'Clear this text')
      .clear()
      .should('have.value', '')
  })
  


})