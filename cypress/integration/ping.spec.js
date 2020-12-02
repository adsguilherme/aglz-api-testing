/// <reference types="cypress" />

import req from '../support/api/requests'
import ass from '../support/api/assertions'

describe('Ping', () => {
    it('Validar que a aplicação está rodando - GET Healthcheck @healthcheck', () => {

        // request    
        // req.getPing().its('status').should('eq' , 201) // assertion
        // Essa (linha 11) foi substituída pela 13, 13 e 14.
        req.getPing().then(getPingResponse => {
            ass.shouldHaveStatus(getPingResponse, 201)
        });
    });    
});

// https://treinamento-api.herokuapp.com/ping

// cy.request -> resposta -> body, status, headers
// .its -> status
