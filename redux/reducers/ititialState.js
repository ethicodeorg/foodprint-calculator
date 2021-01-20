import foods from '../../data/foods-expanded.json';
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
    const foodLandUse = landUse.find((l) => l.code === food.key);
    const foodEutro = eutrophyingEmissions.find((e) => e.code === food.key);
    const foodGHG = ghgEmissions.find((g) => g.code === food.key);
    const foodWater = waterWithdrawals.find((w) => w.code === food.key);
    /* console.log(food.key);
    console.log(sumUpGHG(foodGHG));
    console.log(foodGHG.ghgEmissionsPerUnit); */

    return {
      key: food.key,
      entities: food.foods,
      baseUnit: food.baseUnit,
      landUse: {
        value: foodLandUse.landUsePerUnit,
      },
      eutrophyingEmissions: {
        value: foodEutro.eutrophyingEmissionsPerUnit,
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
        value: foodGHG.ghgEmissionsPerUnit,
      },
      waterWithdrawals: {
        value: foodWater.freshwaterWithdrawalsPerUnit,
      },
    };
  });
}

export function getInitialState() {
  return {
    transportEmissions,
    foodData: getFoodData(),
    comparisons: [
      '600426428efd1c0009d98b00',
      '600427d28efd1c0009d98b01',
      '6004288997a9570008209454',
    ],
  };
}
