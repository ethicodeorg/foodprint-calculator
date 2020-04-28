export const LOAD_FOOD_DATA = 'LOAD_FOOD_DATA';

export const loadFoodData = () => ({
  type: LOAD_FOOD_DATA,
  foodData: getFoodData(),
});
