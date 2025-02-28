import { WebSocketServer } from 'ws';
import GameManager from './GameManager.js';
const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();
let numberOfConnections = 0;
wss.on('connection', (ws) => {
    gameManager.addPlayer(ws);
    numberOfConnections += 1;
    ws.on('close', () => {
        gameManager.removePlayer(ws)
        numberOfConnections -= 1;
        console.log("Disconnected");
        console.log(numberOfConnections);
    });
    console.log(numberOfConnections);
});