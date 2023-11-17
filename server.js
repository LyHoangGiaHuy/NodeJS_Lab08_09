const express = require('express');
const app = express();
const port = 8080;
require('./config/db/index');
const User = require('./models/UserSchema');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// const test = new User({ email: 'email@email.com', password: 'abc123' });
// test.save();
const userRoute = require('./routes/user');
const errorRoute = require('./routes/error');
app.use('/api/account', userRoute);
app.use(errorRoute);
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})