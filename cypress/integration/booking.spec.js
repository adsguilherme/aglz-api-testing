/// <reference types="cypress" />

import spok from 'cy-spok'
import req from '../support/api/requests'
import sch from '../support/api/schemas'
import ass from '../support/api/assertions'

describe('Booking', () => {
    // Criando um hook, para que seja executado 1º o post de autenticação.
    // Para que depois seja executado o POST para criar.
    // E por fim o PUT para alterar 
    before(() => {
        req.doAuth()
    });    

    it('Validar o contrato do GET Booking @contract', () => {
        req.getBooking().then(getBookingResponse => {
            // cy.log(getBookingResponse.status)
            ass.validateContractOf(getBookingResponse, sch.getBookingSchemas())
        })
    });

    it('Criar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse =>{
            //expect(postBookingResponse.status).to.eq(200)
            ass.shouldHaveStatus(postBookingResponse, 200)
            ass.shouldBookingId(postBookingResponse)
            ass.shouldHaveHeaders(postBookingResponse)
            ass.shouldHeadersContentType(postBookingResponse)
            ass.shouldDuration(postBookingResponse)
        })
    });

    // Alterar uma reserva sem token -> retorna 403
    // Alterar uma reserva com token invalido -> retorna 403
    // Alterar uma reserva com token válido -> retorna 200

    it('Alterar uma reserva sem token -> retorna 403 @functional', () => {
        // Aqui será realizado um POST. Assim criando independência no teste do PUT.
        req.postBooking().then(postBookingResponse => {
            req.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse => {
                // Reaproveitamento de código
                ass.shouldHaveStatus(putBookingResponse, 403)
            })
        })
    });

    it('Alterar uma reserva com token válido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBooking(postBookingResponse).then(putBookingResponse => {
                ass.shouldHaveStatus(putBookingResponse, 200)        
            })
        })
    })

    // Excluir uma reserva sem token -> retorna 403
    // Excluir uma reserva com token invalido -> retorna 403
    // Excluir uma reserva com token válido -> retorna 201

    it('Excluir uma reserva com token válido -> retorna 201 @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                ass.shouldHaveStatus(deleteBookingResponse, 201)
            })
        })
    });
});
