const Time = require('../../../models/objects');

exports.add = (req, res) => {
  const {
    name,
    type,
    ws,
    wf,
    sas,
    saf,
    sus,
    suf
  } = req.body
  var timetoint = function(st) {
    const cst = st.split(':')
    const rst = (+cst[0]) * 100 + (+cst[1])
    return rst;
  }
  let cws = timetoint(ws)
  let cwf = timetoint(wf)
  let csas = sas
  let csaf = saf
  let csus = sus
  let csuf = suf
  if (sas && saf) {
    csas = timetoint(sas)
    csaf = timetoint(saf)
  }
  if (sus && suf) {
    csus = timetoint(sus)
    csuf = timetoint(suf)
  }

  const tm = new Time({
    name: name,
    class: type,
    wtime: {
      stime: cws,
      ftime: cwf,
    },
    satime: {
      stime: csas,
      ftime: csaf
    },
    sutime: {
      stime: csus,
      ftime: csuf
    }
  })
  tm.save()
    .then(r => res.send({
      success: true,
      d: r
    }))
    .catch(err => res.send({
      success: false,
      msg: err.message
    }));
};
exports.change = (req, res) => {
  let day
  if (req.query.day === '10') {
    day = 10
  } else {
    day = (req.query.day % 7)
  }

  var d = new Date()
  console.log(d)
  var today = d.getDay()
  var hour = (d.getHours()+9)%24
  var mint = d.getMinutes()
  let pds;
  let mds;
  time = hour * 100 + mint

  //현재 영업 중을 눌렀을 때
  if(day === 10) {
    //그런데 지금이 오전일 때
    if(0 <= hour && hour <= 11) {
      //날짜 상 토요일이나 금요일 밤 넘어서로 간주
      if(today === 6) {
        return Time.find({$or: [{$and: [{"satime.stime": {$gte: 0, $lt: 1200}}, {"satime.stime": {$lt: time}}, {"satime.ftime": {$gte: 1200, $lt: 2400}}, {"satime.ftime": {$gt: time}}]},
        {$and: [{"satime.stime": {$gte: 0, $lt: 1200}}, {"satime.stime": {$lt: time}}, {"satime.ftime": {$gte: 0, $lt: 1200}}, {"satime.ftime": {$gt: time}}]},
      {$and: [{"wtime.ftime": {$gte: 0, $lt: 1200}}, {"wtime.ftime": {$gt: time}}]}]})
          .then((ds) => {
                res.send({
                  success: true,
                  data: ds
                })
              })
          .catch((err) => {
            res.send({
              success: false,
              msg: err.message
            });
          });
      }
      else if(today === 0) {
        //날짜 상 일요일이나 토요일 밤 넘어서로 간주
        return Time.find({$or: [{$and: [{"sutime.stime": {$gte: 0, $lt: 1200}}, {"sutime.stime": {$lt: time}}, {"sutime.ftime": {$gte: 1200, $lt: 2400}}, {"sutime.ftime": {$gt: time}}]},
        {$and: [{"sutime.stime": {$gte: 0, $lt: 1200}}, {"sutime.stime": {$lt: time}}, {"sutime.ftime": {$gte: 0, $lt: 1200}}, {"sutime.ftime": {$gt: time}}]},
      {$and: [{"satime.ftime": {$gte: 0, $lt: 1200}}, {"satime.ftime": {$gt: time}}]}]})
          .then((ds) => {
            res.send({
              success: true,
              data: ds,
            })
          })
          .catch((err) => {
            res.send({
              success: false,
              msg: err.message
            });
          });
      }
      else if(today === 1) {
        //날짜 상 월요일이나 일요일 밤 넘어서로 간주
        return Time.find({$or: [{$and: [{"wtime.stime": {$gte: 0, $lt: 1200}}, {"wtime.stime": {$lt: time}}, {"wtime.ftime": {$gte: 1200, $lt: 2400}}, {"wtime.ftime": {$gt: time}}]},
        {$and: [{"wtime.stime": {$gte: 0, $lt: 1200}}, {"wtime.stime": {$lt: time}}, {"wtime.ftime": {$gte: 0, $lt: 1200}}, {"wtime.ftime": {$gt: time}}]},
      {$and: [{"sutime.ftime": {$gte: 0, $lt: 1200}}, {"sutime.ftime": {$gt: time}}]}]})
          .then((ds) => {
            res.send({
              success: true,
              data: ds,
            })
          })
          .catch((err) => {
            res.send({
              success: false,
              msg: err.message
            });
          });
      }
      else {
        return Time.find({$or: [{$and: [{"wtime.stime": {$gte: 0, $lt: 1200}}, {"wtime.stime": {$lt: time}}, {"wtime.ftime": {$gt: time}}]},
        {$and: [{"wtime.stime": {$gte: 1200, $lt: 2400}}, {"wtime.ftime": {$lt: time}}]}]})
          .then((ds) => {
            res.send({
              success: true,
              data: ds,
            })
          })
          .catch((err) => {
            res.send({
              success: false,
              msg: err.message
            });
          });
      }
    }
    else {
      //지금이 오후
      console.log(time, today)
      if(today === 0) {
        return Time.find({$or: [{$and: [{"sutime.ftime": {$gte: 0, $lt: 1200}}, {"sutime.stime": {$lt: time}}]},
        {$and: [{"sutime.ftime": {$gte: 1200, $lt: 2400}}, {"sutime.ftime": {$gt: time}}, {"sutime.stime": {$gte: 0, $lt: 1200}}]},
      {$and: [{"sutime.ftime": {$gte: 1200, $lt: 2400}}, {"sutime.stime": {$lt: time}}, {"sutime.stime": {$gte: 1200, $lt: 2400}}, {"sutime.ftime": {$gt: time}}]}]})
      .then((ds) => {
        res.send({
          success: true,
          data: ds,
        })
      })
          .catch((err) => {
            res.send({
              success: false,
              msg: err.message
            });
          });
      }
      else if(today === 6) {
        return Time.find({$or: [{$and: [{"satime.ftime": {$gte: 0, $lt: 1200}}, {"satime.stime": {$lt: time}}]},
        {$and: [{"satime.ftime": {$gte: 1200, $lt: 2400}}, {"satime.ftime": {$gt: time}}, {"satime.stime": {$gte: 0, $lt: 1200}}]},
      {$and: [{"satime.ftime": {$gte: 1200, $lt: 2400}}, {"satime.stime": {$lt: time}}, {"satime.stime": {$gte: 1200, $lt: 2400}}, {"satime.ftime": {$gt: time}}]}]})
          .then((ds) => {
            res.send({
              success: true,
              data: ds,
            })
          })
          .catch((err) => {
            res.send({
              success: false,
              msg: err.message
            });
          });
      }
      else {
        return Time.find({$or: [{$and: [{"wtime.ftime": {$gte: 0, $lt: 1200}}, {"wtime.stime": {$lt: time}}]},
        {$and: [{"wtime.ftime": {$gte: 1200, $lt: 2400}}, {"wtime.ftime": {$gt: time}}, {"wtime.stime": {$gte: 0, $lt: 1200}}]},
      {$and: [{"wtime.ftime": {$gte: 1200, $lt: 2400}}, {"wtime.stime": {$lt: time}}, {"wtime.stime": {$gte: 1200, $lt: 2400}}, {"wtime.ftime": {$gt: time}}]}]})
        .then((ds) => {
            res.send({
              success: true,
              data: ds,
            })
          })
          .catch((err) => {
            res.send({
              success: false,
              msg: err.message
            });
          });
      }
    }
  }
  else {
    //현재 영업 중 말고 다른날을 눌렀을 때
    if(day === 0){
      //일요일
      return Time.find({"sutime.stime":{$ne: null}})
        .then((ds) => {
          res.send({
            success: true,
            data: ds,
          })
        })
        .catch((err) => {
          res.send({
            success: false,
            msg: err.message
          });
        });
    }
    else if(day === 6) {
      //토요일
      return Time.find({"satime.stime":{$ne: null}})
        .then((ds) => {
          res.send({
            success: true,
            data: ds,
          })
        })
        .catch((err) => {
          res.send({
            success: false,
            msg: err.message
          });
        });
    }
    else {
      //평일
      return Time.find({"wtime.stime":{$ne: null}})
        .then((ds) => {
          res.send({
            success: true,
            data: ds,
          })
        })
        .catch((err) => {
          res.send({
            success: false,
            msg: err.message
          });
        });
    }
  }
};

exports.del = (req, res) => {
  // res.send({ success: false, msg: 'del 준비중입니다' });
  const { id } = req.query;
  if (!id) return res.send({ success: false, msg: 'id not exists' });
  let cp;
  Time.findOne({ _id: id })
    .then(() => {
      return Time.remove({ _id: id });
    })
    .then(() => { // { n: 1, ok: 1 }
      res.send({ success: true });
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message });
    });
};
