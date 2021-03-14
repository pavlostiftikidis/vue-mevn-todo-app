const express = require('express');
const todoRoute = express.Router();

// Todo model
let TodoModel = require('../models/Todo');

// todoRoute.route('/').get((req, res, next) => {
//     TodoModel.find((error, data) => {
//      if (error) {
//        return next(error)
//      } else {
//        res.json(data)
//      }
//    })
//  })

todoRoute.route('/:id').get((req, res, next) => {
  TodoModel.find({user_id: req.params.id}, (error, data) => {
   if (error) {
     return next(error)
   } else {
     res.json(data)
   }
 })
})

 todoRoute.route('/create-task').post((req, res, next) => {
    TodoModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

todoRoute.route('/edit-task/:id').get((req, res, next) => {
   TodoModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log(data)
    }
  })
})

// Update student
todoRoute.route('/update-task/:id').post((req, res, next) => {
  TodoModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Task successfully updated!')
    }
  })
})

// Delete student
todoRoute.route('/delete-task/:id').delete((req, res, next) => {
  TodoModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = todoRoute;