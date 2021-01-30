import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, Router } from '../i18n';
import useSWR from 'swr';
import Select from 'react-select';
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import {
  getLandUseTotal,
  getGHGTotal,
  getWaterTotal,
  getEutroTotal,
  getTransportEmissions,
  convertToKilograms,
  getTotalByCategory,
} from '../utils/calculations';
import {
  getLocalStorageMeals,
  editLocalStorageMeal,
  addLocalStorageMeal,
} from '../utils/localStorageMeals';
import { useUser } from '../lib/hooks';
import Header from './Header';
import Card from './Card';
import Content from './Content';
import Pies from './Pies';
import IngredientForm from './IngredientForm';
import Ingredients from './Ingredients';
import PageTitle from './PageTitle';
import Button from './Button';
import Separator from './Separator';
import LoadingOnTop from './LoadingOnTop';
import InfoIcon from './InfoIcon';
import MyTooltip from './MyTooltip';
import theme from '../styles/theme';

const fetcher = (url) => fetch(url).then((r) => r.json());

const MealForm = ({ id, foodData, transportData, t }) => {
  const [user] = useUser();
  const { data, error } = useSWR(user && id ? `/api/meals?id=${id}` : null, fetcher);
  const localStorageMeals = getLocalStorageMeals();
  const [meal, setMeal] = useState(
    user ? data?.meals[0] : localStorageMeals.find((m) => m._id === id)
  );
  const [isLoading, setIsLoading] = useState(id && !meal);
  const [errorMsg, setErrorMsg] = useState('');
  const [mealName, setMealName] = useState(meal ? meal.title : '');
  const [aboutMeal, setAboutMeal] = useState(meal ? meal.about : '');
  const [mealLink, setMealLink] = useState(meal ? meal.link : '');
  const [ingredients, setIngredients] = useState(meal ? meal.ingredients : []);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingTransport, setIsAddingTransport] = useState(false);
  const initialUnits = [
    { value: 'g', label: t('g') },
    { value: 'kg', label: t('kg') },
    { value: 'oz', label: t('oz') },
    { value: 'lbs', label: t('lbs') },
  ];
  const [amountUnitOptions, setAmountUnitOptions] = useState(initialUnits);
  const distanceUnitOptions = [
    { value: 'km', label: t('km') },
    { value: 'mi', label: t('mi') },
  ];
  const transportModeOptions = [
    { value: 'road', label: t('road') },
    { value: 'rail', label: t('rail') },
    { value: 'water', label: t('water') },
    { value: 'air', label: t('air') },
  ];
  const transportTypeOptions = [
    { value: 'ambient', label: t('ambient') },
    { value: 'temperatureControlled', label: t('temperatureControlled') },
  ];
  const [amountUnit, setAmountUnit] = useState(amountUnitOptions[0].value);
  const [distanceUnit, setDistanceUnit] = useState(distanceUnitOptions[0].value);

  let foodOptions = [];
  for (let i = 0; i < foodData.length; i++) {
    for (let j = 0; j < foodData[i].entities.length; j++) {
      const label = t(foodData[i].entities[j].label);

      // No need to add the same entry twice
      if (!foodOptions.find((option) => option.label === label)) {
        foodOptions.push({
          key: foodData[i].key,
          value: `${foodData[i].key}${j}`,
          label,
          rawLabel: foodData[i].entities[j].label,
          averageWeight: foodData[i].entities[j].averageWeight,
          gramsPerLiter: foodData[i].entities[j].gramsPerLiter,
          factor: foodData[i].entities[j].factor,
        });
      }
    }
  }
  foodOptions = foodOptions.sort((a, b) => (a.label > b.label ? 1 : -1));

  const numberOfServingsOptions = [];
  for (let i = 0; i < 10; i++) {
    numberOfServingsOptions.push({
      value: i + 1,
      label: i === 0 ? t('serves_1') : t('serves', { number: i + 1 }),
    });
  }
  const [numberOfServings, setNumberOfServings] = useState(
    meal
      ? numberOfServingsOptions.find((o) => o.value === meal.numberOfServings)
      : numberOfServingsOptions[0]
  );

  useEffect(() => {
    if (data) {
      const mealData = data.meals[0];
      setMeal(mealData);
      setMealName(mealData.title);
      setAboutMeal(mealData.about);
      setMealLink(mealData.link);
      setIngredients(mealData.ingredients);
      setNumberOfServings(
        numberOfServingsOptions.find((o) => o.value === mealData.numberOfServings)
      );
      setIsLoading(false);
    }
  }, [data]);

  const saveMeal = async () => {
    setIsLoading(true);
    const currentMeal = {
      ownerId: user?._id,
      visibility: meal?.visibility || 'private',
      title: mealName,
      about: aboutMeal,
      link: mealLink,
      numberOfServings: numberOfServings.value,
      landUse: getLandUseTotal(ingredients, numberOfServings.value),
      ghgEmissions: getGHGTotal(ingredients, numberOfServings.value),
      waterWithdrawals: getWaterTotal(ingredients, numberOfServings.value),
      eutrophyingEmissions: getEutroTotal(ingredients, numberOfServings.value),
      ingredients,
    };

    // If the user is logged in, we store to database
    if (user) {
      if (meal) {
        // Edit meal
        const res = await fetch('/api/meals', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mealId: meal._id, meal: currentMeal }),
        });

        if (res.status === 201) {
          const response = await res.json();
        } else {
          setErrorMsg(await res.text());
        }
      } else {
        // Add new meal
        const res = await fetch('api/meals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ meal: currentMeal }),
        });

        if (res.status === 201) {
          const response = await res.json();
        } else {
          setErrorMsg(await res.text());
        }
      }
    } else {
      // Otherwise, we use localStorage (no user logged in)

      if (meal) {
        // Edit meal
        editLocalStorageMeal(meal._id, currentMeal);
      } else {
        // Add new meal
        addLocalStorageMeal(currentMeal);
      }
    }

    setIsLoading(false);
    Router.push('/mymeals');
  };

  const deleteIngredient = (index) => {
    const temp = [...ingredients];
    temp.splice(index, 1);
    setIngredients(temp);
  };

  const editIngredient = (index) => {
    const temp = [...ingredients];
  }

  const cancelIngredient = () => {
    setIsAdding(false);
    setIsAddingTransport(false);
  }

  const addIngredient = (selectedIngredient, amount, amountUnit, distance, distanceUnit, transportMode, transportType) => {
    const food = foodData.find((f) => f.key === selectedIngredient.key);
    /* console.log(foodData)
    console.log('selectedIngredient:', selectedIngredient)
    console.log('selectedIngredient.key:', selectedIngredient.key)
    console.log('food:', food)
    console.log('amount:', amount)
    console.log('amountUnit:', amountUnit)
    console.log('distance:', distance)
    console.log('distanceUnit:', distanceUnit)
    console.log('transportMode:', transportMode)
    console.log('transportType:', transportType) */
    const transportEmissions = getTransportEmissions(
      transportData,
      distance,
      distanceUnit,
      transportMode,
      transportType,
      amount,
      amountUnit,
      selectedIngredient
    );
    const amountInKilos = convertToKilograms(amount, amountUnit, selectedIngredient);
    const ghgEmissionBreakdown = {
      landUseChange: food.ghgEmissions.values.landUseChange * amountInKilos,
      animalFeed: food.ghgEmissions.values.animalFeed * amountInKilos,
      farm: food.ghgEmissions.values.farm * amountInKilos,
      processing: food.ghgEmissions.values.processing * amountInKilos,
      transport: transportEmissions
        ? transportEmissions * amountInKilos
        : food.ghgEmissions.values.transport * amountInKilos,
      packaging: food.ghgEmissions.values.packaging * amountInKilos,
      retail: food.ghgEmissions.values.retail * amountInKilos,
    };
    const ingredient = {
      key: selectedIngredient.key,
      rawLabel: selectedIngredient.rawLabel,
      amount,
      amountUnit,
      distance,
      distanceUnit,
      transportMode,
      transportType,
      landUse: {
        value: food.landUse.value * amountInKilos,
        unit: food.landUse.unit,
      },
      ghgEmissions: {
        values: ghgEmissionBreakdown,
        value:
          food.ghgEmissions.value * amountInKilos +
          (transportEmissions
            ? transportEmissions * amountInKilos
            : food.ghgEmissions.values.transport * amountInKilos),
        unit: food.ghgEmissions.unit,
      },
      eutrophyingEmissions: {
        value: food.eutrophyingEmissions.value * amountInKilos,
        unit: food.eutrophyingEmissions.unit,
      },
      waterWithdrawals: {
        value: food.waterWithdrawals.value * amountInKilos,
        unit: food.waterWithdrawals.unit,
      },
    };

    setIngredients((ingredients) => [...ingredients, ingredient]);
    setIsAdding(false);
  };

  return (
    <Fragment>
      <Header />
      <Content>
        <PageTitle>{id ? t('edit_meal') : t('new_meal')}</PageTitle>
        {isLoading && <LoadingOnTop blockUI />}
        <Card>
          <div className="servings-container">
            <div className="select-container number-of-servings-select">
              <Select
                value={numberOfServings}
                placeholder={t('no_of_servings')}
                onChange={(val) => setNumberOfServings(val)}
                options={numberOfServingsOptions}
                instanceId="number-of-servings"
              />
            </div>
            <InfoIcon title={t('servings_tooltip')} color={theme.colors.water} />
          </div>
        </Card>
        <Card>
          <Ingredients
            ingredients={ingredients}
            deleteIngredient={deleteIngredient}
            editIngredient={editIngredient}
            numberOfServings={numberOfServings.value}
            t={t}
          />
          <Separator />
          {isAdding ? (
            <IngredientForm meal={meal} foodData={foodData} addIngredient={addIngredient} cancelIngredient={cancelIngredient} 
            t={t} />
          ) : (
            <div className="add-ingredient-container">
              <Button onClick={() => setIsAdding(true)}>+ {t('add_ingredient')}</Button>
            </div>
          )}
        </Card>
        {ingredients.length > 0 && (
          <Card>
            <Pies
              meal={getTotalByCategory(ingredients, numberOfServings.value)}
              numberOfServings={numberOfServings.value}
              mealTitle={mealName}
              t={t}
            />
          </Card>
        )}
        <Card>
          <input
            type="text"
            name="meal-name"
            className="meal-input"
            placeholder={t('meal_name')}
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
          <textarea
            id="about-meal"
            name="about-meal"
            rows="4"
            cols="50"
            className="about-meal-input"
            placeholder={t('about_meal_optional')}
            value={aboutMeal}
            onChange={(e) => setAboutMeal(e.target.value)}
          />
          <input
            type="text"
            name="meal-link"
            className="link-input"
            placeholder={t('link_to_recipe_optional')}
            value={mealLink}
            onChange={(e) => setMealLink(e.target.value)}
          />
        </Card>
        <div className="button-container">
          <Button onClick={() => Router.push('/mymeals')} primary clear>
            {t('cancel')}
          </Button>
          <Button
            onClick={() => saveMeal()}
            disabled={ingredients.length === 0 || mealName === ''}
            primary
            animate
          >
            {t('save')}
          </Button>
        </div>

        <style jsx>{`
          input,
          textarea {
            display: block;
            padding: 7px 10px;
            border: 1px solid ${theme.colors.border};
            border-radius: 4px;
            font-family: ${theme.fontFamily.default};
            font-size: 16px;
            resize: none;
          }
          .meal-input {
            width: calc(100% - 20px);
            max-width: 400px;
            margin-bottom: 20px;
          }
          .link-input {
            width: calc(100% - 20px);
            margin-top: 20px;
          }
          .about-meal-input {
            width: calc(100% - 20px);
          }
          .required-fields,
          .optional-fields {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            width: 100%;
          }
          .optional-fields {
            margin-top: 20px;
          }
          .servings-container {
            display: flex;
            align-items: center;
          }
          .select-container {
            width: 100%;
          }
          .number-of-servings-select {
            width: 100%;
          }
          .add-ingredient-container {
            margin-top: 20px;
          }
          .optional-text {
            margin: 10px 0 0;
            font-size: 14px;
          }
          .button-container {
            margin-top: 20px;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
          }

          @media only screen and (min-width: ${theme.sizes.mobile}) {
            .required-fields {
              flex-wrap: nowrap;
            }
            .optional-fields {
              flex-wrap: ${isAddingTransport ? 'wrap' : 'nowrap'};
            }
            .select-container {
              width: 170px;
            }
            .number-of-servings-select {
              width: 300px;
            }
            .optional-text {
              margin: 10px 0;
            }
            .button-container {
              padding: 0;
            }
          }

          @media only screen and (min-width: ${theme.sizes.ipad}) {
            
          }
        `}</style>
      </Content>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  foodData: state.foodData,
  transportData: state.transportEmissions,
});

export default connect(mapStateToProps)(MealForm);
