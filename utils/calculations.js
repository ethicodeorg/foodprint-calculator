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

export function convertToBaseUnit(amount, unit, selectedIngredient) {
  if (selectedIngredient.baseUnit === 'kg') {
    return convertToKilograms(amount, unit, selectedIngredient);
  }

  return convertToLiters(amount, unit);
}

function convertToLiters(amount, unit) {
  switch (unit) {
    case 'tsp':
      return amount * (5 / 1000);
    case 'tbsp':
      return amount * (15 / 1000);
    case 'cups':
      return amount * (250 / 1000);
    case 'ltr':
      return amount;
    default:
      return amount;
  }
}

export function convertToKilograms(amount, unit, selectedIngredient) {
  const factoredAmount = amount * (selectedIngredient.factor || 1);

  switch (unit) {
    case 'qty':
      return (amount * selectedIngredient.averageWeight) / 1000;
    case 'tsp':
      return (factoredAmount * selectedIngredient.gramsPerLiter * (5 / 1000)) / 1000;
    case 'tbsp':
      return (factoredAmount * selectedIngredient.gramsPerLiter * (15 / 1000)) / 1000;
    case 'cups':
      return (factoredAmount * selectedIngredient.gramsPerLiter * (250 / 1000)) / 1000;
    case 'ltr':
      return (factoredAmount * selectedIngredient.gramsPerLiter) / 1000;
    case 'g':
      return factoredAmount / 1000;
    case 'oz':
      return (factoredAmount * 28.34952) / 1000;
    case 'lbs':
      return (factoredAmount * 453.59237) / 1000;
    case 'kg':
      return factoredAmount;
    default:
      return factoredAmount;
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
