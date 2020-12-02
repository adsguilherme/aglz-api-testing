import spok from 'cy-spok'

class Schemas {
    getBookingSchemas() {
        // Início do contrato
        return spok({
            firstname: spok.string,
            lastname: spok.string,
            totalprice: spok.number,
            depositpaid: spok.type('boolean'),
            bookingdates: {
                checkin: spok.string,
                checkout: spok.string
            },
            additionalneeds: spok.string
        })
        // Fim do contrato
    }
}

export default new Schemas();

