const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  // Define client schema fields here
  // Example: name, email, phone, etc.
  clientName: String,
  clientEmail: String,
  clientPhone: Number,
  clientAddress: String,

});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
