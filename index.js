import express from 'express';
import axios from 'axios';
import ejs from 'ejs';

const app = express();
const port = 3000;
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Create a route to render the homepage
app.get('/', async (req, res) => {
  try {
    // Make a request to the CocktailDB API to get a random cocktail
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const cocktailData = response.data.drinks[0];

    res.render('index', { cocktailData });
  } catch (error) {
    console.error(error);
    res.render('index', { error: 'An error occurred while fetching a cocktail.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
