const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const timeSchema = new mongoose.Schema({
  name: { type:String, default: 'Noname', index: true},
  class: { type:String, default: '기타'},
  wtime: {
    stime: {type: Number},
    ftime: {type: Number}
  },
  satime: {
    stime: {type: Number},
    ftime: {type: Number}
  },
  sutime: {
    stime: {type: Number},
    ftime: {type: Number}
  }
})

module.exports = mongoose.model('Time', timeSchema)
