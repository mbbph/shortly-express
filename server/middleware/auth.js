const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  Promise.resolve(req.cookies.shortlyid)
    .then((hash) => {
      if (!hash) {
        throw hash;
      }
      return models.Sessions.get({hash});
    })
    .tap((session) => {
      if (!session) {
        throw session;
      }
    })
    .catch(() => {
      return models.Sessions.create()
        .then(results => {
          return models.Sessions.get({id: results.insertId});
        })
        .tap(session => {
          res.cookie('shortlyid', session.hash);
        });
    })
    .then(session => {
      req.session = session;
      next();
    });
};

// module.exports.createSession = (req, res, next) => {
//   let oursession = {};
//   if (!req.cookies.shortlyid) { //if shortlyid cookie doesnt exist
//     models.Sessions.create() //create new session
//       .then((result) => {
//         if (result) { //insertion was successful
//           let id = result.insertId;
//           models.Sessions.get({id})
//             .then((hash) => {
//               req.sessions = hash;
//               res.cookies.shortlyid = hash;
//             });
//         }
//       });
//   } else if (req.cookies.shortlyid) { //if shortlyid cookie exists
//     let hash = req.cookies.shortlyid; //try to get the session
//     models.Sessions.get({hash})
//       .then((result) => {

//       });
//   } else { //either no cookies or unrelated cookies

//   }
// };

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySession = (req, res, next) => {
  if (!models.Sessions.isLoggedIn(req.session)) {//check if there's user in current session
    res.redirect('/login');
  } else {
    next();
  }
};
