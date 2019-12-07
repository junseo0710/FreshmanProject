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
            status: 1
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
            status: 1
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
            status: 1
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
            status: 1
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
    if(today == 0) {
      return Time.find({$and:[{"sutime.ftime": {$gte: time}}, {"sutime.stime": {$lte: time}}]})
        .then((ds) => {
          res.send({
            success: true,
            data: ds,
            status: 1
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
            status: 1
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
            status: 1
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
    return Time.find({"this.sutime":{$ne: null}})
      .then((ds) => {
        res.send({
          success: true,
          data: ds,
          status: -1
        })
      })
      .catch((err) => {
        res.send({
          success: false,
          msg: err.message
        });
      });
  }
  else if(day == 6) {
    //토요일
    return Time.find({"this.satime":{$ne: null}})
      .then((ds) => {
        res.send({
          success: true,
          data: ds,
          status: -1
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
    return Time.find({"this.wtime":{$ne: null}})
      .then((ds) => {
        res.send({
          success: true,
          data: ds,
          status: -1
        })
      })
      .catch((err) => {
        res.send({
          success: false,
          msg: err.message
        });
      });
  }
