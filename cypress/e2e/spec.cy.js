describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost/testsol/')
  })
  ///estoy esperando que tengan placeholders
  it('must have placeholders', () => {
    cy.get('input').should('have.attr', 'placeholder')
  })
  ///espero que el formulario tenga un botón que vacíe el formulario
  it('.clear() it should have a button that empty the form', () => {
    cy.get('.action-clear').type('Clear this text')
      .should('have.value', 'Clear this text')
      .clear()
      .should('have.value', '')
  })
  //espero que el los input tipo número no tengan letras
  it('shoudnt be able to write letters on number inputs', () => {
    cy.get('input[type="number"]').type("e") 
    .should('have.value', '')
  })  
  //espero que al enviar el formulario salga un error al haber campos vacíos
  it('.submit() - submit a form', () => {
    cy.get('input').invoke('val','')
    .next()
    .should('have.attr', 'help-block')
  })


})