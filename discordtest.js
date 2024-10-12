const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();
const port = 8080; //El puerto que va a estar escuchando el bot.

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});
//TOKEN.
const TOKEN = 'MTI5MzMwMDU1OTc5Njg5NTgyNQ.GK98sK.VM6e6N-X28JnkYYVAWtahnugywbEQGSfOZLKOo';
// ID del canal. 
const CHANNEL_ID = '1263245073915838487';
//parsear Json.

app.use(express.json());

// Función para enviar un mensaje
async function enviarMensaje(mensaje) {
    try {
        const canal = await client.channels.fetch(CHANNEL_ID);
        await canal.send(mensaje);
        console.log('Mensaje enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
}

// Integración con la web.

app.post('/cmd', async (req, res) => {
  const {mensaje} = req.body;

  if(!mensaje) {
    return res.status(400).send('Mensaje no especifícado.');
  }

  await enviarMensaje(mensaje);

  res.send('Mensaje ejecutado');
});

app.listen(port, () => {
  console.log('Escuchando en http://localhost:${port}');
});

// Evento que se dispara cuando el bot está listo
client.once('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
    
    // Ejemplo de uso: enviar un mensaje
    enviarMensaje('¡Hola! Este es un mensaje de prueba.');
});

// Conectar el bot a Discord
client.login(TOKEN);
