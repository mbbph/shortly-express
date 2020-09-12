const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  let oursession = {};
  if (!req.cookies.shortlyid) {
    models.Sessions.create() //what does create return
      .then((result) => {


      });
  } else if (!req.cookies.shortlyid) {
    let hash = req.cookies.shortlyid;
    models.Sessions.get({hash})
  } else { //either no cookies or unrelated cookies

  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
