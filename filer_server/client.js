const net = require("net");
const {IP, PORT} = require("./constants");
const {setUpInput} = require("./input");


const connection = net.createConnection({
  host: IP,
  port: PORT
});



setUpInput(connection);
