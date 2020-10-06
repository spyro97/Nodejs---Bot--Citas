const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    fecha_creado: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('citas', AppointmentSchema);