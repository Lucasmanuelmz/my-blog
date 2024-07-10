const session = require('express-session');

app.use(session({
   secret: 'rewwuydfgtehurojhgdfy', cookie: {maxAge: 300000}
 }))



module.exports = authDashboard;