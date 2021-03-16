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
  convertToBaseUnit,
  getTotalByCategory,
} from '../utils/calculations';
import {
  getLocalStorageMeals,
  editLocalStorageMeal,
  addLocalStorageMeal,
} from '../utils/localStorageMeals';
import { setFocus } from '../utils/ui';
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

  const cancelIngredient = () => {
    setIsAdding(false);
  };

  const saveIngredient = (
    index,
    selectedIngredient,
    amount,
    amountUnit,
    distance,
    distanceUnit,
    transportMode,
    transportType
  ) => {
    const food = foodData.find((f) => f.key === selectedIngredient.key);
    console.log("selectedIngredient in MealForm.js: ", selectedIngredient)
    const transportEmissions = getTransportEmissions(
      transportData,
      distance,
      distanceUnit = distanceUnit.value,
      transportMode = transportMode.value,
      transportType = transportType.value,
      amount,
      amountUnit,
      selectedIngredient
    );
    const amountInBaseUnit = convertToBaseUnit(amount, amountUnit, selectedIngredient);
    const ghgEmissionBreakdown = {
      transport: transportEmissions
        ? transportEmissions * amountInBaseUnit
        : food.ghgEmissions.values.transport * amountInBaseUnit,
    };
    const ingredient = {
      key: selectedIngredient.key,
      value: selectedIngredient.value,
      rawLabel: selectedIngredient.rawLabel,
      amount,
      amountUnit: amountUnit.value,
      distance,
      distanceUnit,
      transportMode,
      transportType,
      landUse: {
        value: food.landUse.value * amountInBaseUnit,
        unit: food.landUse.unit,
      },
      ghgEmissions: {
        values: ghgEmissionBreakdown,
        value:
          food.ghgEmissions.value * amountInBaseUnit +
          (transportEmissions
            ? transportEmissions * amountInBaseUnit
            : food.ghgEmissions.values.transport * amountInBaseUnit),
        unit: food.ghgEmissions.unit,
      },
      eutrophyingEmissions: {
        value: food.eutrophyingEmissions.value * amountInBaseUnit,
        unit: food.eutrophyingEmissions.unit,
      },
      waterWithdrawals: {
        value: food.waterWithdrawals.value * amountInBaseUnit,
        unit: food.waterWithdrawals.unit,
      },
    };
    // problem - sometimes amountUnit is an object and other times it is a string
    if (typeof index != 'undefined') {
        const temp = [...ingredients];
        temp.splice(index, 1, ingredient);
        setIngredients(temp);
    } else {
        setIngredients((ingredients) => [...ingredients, ingredient])
        setIsAdding(false)
    }
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
            numberOfServings={numberOfServings.value}
            t={t}
            meal={meal}
            cancelIngredient={cancelIngredient}
            saveIngredient={saveIngredient}
          />
          <Separator />
          {isAdding ? (
            <IngredientForm
              meal={meal}
              cancelIngredient={cancelIngredient}
              saveIngredient={saveIngredient}
              t={t}
            />
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
