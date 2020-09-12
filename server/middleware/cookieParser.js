const parseCookies = (req, res, next) => {
  let ourCookies = {};
  if (req.headers.cookie) {
    let cookies = req.headers.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i]; //'name=value'
      let parts = c.split('=');
      ourCookies[parts[0]] = parts[1];
    }
  }

  req.cookies = ourCookies;
  next();
};



module.exports = parseCookies;
