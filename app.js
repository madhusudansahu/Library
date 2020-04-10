const express = require('express');
const chalk = require('chalk');// for beautification
const debug = require('debug')('app');// debug use DEBUG=app node app.js
const morgan = require('morgan');// provide more details during access.
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

bookRouter.route('/books')
.get((req, resp)=>{
    
    resp.send(resp.json({"name":"hello book"}));
});
app.use('/', bookRouter); // Route is initialize to work.


app.get('/', function (req, res) {
    //res.sendFile(path.join(__dirname, 'views/index.html'));
    res.render('index',
        {
            nav: [
                { 'link': '/books', 'title': 'BOOKS' },
                { 'link': '/authors', 'title': 'AUTHORS' }
            ],
            title: 'EJS template'
        }
    );
});

app.listen(port, function () {
    console.log(`Server running at ${chalk.green(port)}`);
    debug('running on debug mode.');
})