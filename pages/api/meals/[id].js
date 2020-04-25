import meals from '../../../data/meals.json';

export default (req, res) => {
  const meal = meals.find((m) => m.id === req.query.id);

  if (!meal) {
    res.status(404).json(`Meal with id ${req.query.id} not found`);
  }
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);
    meals.push(body);
    const data = JSON.stringify(meals);
    const fs = require('fs');
    fs.writeFile(
      __dirname + '/Users/atlidohop/Documents/foodprint-calculator/data/meals.json',
      data,
      (err) => {
        if (err) throw err;
      }
    );

    return res.status(201).json(meals);
  } else if (req.method === 'GET') {
    return res.status(200).json(meal);
  }
};
