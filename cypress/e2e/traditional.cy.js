/// <reference types="cypress" />
// This test case spec runs a traditional test against the ACME bank site.

// This "describe" method contains related test cases with per-test setup and cleanup.
// In this example, there is only one test.
describe('Traditional Test for ACME Bank', () => {

  beforeEach(() => {
    cy.viewport(1600, 1200)
  }) 

  // This test covers login for the Applitools demo site, which is a dummy banking app.
  // The interactions use typical Cypress calls,
  // but the verifications use one-line snapshot calls with Applitools Eyes.
  // If the page ever changes, then Applitools will detect the changes and highlight them in the dashboard.
  // Traditional assertions that scrape the page for text values are not needed here.
  it('should log into a bank account', () => {

    // Load the login page
    cy.visit('https://demo.applitools.com')

    // Verify the login page appears
    cy.get('div.logo-w').should('be.visible')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#log-in').should('be.visible')
    cy.get('input.form-check-input').should('be.visible')

    // Perform login
    cy.get('#username').type('andy')
    cy.get('#password').type('i<3pandas')
    cy.get('#log-in').click()

    // Check various page elements
    cy.get('div.logo-w').should('be.visible')
    cy.get('div.element-search.autosuggest-search-activator > input').should('be.visible')
    cy.get('div.avatar-w img').should('be.visible')
    cy.get('ul.main-menu').should('be.visible')
    cy.get('a').contains('Add Account').should('be.visible')
    cy.get('a').contains('Make Payment').should('be.visible')
    cy.get('a').contains('View Statement').should('be.visible')
    cy.get('a').contains('Request Increase').should('be.visible')
    cy.get('a').contains('Pay Now').should('be.visible')
  
    // Check time message
    cy.get('#time').invoke('text').should('match', /Your nearest branch closes in:( \d+[hms])+/)

    // Check menu element names
    cy.get('ul.main-menu li span').should(items => {
      expect(items[0]).to.contain.text('Card types')
      expect(items[1]).to.contain.text('Credit cards')
      expect(items[2]).to.contain.text('Debit cards')
      expect(items[3]).to.contain.text('Lending')
      expect(items[4]).to.contain.text('Loans')
      expect(items[5]).to.contain.text('Mortgages')
    })

    // Check transaction statuses
    const statuses = ['Complete', 'Pending', 'Declined']
    cy.get('span.status-pill + span').each(($span, index) => {
        expect(statuses).to.include($span.text())
    })
  })
})