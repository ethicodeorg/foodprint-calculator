import store from 'store';

export function getLocalStorageMeals() {
  return store.get('mymeals') || [];
}

export function deleteLocalStorageMeal(mealId) {
  const meals = store.get('mymeals');
  const oldEntryIndex = meals.indexOf(meals.find((m) => m._id === mealId));

  // Remove the old entry if we find it
  if (oldEntryIndex > -1) {
    meals.splice(oldEntryIndex, 1);
  }

  // Update the localStorage
  store.set('mymeals', meals);
}

export function editLocalStorageMeal(mealId, updatedMeal) {
  const oldMeals = store.get('mymeals') || [];
  const oldEntryIndex = oldMeals.indexOf(oldMeals.find((m) => m._id === mealId));

  // Remove the old entry if we find it
  if (oldEntryIndex > -1) {
    oldMeals.splice(oldEntryIndex, 1);
  }

  // Add the updated meal
  updatedMeal._id = mealId;
  const updatedMeals = [...oldMeals, updatedMeal];
  store.set('mymeals', updatedMeals);
}

export function addLocalStorageMeal(meal) {
  const oldMeals = store.get('mymeals') || [];

  // create unique id for localStorage management
  const randomThreeLetters = [0, 1, 2]
    .map((i) => String.fromCharCode(Math.floor(Math.random() * 25 + 97)))
    .reduce((pre, curr) => pre + curr, '');
  const id = `${meal.title} ${randomThreeLetters}`
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^A-Za-z0-9-]/g, '')
    .replace(/-+/, '-');
  meal._id = id;

  // Add the new meal to localStorage
  const updatedMeals = [...oldMeals, meal];
  store.set('mymeals', updatedMeals);
}

export function clearLocalStorageMeals() {
  store.set('mymeals', []);
}
