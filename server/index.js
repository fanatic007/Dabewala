const express = require('express')
const WebSocket = require('ws');
const LOCATION_UPDATES = require('./locationUpdates.json');
const ORDERS = require('./orders.json');

const app = express();
const PORT_HTTP = 3001;
const wss = new WebSocket.Server({ port: PORT_WS });
const PORT_WS = 3002;


app.get('/orders/', (req, res) => {
  req.params.locationUpdated?res.send(ORDERS[0]):res.send(ORDERS[1]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${PORT_HTTP}`)
});

wss.on('connection', ws => {
  onConnection(ws); console.log("connection opened");
  ws.on('open', function open() {
    let locationUpdate;
    LOCATION_UPDATES.forEach(coords=>{ console.log(coords);
      locationUpdate={status: 4, coords:coords};
      ws.send(locationUpdate);
    });
    locationUpdate={status: 5, coords:null};
    ws.send(locationUpdate);
  });  

  ws.on('error', error => {
    OnError(error);
  });

  ws.on('close', ws=> {
    onClose();
  });
});