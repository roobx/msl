describe('Burger Constructor', () => {

  it('Open and close modal', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid=ingredient]').first().click()
    cy.get('body').type('{esc}')
  })

  const dNd = (i: number) => {
    cy.get('[data-testid=ingredient]')
      .eq(i)
      .trigger('dragstart')
    cy.get('[data-testid=constructor]')
      .trigger('drop')
  }

  it('Drag and Drop', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(1000);
    dNd(0)
    dNd(1)
    dNd(2)
    dNd(2)
  })

  it('Order', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(3000);
    dNd(0)
    dNd(1)
    dNd(2)
    dNd(3)
    cy.get('button')
      .contains('Оформить заказ')
      .click()
    cy.location('pathname', { timeout: 50000 })
      .should('include', '/login')
    cy.get('input[name=email]').type('ya.tarasell@yandex.ru')
    cy.get('input[name=password]').type('1234')
    cy.get('button').contains('Вход').click()
    cy.location('pathname', { timeout: 50000 })
      .should('not.include', '/login')
    cy.get('button')
      .contains('Оформить заказ')
      .click()
    cy.get('[data-testid=number]', { timeout: 100000 })
      .should(($item) => {
        expect($item.text()).not.to.equal("")
      })
  })
})