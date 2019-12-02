const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const objectSchema = new mongoose.Schema({
  name: { type:String, default: 'Noname', index: true},
  class: { type:String, default: '기타'},
  days: {mon: {type: Boolean, default: false}, tue: {type: Boolean, default: false}, wed: {type: Boolean, default: false}, thu: {type: Boolean, default: false}, fri: {type: Boolean, default: false}, sat: {type: Boolean, default: false}, sun: {type: Boolean, default: false}},
  time: {
    stime: { type: Number},
    ftime: { type: Number},
    rstime: { type: Number},
    rftime: { type: Number},
  },
  special: {type: String, default: '없음'}
})

module.exports = mongoose.model('Article', articleSchema)
