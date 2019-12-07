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
  console.log(req.body)
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
      ftime: cwf
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
  console.log(tm)
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
  let day = (req.query.day)%7
  var d = new Date()
  var today = d.getDay()
  var hour = d.getHours()
  var mint = d.getMinutes()
  let pds;
  let mds;
  console.log(day, today)
  time = hour*100 + mint
  //오늘을 눌렀을 때
  if(today === day){
    //그런데 지금이 새벽일 때
    if(0 <= hour && hour <= 4) {
      //날짜 상 토요일이나 금요일 밤 넘어서로 간주
      if(today === 5) {
        return Time.find({"wtime.ftime": {$gte: time, $lte: 600}})
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
        //날짜 상 일요일이나 토요일 밤 넘어서로 간주
        return Time.find({"satime.ftime": {$gte: time, $lte: 600}})
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
      else if(today === 0) {
        //날짜 상 월요일이나 일요일 밤 넘어서로 간주
        return Time.find({"sutime.ftime": {$gt: time, $lte: 600}})
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
        return Time.find({"wtime.ftime": {$gte: time, $lte: 600}})
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
      //그냥 정상적으로 처리
      if(today === 0) {
        return Time.find({$and:[{"sutime.ftime": {$gte: time}}, {"sutime.stime": {$lte: time}}]})
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
      else if(today == 6) {
        return Time.find({$and:[{"satime.ftime": {$gte: time}}, {"satime.stime": {$lte: time}}]})
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
        return Time.find({$and:[{"wtime.ftime": {$gte: time}}, {"wtime.stime": {$lte: time}}]})
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
    //오늘 말고 다른날을 눌렀을 때
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
