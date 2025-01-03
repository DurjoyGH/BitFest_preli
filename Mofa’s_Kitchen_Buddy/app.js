const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const ingredientRoutes = require('./routes/ingredientRoutes');
const recipesRouter = require("./routes/recipesRouter");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.DB_CONNECTION)

app.use('/api/ingredients', ingredientRoutes);
app.use('/api/recipes', recipesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});