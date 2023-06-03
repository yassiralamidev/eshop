const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express();
const PORT = 8080;

// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/products', productRoutes);
app.use('/user',userRoutes);

// database connection
mongoose
  .connect('mongodb://127.0.0.1:27017/eshopdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected...');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
