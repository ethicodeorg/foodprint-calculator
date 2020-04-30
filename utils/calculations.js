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

function convertToTonnes(weight, unit) {
  return convertToKilograms(weight, unit) / 1000;
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
  weight,
  weightUnit
) {
  const distanceInKilometers = convertToKilometers(distance, distanceUnit);
  const weightInTonnes = convertToTonnes(weight, weightUnit);

  return distanceInKilometers * weightInTonnes * transportData[transportMode][transportType];
}

export function getTransportEmissions(
  transportData,
  distance,
  distanceUnit,
  transportMode,
  transportType,
  weight,
  weightUnit
) {
  return distance
    ? convertTransportToKilograms(
        transportData,
        distance,
        distanceUnit,
        transportMode,
        transportType,
        weight,
        weightUnit
      )
    : 0;
}

export function convertToKilograms(weight, unit) {
  switch (unit) {
    case 'g':
      return weight / 1000;
    case 'oz':
      return weight / 35.274;
    case 'lbs':
      return weight / 2.2046;
    case 'kg':
      return weight;
    default:
      return weight;
  }
}
