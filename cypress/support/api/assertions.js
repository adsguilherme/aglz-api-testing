class Assertions {
    shouldHaveStatus(response, status){
        expect(response.status, `Status code retornado ${status}`).to.eq(status)
        // expect(response.status, 'Status code retornado').to.eq(status)
    }

    validateContractOf(response, schemas){
        return cy.wrap(response.body).should(
        // return cy.wrap(getBookingResponse.body).should(
            //sch.getBookingSchemas()
            schemas
        )
    }

    shouldBookingId(response) {
        expect(response.body.bookingid, 'ID criado').to.not.be.null
    }

    shouldHaveHeaders(response){
        expect(response.headers, 'Informações do Header').to.include({
            // Utilizar letra minúscula no início de cada atributo, pois pode gerar erro na execução do teste.
            server: 'Cowboy',
            connection: 'keep-alive',
            'x-powered-by': 'Express'
        })        
    }

    shouldHeadersContentType(response){
        expect(response.headers, 'Informação do Header - content-type ').to.include({
            'content-type': 'application/json; charset=utf-8'
        })
    }
    
    shouldDuration(response){
        expect(response.duration, 'Tempo de resposta').lessThan(900);
    }    
}

export default new Assertions();
