export function getMealPieData(meal) {
  return [
    {
      name: 'Land use',
      total: meal.landUse,
      rda: 47,
      unit: 'm²',
      color: '#4caf50',
    },
    {
      name: 'GHG emissions',
      total: meal.ghgEmissions,
      rda: 17,
      unit: 'kg',
      color: '#e91e63',
    },
    {
      name: 'Water withdrawals',
      total: meal.waterWithdrawals,
      rda: 1500,
      unit: 'L',
      color: '#2196f3',
    },
    {
      name: 'Eutrophying emissions',
      total: meal.eutrophyingEmissions,
      rda: 50,
      unit: 'kgPO₄eq',
      color: '#222',
    },
  ];
}

export function getIngredientPieData(ingredient) {
  return [
    {
      name: 'Land use',
      total: ingredient.landUse.value,
      rda: 47,
      unit: 'm²',
      color: '#4caf50',
    },
    {
      name: 'GHG emissions',
      total: ingredient.ghgEmissions.value,
      rda: 17,
      unit: 'kg',
      color: '#e91e63',
    },
    {
      name: 'Water withdrawals',
      total: ingredient.waterWithdrawals.value,
      rda: 1500,
      unit: 'L',
      color: '#2196f3',
    },
    {
      name: 'Eutrophying emissions',
      total: ingredient.eutrophyingEmissions.value,
      rda: 50,
      unit: 'kgPO₄eq',
      color: '#222',
    },
  ];
}
