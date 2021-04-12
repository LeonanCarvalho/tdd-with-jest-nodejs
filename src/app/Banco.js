/**
 * Favorecido Model
 * @param sequilize
 * @param DataTypes
 */

const Schemes = {
    "001": {
        agency: {
            maxLength: 4,
            required: true,
            pattern: /^(?:^0*)[1-9][0-9]{0,3}$/,
            digit: {
                required: false,
                pattern: /^[xX0-9]{0,1}$/
            }
        },
        account: {
            maxLength: 8,
            required: true,
            pattern: /^(?:^0*)[1-9][0-9]{0,7}$/,
            digit: {
                required: true,
                pattern: /^[xX0-9]{0,1}$/
            }
        },
        accountType: {
            required: true,
            allowedTypes: ['CONTA_CORRENTE', 'CONTA_POUPANCA', 'CONTA_FACIL']
        }
    }
}

const defaultScheme  = {
    agency: {
        maxLength: 4,
        required: true,
        pattern: /^(?:^0*)[1-9][0-9]{0,3}$/,
        digit: {
            required: false,
            pattern: /^[xX0-9]{0,1}$/
        }
    },
    account: {
        maxLength: 11,
        required: true,
        pattern: /^(?:^0*)[1-9][0-9]{0,10}$/,
        digit: {
            required: true,
            pattern: /^[0-9]{0,1}$/
        }
    },
    accountType: {
        required: true,
        allowedTypes: ['CONTA_CORRENTE', 'CONTA_POUPANCA']
    }
}



class Banco {
    constructor(cod, name) {
        this.cod  = cod;
        this.name  = name;
        this.scheme = Schemes[cod] || defaultScheme
    }

    isValidAgency(agency) {
        console.log(this.scheme.agency)
        return true;
    }

    isValidAccount(account){
        console.log(this.scheme.agency)
        return true;
    }
}
module.exports = {
    Banco: Banco
}
