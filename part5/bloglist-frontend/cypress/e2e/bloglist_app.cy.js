describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Log in to application')
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Test Blog Title')
      cy.get('#author-input').type('Test Author')
      cy.get('#url-input').type('http://testurl.com')
      cy.get('#create-button').click()

      cy.contains('Test Blog Title Test Author')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Test Blog Title')
      cy.get('#author-input').type('Test Author')
      cy.get('#url-input').type('http://testurl.com')
      cy.get('#create-button').click()

      cy.contains('Test Blog Title Test Author')

      cy.contains('Test Blog Title Test Author')
        .parent()
        .contains('view')
        .click()

      cy.contains('likes 0')
        .parent()
        .contains('like')
        .click()

      cy.contains('likes 1')
    })

    it('A blog can be deleted by the user who created it', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Test Blog Title')
      cy.get('#author-input').type('Test Author')
      cy.get('#url-input').type('http://testurl.com')
      cy.get('#create-button').click()

      cy.contains('Test Blog Title Test Author')

      cy.reload()

      cy.contains('Test Blog Title Test Author')
        .parent()
        .contains('view')
        .click()
      cy.contains('Test Blog Title Test Author')
        .parent()
        .contains('remove')
        .click()

      cy.on('window:confirm', () => true)

      cy.contains('Test Blog Title Test Author').should('not.exist')
    })
    
    it.only('Only the creator can see the delete button', function() {
      const user2 = {
        name: 'Test Clone',
        username: 'testuser1',
        password: 'testpassword1'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user2)

      cy.contains('Matti Luukkainen logged in')

      cy.contains('new blog').click()
      cy.get('#title-input').type('Test Blog Title')
      cy.get('#author-input').type('Test Author')
      cy.get('#url-input').type('http://testurl.com')
      cy.get('#create-button').click()

      cy.contains('Test Blog Title Test Author')

      cy.reload()

      cy.contains('Test Blog Title Test Author')
        .parent()
        .contains('view')
        .click()
      cy.contains('Test Blog Title Test Author')
        .parent()
        .contains('remove')
      
      cy.get('#logout-button').click()
      
      cy.contains('Log in to application')
      cy.get('#username').type('testuser1')
      cy.get('#password').type('testpassword1')
      cy.get('#login-button').click()
  
      cy.contains('Test Clone logged in')

      cy.contains('Test Blog Title Test Author')
        .parent()
        .contains('view')
        .click()
      cy.contains('Test Blog Title Test Author')
        .parent()
        .contains('remove')
        .should('not.exist')
    })
  })

})
