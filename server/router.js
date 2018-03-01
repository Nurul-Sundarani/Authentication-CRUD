const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.post('/insertdata',requireSignin , Authentication.insert);
  app.get('/getdata', requireSignin , Authentication.get);
  app.put('/updatedata/:id',requireSignin, Authentication.put);
  app.delete('/deletedata/:id', requireSignin , Authentication.delete);
};
