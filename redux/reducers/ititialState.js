import foods from '../../data/foods.json';
import landUse from '../../data/land-use.json';
import eutrophyingEmissions from '../../data/eutrophying-emissions.json';
import ghgEmissions from '../../data/ghg-emissions.json';
import waterWithdrawals from '../../data/water-withdrawals.json';
import transportEmissions from '../../data/transport-emissions.json';

function sumUpGHG(foodGHG) {
  return (
    foodGHG.landUseChange +
    foodGHG.animalFeed +
    foodGHG.farm +
    foodGHG.processing +
    foodGHG.transport +
    foodGHG.packaging +
    foodGHG.retail
  );
}

function getFoodData() {
  return foods.map((food) => {
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
        values: {
          landUseChange: foodGHG.landUseChange,
          animalFeed: foodGHG.animalFeed,
          farm: foodGHG.farm,
          processing: foodGHG.processing,
          transport: foodGHG.transport,
          packaging: foodGHG.packaging,
          retail: foodGHG.retail,
        },
        value: sumUpGHG(foodGHG),
        unit: foodGHG.unit,
      },
      waterWithdrawals: {
        value: foodWater.freshwaterWithdrawalsPerKilogram,
        unit: foodWater.unit,
      },
    };
  });
}

export function getInitialState() {
  return {
    transportEmissions,
    foodData: getFoodData(),
  };
}
