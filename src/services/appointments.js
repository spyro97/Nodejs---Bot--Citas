const Appointment = require('../models/appointment.js');

module.exports = {
    createAppointment: async (name, time) => {
        console.log(name, time)
        const appointmentData = new Appointment({
            nombre: name,
            hora: time
        })
        try {
            const saveAppointment = await appointmentData.save()
            console.log(saveAppointment)
            return null;
        } catch (e) {
            console.log(e)
            return e
            
        }
    }
}