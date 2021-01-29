const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  id: {
    type: Number
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: Boolean
  },
}, {
  collection: 'todo'
})

module.exports = mongoose.model('Todo', todoSchema)