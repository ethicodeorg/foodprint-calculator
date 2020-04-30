const RDAs = {
  landUse: 18,
  ghgEmissions: 4.8,
  waterWithdrawals: 1000,
  eutrophyingEmissions: 28,
};

export function getMealPieData(meal) {
  return [
    {
      name: 'Land use',
      total: meal.landUse,
      rda: RDAs.landUse,
      unit: 'm²',
      color: '#4caf50',
    },
    {
      name: 'GHG emissions',
      total: meal.ghgEmissions,
      rda: RDAs.ghgEmissions,
      unit: 'kg',
      color: '#e91e63',
    },
    {
      name: 'Water withdrawals',
      total: meal.waterWithdrawals,
      rda: RDAs.waterWithdrawals,
      unit: 'L',
      color: '#2196f3',
    },
    {
      name: 'Eutrophying emissions',
      total: meal.eutrophyingEmissions,
      rda: RDAs.eutrophyingEmissions,
      unit: 'kgPO₄eq',
      color: '#222',
    },
  ];
}

export function getIngredientPieData(ingredient, numberOfServings) {
  return [
    {
      name: 'Land use',
      total: ingredient.landUse.value / numberOfServings,
      rda: RDAs.landUse,
      unit: 'm²',
      color: '#4caf50',
    },
    {
      name: 'GHG emissions',
      total: ingredient.ghgEmissions.value / numberOfServings,
      rda: RDAs.ghgEmissions,
      unit: 'kg',
      color: '#e91e63',
    },
    {
      name: 'Water withdrawals',
      total: ingredient.waterWithdrawals.value / numberOfServings,
      rda: RDAs.waterWithdrawals,
      unit: 'L',
      color: '#2196f3',
    },
    {
      name: 'Eutrophying emissions',
      total: ingredient.eutrophyingEmissions.value / numberOfServings,
      rda: RDAs.eutrophyingEmissions,
      unit: 'kgPO₄eq',
      color: '#222',
    },
  ];
}
