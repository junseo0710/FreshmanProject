module.exports = {
    db: {
        // url: 'mongodb://nembv:비밀번호@cluster0-xxx.mongodb.net:27017,cluster0-xxx.mongodb.net:27017,cluster0-xxx.mongodb.net:27017/nembv?ssl=true&replicaSet=Cluster0-xxx&authSource=admin'
        url : 'mongodb+srv://june:123Qwe@cluster0-phzy9.mongodb.net/test'
        // url : 'mongodb+srv://id:pwd@cluster0-xxx.net/yyy' // 3.6이상
    },
    web: {
      cors: true,
    },
    path: {
      api: 'http://kong.sparcs.org:10005/api/'
    },
};
