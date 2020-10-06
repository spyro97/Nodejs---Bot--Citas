const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router()
const dfff = require('dialogflow-fulfillment');
const Appointment = require('./services/appointments');

//Initialize app
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.get('/', (req, res) => res.send('API is working'));

//Aplication
app.post('/', express.json(), async (req, res) => {
    const agent = new dfff.WebhookClient({
        request: req,
        response: res
    });

    async function citaConfirmacion(agent){
        try {
            var name = agent.context.get("pedir_nombre").parameters.name;
            var time = agent.context.get("pedir_horario").parameters.time.split('T')[1].split(':')[0];
            console.log(name);
            console.log(time);
            //agent.add("Tu cita a sido agendada.")
            const createAppointment = await Appointment.createAppointment(name, time);
            agent.add("Se ha creado tu cita");
        } catch (error) {
            agent.add("Ha ocurrido un error con el servidor, intentalo mas tarde porfavor.")
        }
    }
    
    var intentMap = new Map();

    intentMap.set('citaConfirmacion', citaConfirmacion);
    
    agent.handleRequest(intentMap);
});

//DB Conexion 
db.conectDB();

module.exports = app;