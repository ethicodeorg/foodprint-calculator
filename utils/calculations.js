export function getLandUseTotal(ingredients = [], numberOfServings = 1) {
  const total = ingredients.reduce((acc, ingredient) => acc + ingredient.landUse.value, 0);
  return total / numberOfServings;
}

export function getGHGTotal(ingredients = [], numberOfServings = 1) {
  const total = ingredients.reduce((acc, ingredient) => acc + ingredient.ghgEmissions.value, 0);
  return total / numberOfServings;
}

export function getWaterTotal(ingredients = [], numberOfServings = 1) {
  const total = ingredients.reduce((acc, ingredient) => acc + ingredient.waterWithdrawals.value, 0);
  return total / numberOfServings;
}

export function getEutroTotal(ingredients = [], numberOfServings = 1) {
  const total = ingredients.reduce(
    (acc, ingredient) => acc + ingredient.eutrophyingEmissions.value,
    0
  );
  return total / numberOfServings;
}

function convertToTonnes(amount, unit, selectedIngredient) {
  return convertToKilograms(amount, unit, selectedIngredient) / 1000;
}

function convertToKilometers(distance, unit) {
  switch (unit) {
    case 'km':
      return distance;
    case 'mi':
      return distance / 0.62137;
    default:
      return distance;
  }
}

function convertTransportToKilograms(
  transportData,
  distance,
  distanceUnit,
  transportMode,
  transportType,
  amount,
  amountUnit,
  selectedIngredient
) {
  const distanceInKilometers = convertToKilometers(distance, distanceUnit);
  const weightInTonnes = convertToTonnes(amount, amountUnit, selectedIngredient);

  return distanceInKilometers * weightInTonnes * transportData[transportMode][transportType];
}

export function getTransportEmissions(
  transportData,
  distance,
  distanceUnit,
  transportMode,
  transportType,
  amount,
  amountUnit,
  selectedIngredient
) {
  return distance
    ? convertTransportToKilograms(
        transportData,
        distance,
        distanceUnit,
        transportMode,
        transportType,
        amount,
        amountUnit,
        selectedIngredient
      )
    : 0;
}

export function convertToKilograms(amount, unit, selectedIngredient) {
  switch (unit) {
    case 'qty':
      return (amount * selectedIngredient.averageWeight) / 1000;
    case 'tsp':
      return (amount * selectedIngredient.gramsPerLiter * (5 / 1000)) / 1000;
    case 'tbsp':
      return (amount * selectedIngredient.gramsPerLiter * (15 / 1000)) / 1000;
    case 'cups':
      return (amount * selectedIngredient.gramsPerLiter * (250 / 1000)) / 1000;
    case 'ltr':
      return (amount * selectedIngredient.gramsPerLiter) / 1000;
    case 'g':
      return amount / 1000;
    case 'oz':
      return amount / 35.274;
    case 'lbs':
      return amount / 2.2046;
    case 'kg':
      return amount;
    default:
      return amount;
  }
}

export function getTotalByCategory(ingredients, numberOfServings) {
  return {
    landUse: getLandUseTotal(ingredients, numberOfServings),
    ghgEmissions: getGHGTotal(ingredients, numberOfServings),
    waterWithdrawals: getWaterTotal(ingredients, numberOfServings),
    eutrophyingEmissions: getEutroTotal(ingredients, numberOfServings),
  };
}
