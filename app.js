const express = require('express'),
      app     = express(),
      ejs     = require('ejs'),
      routes  = require('./routes/index');
      
app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use('/', routes);

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server started!');
});