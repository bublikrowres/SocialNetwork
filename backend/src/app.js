const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersController = require('./controllers/users.controller');
const adminController = require('./controllers/admin.controller');
const wallController = require('./controllers/wall.controller');
const { sequelize } = require('./models/databaseConnector');
const app = express();
const port = 3000;
const config = require('config');

// DB connect
sequelize.sync({
    force: false
}).then(() => {
    console.log('Succesfully connected to DB');
});

//middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send(config.endpoints));

app.use('/users', usersController);
app.use('/admin', adminController);

app.use('/wall', wallController);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));