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
    const hm=ws.split(':');
    const cws = (+hm[0])*100+(+hm[1])
    const hm2=ws.split(':');
    const cwf = (+hm2[0])*100+(+hm2[1])
  const tm = new Time({
    name: name,
    class: type,
    wtime: {
      stime:cws,
      ftime:cwf
    },
    satime: {
      stime:sas,
      ftime:saf
    },
    sutime: {
      stime:sus,
      ftime:suf
    }
  })
  console.log(req.body)
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
  res.send({
    success: false,
    msg: 'change 준비중입니다'
  });
};
