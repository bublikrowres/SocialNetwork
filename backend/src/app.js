const express = require('express');
const cors = require('cors');
const usersController = require('./controllers/users.controller');
const sequalize = require('./models/databaseConnector');
const app = express();
const port = 3000;

// DB connect
sequalize.sync({
    force: true
}).then(() => {
    console.log('Succesfully connected to DB');
});


//middleware
app.use(cors());


app.get('/', (req, res) => res.send('Hello World!'));

app.use('/users', usersController);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));