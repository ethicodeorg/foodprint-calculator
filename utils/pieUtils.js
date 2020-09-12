import theme from '../styles/theme';

const RDAs = {
  landUse: 18,
  ghgEmissions: 4.8,
  waterWithdrawals: 1000,
  eutrophyingEmissions: 28,
};

export function getMealPieData(meal) {
  return [
    {
      name: 'land_use',
      total: meal.landUse,
      rda: RDAs.landUse,
      unit: 'm²',
      color: theme.colors.land,
    },
    {
      name: 'greenhouse_gas_emissions',
      total: meal.ghgEmissions,
      rda: RDAs.ghgEmissions,
      unit: 'kg',
      color: theme.colors.ghg,
    },
    {
      name: 'water_withdrawals',
      total: meal.waterWithdrawals,
      rda: RDAs.waterWithdrawals,
      unit: 'L',
      color: theme.colors.water,
    },
    {
      name: 'eutrophying_emissions',
      total: meal.eutrophyingEmissions,
      rda: RDAs.eutrophyingEmissions,
      unit: 'kgPO₄eq',
      color: theme.colors.eutro,
    },
  ];
}

export function getIngredientPieData(ingredient, numberOfServings) {
  return [
    {
      name: 'land_use',
      total: ingredient.landUse.value / numberOfServings,
      rda: RDAs.landUse,
      unit: 'm²',
      color: theme.colors.land,
    },
    {
      name: 'ghg_emissions',
      total: ingredient.ghgEmissions.value / numberOfServings,
      rda: RDAs.ghgEmissions,
      unit: 'kg',
      color: theme.colors.ghg,
    },
    {
      name: 'water_withdrawals',
      total: ingredient.waterWithdrawals.value / numberOfServings,
      rda: RDAs.waterWithdrawals,
      unit: 'L',
      color: theme.colors.water,
    },
    {
      name: 'eutrophying_emissions',
      total: ingredient.eutrophyingEmissions.value / numberOfServings,
      rda: RDAs.eutrophyingEmissions,
      unit: 'kgPO₄eq',
      color: theme.colors.eutro,
    },
  ];
}
