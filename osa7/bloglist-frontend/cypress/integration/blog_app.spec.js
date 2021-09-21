/* eslint-disable no-undef */
import '../support/commands'

describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'darma',
      name: 'kristiina',
      password: 'sal'
    }

    const userNotLoggingIn = {
      username: 'hans',
      name: 'hans',
      password: 'hans'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', userNotLoggingIn)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#loginform')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('darma')
      cy.get('#password').type('sal')
      cy.get('#loginbutton').click()
      cy.contains('kristiina logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('dog')
      cy.get('#password').type('dogsal')
      cy.get('#loginbutton').click()
      cy.get('.rejected').contains('wrong credentials').should('have.css', 'color', 'rgb(255, 0, 0)')
    })


    describe('when logged in', function () {

      beforeEach(function () {
        cy.login({ username: 'darma', password: 'sal' })
      })

      it('A blog can be created', function () {
        cy.contains('add new blog').click()
        cy.get('#title').type('test blog')
        cy.get('#author').type('K. Kumila')
        cy.get('#url').type('www.testk.com')

        cy.contains('create').click()

        cy.get('.listOfBlogs').contains('test blog')
      })


      describe('when four blogs exists', function () {

        beforeEach(function () {
          cy.createBlog({ title: 'first blog', author: 'K.Kumila', url: '.com', likes: 299 })
          cy.createBlog({ title: 'second blog', author: 'K.Kumila', url: '.com', likes: 0 })
          cy.createBlog({ title: 'third blog', author: 'K.Kumila', url: '.com', likes: 18 })
          cy.createBlog({ title: 'fourth blog', author: 'K.Kumila', url: '.com', likes: 1 })

          cy.visit('http://localhost:3000')

        })

        it('blog can be liked', function () {
          cy.contains('second blog')
            .contains('view').click()
          cy.get('.blog_show_all')
          cy.get('#likes')
            .contains('like').click()
          cy.get('#likes')
            .should('contain', 'likes 1')
          cy.contains('hide').click()

        })

        it('user can remove blog', function() {
          cy.contains('second blog')
            .contains('view').click()

          cy.get('.blog_show_all')
            .contains('delete').click()

          cy.get('.accepted').contains('deleted').should('have.css', 'color', 'rgb(0, 128, 0)')

        })

        it('user can not remove blog that other user has added', function() {
          cy.login({ username: 'hans', password: 'hans' })
          cy.createBlog({ title: 'hans', author: 'hans', url: 'hans.com', likes: 0 })
          cy.login({ username: 'darma', password: 'sal' })

          cy.contains('hans')
            .contains('view').click()

          cy.get('.blog_show_all')
            .should('not.contain', 'delete')
        })

        it('blogs are sorted by likes', function() {
          cy.get('.listOfBlogs')
            .get('.button').then( buttons => {
              cy.wrap(buttons).click({ multiple: true })
            })
            .get('.blog_show_all').parent().find('#likes').parent().find('#number')
            .then(numbers => {
              cy.wrap(numbers[0]).should('have.text', '299')
              cy.wrap(numbers[1]).should('have.text', '18')
              cy.wrap(numbers[2]).should('have.text', '1')
              cy.wrap(numbers[3]).should('have.text', '0')
            })
        })

      })

    })

  })
})

