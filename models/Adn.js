const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdnSchema = new Schema({
    Secuencia_Adn: {
        type: String,
        require: true
    },
    Secuencia_complementaria: {
        type: String,
        require: true
    },
    Secuencia_Arnm: {
        type: String,
        require: true
    },
    Secuencia_polipeptidos: {
        type: String,
        require: true
    }
});

const Adn = mongoose.model('Adn', AdnSchema);

module.exports = Adn;