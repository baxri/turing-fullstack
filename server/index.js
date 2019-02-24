const next = require('next');
const express = require('express');
const db = require('./config/db.config');
var bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;




const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const routes = require('./routes');

nextApp.prepare().then(() => {

    // Connect and sync to database 
    db.sequelize.sync({
        force: false // keep existing data
    }).then(() => {
        console.log('Drop and Resync with { force: true }');
    });

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', routes);

    app.get('*', (req, res) => {
        return handle(req, res);
    });

    app.listen({ port: port }, () =>
        console.log(`🚀 Server ready at http://localhost:${port}`)
    );
});
