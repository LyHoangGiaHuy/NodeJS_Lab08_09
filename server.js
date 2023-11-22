const express = require('express');
const app = express();
const cookie_parser = require('cookie')
const port = 8080;
const rateLimit = require('express-rate-limit');
const cors = require('cors');

require('./config/db/index');

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 5, // Max requests per windowMs
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(limiter);
app.use(cors());

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const errorRoute = require('./routes/error');

app.use('/api/account', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use(errorRoute);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})