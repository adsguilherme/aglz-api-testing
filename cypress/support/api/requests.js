class Requests {
    getPing() {
        return cy.request({
            method: 'GET',
            url: 'ping' // Linhas 5,6 e 7 são o request
        })
    }

    getBooking() {
        return cy.request({
            method: 'GET',
            url: 'booking/2',
        })
    }

    postBooking() {
        return cy.request({
            method: 'POST',
            url: 'booking',
            body: {
                "firstname" : "Guilherme",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2020-01-01",
                    "checkout" : "2020-01-02"
                },
                "additionalneeds" : "Breakfast"
            }
        })
    }

    updateBookingWithoutToken(response){

        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            // id é referente ao id da reserva criada no método POST.
            url: `booking/${id}`,
            body: {
                "firstname": "GUILHERME",
                "lastname": "SOUSA",
                "totalprice": 999,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-02-02"
                },
                "additionalneeds": "Breakfast Turbo 3.0"
            },
            failOnStatusCode: false
        })
    }

    updateBooking(response){

        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            // id é referente ao id da reserva criada no método POST.
            url: `booking/${id}`,
            headers: {
                // É o que é enviado no header do método PUT, e contém o token.
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "GUILHERME",
                "lastname": "SOUSA",
                "totalprice": 999,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-02-02"
                },
                "additionalneeds": "Breakfast Turbo 3.0"
            },
            failOnStatusCode: false
        })
    }

    postAuth(){
        return cy.request({
            method: 'POST',
            url: 'auth',
            body: {
                "username" : "admin",
                "password" : "password123"
            }
        });
    }

    doAuth(){
        this.postAuth().then(authResponse => {
            const token = authResponse.body.token;

            Cypress.env('token', token);
        })
    }

    deleteBooking(response){

        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false 
        });
    }
}

export default new Requests();

// Criada a classe Request. (linhas 1 a 8)
// Criado um método construtor para exportar para outras partes do projeto. (Linha 10)
// O arquivo ping.spec.js realizá o import desse arquivo. (linha 3)
// E assim será possível invocar o método. (Linha 9, utilizando .getPing)

