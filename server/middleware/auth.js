const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  let oursession = {};
  if (!req.cookies.shortlyid) { //if shortlyid cookie doesnt exist
    models.Sessions.create() //create new session
      .then((result) => {
        if (result) { //insertion was successful
          let id = result.insertId;
          models.Sessions.get({id})
            .then((hash) => {
              req.sessions = hash;
              res.cookies.shortlyid = hash;
            });
        }
      });
  } else if (req.cookies.shortlyid) { //if shortlyid cookie exists
    let hash = req.cookies.shortlyid; //try to get the session
    models.Sessions.get({hash})
      .then((result) => {

      });
  } else { //either no cookies or unrelated cookies

  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
