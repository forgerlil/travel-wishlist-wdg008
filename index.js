const express = require('express');
const app = express();
const countriesRoute = require('./routes/countriesRoute');

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>
  res.send(
    '<p>Welcome to the travel wishlist! Go to /api/countries to see cool things happening</p>'
  )
);

app.use('/api', countriesRoute);

app.listen(port, () => console.log(`Server up on port ${port}`));
