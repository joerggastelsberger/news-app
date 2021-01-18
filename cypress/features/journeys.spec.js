describe('Journeys', () => {
    it('should render article previews', () => {
        cy.visit('/')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .should('exist')
    })

    it('should update article previews when choosing another category', () => {
        let articlePreviews
        cy.intercept('/v2//top-headlines?country=us&category=business').as('getArticles')
        cy.visit('/')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .then(articles => {
            articlePreviews = articles.text()
        })
        cy.get('[data-cy="toggle"]')
          .click()
        cy.get('[data-cy="nav-list-categories"]')
          .contains('Business')
          .click()
          .wait('@getArticles')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .then(articles => {
            expect(articles.text()).to.not.equal(articlePreviews)
        })
    })

    it('should update article previews when choosing another country', () => {
        let articlePreviews
        cy.intercept('/v2//top-headlines?country=at&category=general').as('getArticles')
        cy.visit('/')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .then(articles => {
            articlePreviews = articles.text()
        })
        cy.get('[data-cy="toggle"]')
          .click()
        cy.get('[data-cy="nav-list-countries"]')
          .contains('Austria')
          .click()
          .wait('@getArticles')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .then(articles => {
            expect(articles.text()).to.not.equal(articlePreviews)
        })
    })

    it('should update article previews when submitting the search modal', () => { 
        let articlePreviews
        cy.intercept('/v2//everything?q=test-and-google&sortBy=publishedAt').as('getArticles')
        cy.visit('/')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .then(articles => {
            articlePreviews = articles.text()
        })
        cy.get('[data-cy="search"]')
          .click()
        cy.get('[data-cy="modal-search-terms"]')
          .find('textarea')
          .type('test AND google')
        cy.get('[data-cy="modal-submit"]')
          .click()
          .wait('@getArticles')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .then(articles => {
            expect(articles.text()).to.not.equal(articlePreviews)
        })
    })

    it('should render article details when clicking on an article preview', () => { 
        cy.visit('/')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .eq(1)
          .click()
        cy.url()
          .should('contain', 'http://localhost:3000/')
          .should('not.equal', 'http://localhost:3000/')
        cy.get('[data-cy="article-details"]')
          .should('be.visible') 
    })

    it('should redirect to "/" when clicking on "NEWS"', () => { 
        cy.visit('/')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .eq(1)
          .click()
        cy.get('[data-cy="home"]')
          .click()
        cy.url()
          .should('eq', 'http://localhost:3000/')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .should('be.visible')
    })
})