describe('Journeys', () => {
    it('renders article previews', () => {
        cy.visit('/')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .should('exist')
    })

    it('updates article previews when choosing another category', () => {
        let articlePreviews
        cy.intercept('/api/v4/top-headlines?country=us&topic=business&token=71465ce1e23b34078aa486634d5b1de4').as('getArticles')
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

    it('updates article previews when choosing another country', () => {
        let articlePreviews
        cy.intercept('/api/v4/top-headlines?country=au&topic=breaking-news&token=71465ce1e23b34078aa486634d5b1de4').as('getArticles')
        cy.visit('/')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .then(articles => {
            articlePreviews = articles.text()
        })
        cy.get('[data-cy="toggle"]')
          .click()
        cy.get('[data-cy="nav-list-countries"]')
          .contains('Australia')
          .click()
          .wait('@getArticles')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .then(articles => {
            expect(articles.text()).to.not.equal(articlePreviews)
        })
    })

    it('updates article previews when submitting the search modal', () => { 
        let articlePreviews
        cy.intercept('/api/v4/search?q=google&sortby=publishedAt&token=71465ce1e23b34078aa486634d5b1de4').as('getArticles')
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
          .type('google')
        cy.get('[data-cy="modal-submit"]')
          .click()
          .wait('@getArticles')
        cy.get('[data-cy="article-list"]')
          .find('[data-cy="article-preview"]')
          .then(articles => {
            expect(articles.text()).to.not.equal(articlePreviews)
        })
    })

    it('renders article details when clicking on an article preview', () => { 
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

    it('redirects to "/" when clicking on "NEWS"', () => { 
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