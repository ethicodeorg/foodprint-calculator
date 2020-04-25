import meals from '../../data/meals.json';

export default (req, res) => {
  if (req.method === 'POST') {
    // write to database
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

    res.status(201).json(meals);
  } else if (req.method === 'GET') {
    res.status(200).json(meals);
  }
};
