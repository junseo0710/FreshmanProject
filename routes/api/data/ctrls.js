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
  let day = req.query

  return Time.find()
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

};
