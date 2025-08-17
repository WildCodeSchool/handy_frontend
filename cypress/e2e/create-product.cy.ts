
  
// describe('User Signup E2E Test', () => {
//     it('should fill the signup form and submit successfully', () => {
//       cy.visit('/signup'); 
  
//       cy.get('input[formControlName="username"]', { timeout: 10000 })
//         .should('be.visible')
//         .type('MonUsername');
  
//       cy.get('input[formControlName="email"]', { timeout: 10000 })
//         .should('be.visible')
//         .type('test@example.com');
  
//       cy.get('input[formControlName="password"]', { timeout: 10000 })
//         .should('be.visible')
//         .type('MotDePasse123!');
  
//       cy.get('input[formControlName="confirmPassword"]', { timeout: 10000 })
//         .should('be.visible')
//         .type('MotDePasse123!');
  
//       cy.get('button[type="submit"]', { timeout: 10000 })
//         .should('be.enabled')
//         .click();
  
//       cy.url({ timeout: 10000 }).should('include', '/'); 
//     });
//   });
describe('User Signup E2E Test (Mocked)', () => {
    beforeEach(() => {
      cy.intercept('POST', '/auth/register', {
        statusCode: 200,
        body: { success: true }, 
      }).as('signupRequest');
    });
  
    it('should fill the signup form and submit successfully', () => {
      cy.visit('/signup');
  
      cy.get('input[formControlName="username"]', { timeout: 10000 })
        .should('be.visible')
        .type('MonUsername');
  
      cy.get('input[formControlName="email"]', { timeout: 10000 })
        .should('be.visible')
        .type('test@example.com');
  
      cy.get('input[formControlName="password"]', { timeout: 10000 })
        .should('be.visible')
        .type('MotDePasse123!');
  
      cy.get('input[formControlName="confirmPassword"]', { timeout: 10000 })
        .should('be.visible')
        .type('MotDePasse123!');
  
      cy.get('button[type="submit"]', { timeout: 10000 })
        .should('be.enabled')
        .click();
  
      cy.wait('@signupRequest').its('response.statusCode')
      .should('eq', 200);
  
      cy.url({ timeout: 10000 }).should('include', '/');
    });
  });
  