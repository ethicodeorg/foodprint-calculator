import foods from '../../data/foods.json';
import landUse from '../../data/land-use.json';
import eutrophyingEmissions from '../../data/eutrophying-emissions.json';
import ghgEmissions from '../../data/ghg-emissions.json';
import waterWithdrawals from '../../data/water-withdrawals.json';

function sumUpGHG(foodGHG) {
  return (
    foodGHG.landUseChange +
    foodGHG.animalFeed +
    foodGHG.farm +
    foodGHG.processing +
    // foodGHG.transport +  Excluded for now but we should add this if the user doesn't add transport manually
    foodGHG.packaging +
    foodGHG.retail
  );
}

export default (req, res) => {
  const data = foods.map((food) => {
    const foodLandUse = landUse.find((l) => l.entity === food);
    const foodEutro = eutrophyingEmissions.find((e) => e.entity === food);
    const foodGHG = ghgEmissions.find((g) => g.entity === food);
    const foodWater = waterWithdrawals.find((w) => w.entity === food);

    return {
      entity: food,
      landUse: {
        value: foodLandUse.landUsePerKilogram,
        unit: foodLandUse.unit,
      },
      eutrophyingEmissions: {
        value: foodEutro.eutrophyingEmissionsPerKilogram,
        unit: foodEutro.unit,
      },
      ghgEmissions: {
        value: sumUpGHG(foodGHG),
        unit: foodGHG.unit,
      },
      waterWithdrawals: {
        value: foodWater.freshwaterWithdrawalsPerKilogram,
        unit: foodWater.unit,
      },
    };
  });

  res.status(200).json(data);
};
