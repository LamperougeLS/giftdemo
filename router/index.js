module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/');
  });
  app.use('/login', require('./login'));

  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404');
    }
  });
};