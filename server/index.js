const express = require('express')
const WebSocket = require('ws')
const LOCATION_UPDATES = require('./locationUpdates.json');
let ORDERS = require('./orders.json');
const http = require('http');

const PORT_HTTP = 3001;
const PORT_WS = 3002;
const app = express();
const wss = new WebSocket.Server( {server:http.createServer(app), port:PORT_WS} );


app.get('/orders/', (req, res) => {
  req.params.locationUpdated?res.send(ORDERS[0]):res.send(ORDERS[1]);
});


wss.on('connection', (ws) => {
  console.log("connection opened");
  let i=0;
  LOCATION_UPDATES.forEach(coords=>{
    setTimeout(()=>{ ws.send(JSON.stringify({status: 4, coords:coords}));    }, 2000*i++);  
  });
});

app.listen(PORT_HTTP, () => {
  console.log(`Example app listening at http://localhost:${PORT_HTTP}`)
});