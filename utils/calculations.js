export function getLandUseTotal(ingredients = []) {
  const total = ingredients.reduce((acc, ingredient) => acc + ingredient.landUse.value, 0);
  return total;
}

export function getGHGTotal(ingredients = []) {
  const total = ingredients.reduce((acc, ingredient) => acc + ingredient.ghgEmissions.value, 0);
  return total;
}

export function getWaterTotal(ingredients = []) {
  const total = ingredients.reduce((acc, ingredient) => acc + ingredient.waterWithdrawals.value, 0);
  return total;
}

export function getEutroTotal(ingredients = []) {
  const total = ingredients.reduce(
    (acc, ingredient) => acc + ingredient.eutrophyingEmissions.value,
    0
  );
  return total;
}

function convertToTonKilometers(distance, unit) {
  switch (unit) {
    case 'km':
      return distance / 1000;
    case 'mi':
      return distance / 0.62137 / 1000;
    default:
      return distance;
  }
}

function convertTransportToKilograms(
  transportData,
  distance,
  distanceUnit,
  transportMode,
  transportType
) {
  const distanceInTonKilometers = convertToTonKilometers(distance, distanceUnit);
  console.log(distanceInTonKilometers);
  console.log(transportData);
  return distanceInTonKilometers * transportData[transportMode][transportType];
}

export function getTransportEmissions(
  transportData,
  distance,
  distanceUnit,
  transportMode,
  transportType
) {
  return distance
    ? convertTransportToKilograms(
        transportData,
        distance,
        distanceUnit,
        transportMode,
        transportType
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
