const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    storage: 'database.sqlite',
});
client.sequelize = sequelize;
client.config = {
    prefix: '£'
}

client.commands = new Discord.Collection();

fs.readdir('./events/', (err, files) => {
    if (err) console.error(err);
    files.forEach(file =>{
        const event = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    files.forEach(file => {
        const command = require(`./commands/${file}`);
        const commandName = file.split('.')[0];
        client.commands.set(commandName, command);
    });
});

fs.readdir('./functions/', (err, files) => {
    if (err) console.error(err);
    files.forEach(file => {
        const f = require(`./functions/${file}`);
        const fName = file.split('.')[0];
        client[fName] = f.bind(null, client);
    });
});

fs.readdir('./models/', (err, files) => {
    if (err) console.error(err);
    files.forEach(file => {
        const modelName = file.split('.')[0];
        const model = sequelize.import(`./models/${modelName}`);
        console.log(`Syncing ${modelName}`)
        model.sync();    
    });
});

client.login(process.env.TOKEN);






const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(3000);
setInterval(() => {
  http.get(`http://${process.env.DOMAIN}.glitch.me`);
},  280000);