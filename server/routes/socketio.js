require("dotenv").config();
const { Server } = require("socket.io");
const Medicine = require('../models/medicine');

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:4200',
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  io.on('connection', async (socket) => {
    try {
      const medicines = await Medicine.find();
      socket.emit('medicineDetails', medicines);
    } catch (error) {
      console.error('Error getting medicines:', error);
    }
  });
};
