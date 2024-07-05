describe('Bloglist app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
    // const user = {
    //   name: 'Matti Luukkainen',
    //   username: 'testuser',
    //   password: 'testpassword'
    // }
    // cy.request('POST', 'http://localhost:5173/api/users/', user)
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  it('succeeds with correct credentials', function() {
    cy.contains('Log in to application').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpassword')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })
  
  it('fails with wrong credentials', function() {
    cy.contains('Log in to application').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('wrongpassword')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })
})