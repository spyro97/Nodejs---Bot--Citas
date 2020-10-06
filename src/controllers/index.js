const express = require('express');
const router = express.Router();
const dfff = require('dialogflow-fulfillment');

router.post('/', express.json(), async (req, res) => {
    const agent = new dfff.WebhookClient({
        request: req,
        response: res
    });

    function citaConfirmacion(agent){
        agent.add("Tu cita a sido agendada.")
        console.log("Hola")
    }
    
    var intentMap = new Map();

    intentMap.set('citaConfirmacion', citaConfirmacion);
    
    agent.handleRequest(intentMap);
});

module.exports = router;