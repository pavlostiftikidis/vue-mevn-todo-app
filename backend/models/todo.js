const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({

  user_id:{
    type: String
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
  task: {
    type: Array
  }
}, {
  collection: 'todo'
})

module.exports = mongoose.model('Todo', todoSchema)