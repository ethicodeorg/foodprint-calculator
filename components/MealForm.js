import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Autocomplete from 'react-autocomplete';
import Select from 'react-select';
import { addMeal, editMeal } from '../redux/actions/pageActions';
import {
  getLandUseTotal,
  getGHGTotal,
  getWaterTotal,
  getEutroTotal,
  getTransportEmissions,
  convertToKilograms,
  getTotalByCategory,
} from '../utils/calculations';
import Header from '../components/Header';
import Card from '../components/Card';
import Content from '../components/Content';
import Pies from '../components/Pies';
import TinyPies from '../components/TinyPies';
import Ingredients from '../components/Ingredients';
import CardTitle from '../components/CardTitle';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import theme from '../styles/theme';

const MealForm = ({ meal, foodData, transportData, addNewMeal, updateMeal }) => {
  const [mealName, setMealName] = useState(meal ? meal.title : '');
  const [aboutMeal, setAboutMeal] = useState(meal ? meal.about : '');
  const [mealLink, setMealLink] = useState(meal ? meal.link : '');
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [autocompleteLabel, setAutocompleteLabel] = useState('');
  const [weight, setWeight] = useState('');
  const [distance, setDistance] = useState('');
  const [transportMode, setTransportMode] = useState('');
  const [transportType, setTransportType] = useState('');
  const [ingredients, setIngredients] = useState(meal ? meal.ingredients : []);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingTransport, setIsAddingTransport] = useState(false);
  const weightUnitOptions = [
    { value: 'g', label: 'Grams (g)' },
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'oz', label: 'Ounces (oz)' },
    { value: 'lbs', label: 'Pounds (lbs)' },
  ];
  const distanceUnitOptions = [
    { value: 'km', label: 'Kilometers (km)' },
    { value: 'mi', label: 'Miles (mi)' },
  ];
  const transportModeOptions = [
    { value: 'road', label: 'Road Transport' },
    { value: 'rail', label: 'Rail Transport' },
    { value: 'water', label: 'Sea / Inland Water Transport' },
    { value: 'air', label: 'Air Transport' },
  ];
  const transportTypeOptions = [
    { value: 'ambient', label: 'Ambient transport' },
    { value: 'temperatureControlled', label: 'Temperature-controlled transport' },
  ];
  const [weightUnit, setWeightUnit] = useState(weightUnitOptions[0].value);
  const [distanceUnit, setDistanceUnit] = useState(distanceUnitOptions[0].value);

  let foodOptions = [];
  for (let i = 0; i < foodData.length; i++) {
    for (let j = 0; j < foodData[i].entities.length; j++) {
      foodOptions.push({ value: foodData[i].key, label: foodData[i].entities[j] });
    }
  }
  foodOptions = foodOptions.sort((a, b) => (a.label > b.label ? 1 : -1));

  const numberOfServingsOptions = [];
  for (let i = 0; i < 10; i++) {
    numberOfServingsOptions.push({
      value: i + 1,
      label: `Serves ${i + 1} ${i === 0 ? 'person' : 'people'}`,
    });
  }
  const [numberOfServings, setNumberOfServings] = useState(
    meal
      ? numberOfServingsOptions.find((o) => o.value === meal.numberOfServings)
      : numberOfServingsOptions[0]
  );

  const saveMeal = () => {
    const currentMeal = {
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

    if (meal) {
      updateMeal(meal.id, currentMeal);
    } else {
      addNewMeal(currentMeal);
    }

    Router.push('/meals');
  };

  const deleteIngredient = (index) => {
    const temp = [...ingredients];
    temp.splice(index, 1);
    setIngredients(temp);
  };

  const addIngredient = () => {
    const food = foodData.find((f) => f.key === autocompleteValue);
    const transportEmissions = getTransportEmissions(
      transportData,
      distance,
      distanceUnit,
      transportMode,
      transportType,
      weight,
      weightUnit
    );
    const ghgEmissionBreakdown = {
      landUseChange:
        food.ghgEmissions.values.landUseChange * convertToKilograms(weight, weightUnit),
      animalFeed: food.ghgEmissions.values.animalFeed * convertToKilograms(weight, weightUnit),
      farm: food.ghgEmissions.values.farm * convertToKilograms(weight, weightUnit),
      processing: food.ghgEmissions.values.processing * convertToKilograms(weight, weightUnit),
      transport: transportEmissions
        ? transportEmissions * convertToKilograms(weight, weightUnit)
        : food.ghgEmissions.values.transport * convertToKilograms(weight, weightUnit),
      packaging: food.ghgEmissions.values.packaging * convertToKilograms(weight, weightUnit),
      retail: food.ghgEmissions.values.retail * convertToKilograms(weight, weightUnit),
    };
    const ingredient = {
      key: autocompleteValue,
      label: autocompleteLabel,
      weight,
      weightUnit,
      distance,
      distanceUnit,
      transportMode,
      transportType,
      landUse: {
        value: food.landUse.value * convertToKilograms(weight, weightUnit),
        unit: food.landUse.unit,
      },
      ghgEmissions: {
        values: ghgEmissionBreakdown,
        value:
          food.ghgEmissions.value * convertToKilograms(weight, weightUnit) + transportEmissions,
        unit: food.ghgEmissions.unit,
      },
      eutrophyingEmissions: {
        value: food.eutrophyingEmissions.value * convertToKilograms(weight, weightUnit),
        unit: food.eutrophyingEmissions.unit,
      },
      waterWithdrawals: {
        value: food.waterWithdrawals.value * convertToKilograms(weight, weightUnit),
        unit: food.waterWithdrawals.unit,
      },
    };

    setIngredients((ingredients) => [...ingredients, ingredient]);
    setWeight('');
    setDistance('');
    setAutocompleteValue('');
    setAutocompleteLabel('');
    setIsAdding(false);
    setIsAddingTransport(false);
    setWeightUnit(weightUnitOptions[0].value);
  };

  return (
    <Fragment>
      <Header activePage={meal ? 'meals' : 'new'} />
      <Content>
        <PageTitle>{meal ? 'Edit meal' : 'New Meal Calculation'}</PageTitle>
        <Card>
          <div className="select-container number-of-servings-select">
            <Select
              value={numberOfServings}
              placeholder="Number of servings"
              onChange={(val) => setNumberOfServings(val)}
              options={numberOfServingsOptions}
            />
          </div>
        </Card>
        <Card>
          <Ingredients
            ingredients={ingredients}
            deleteIngredient={deleteIngredient}
            numberOfServings={numberOfServings.value}
          />
          {isAdding ? (
            <Card inner>
              <div className="required-fields">
                <div className="select-container ingredient-select">
                  <Select
                    value={autocompleteValue.value}
                    placeholder="Ingredient"
                    onChange={(val) => {
                      setAutocompleteValue(val.value);
                      setAutocompleteLabel(val.label);
                    }}
                    options={foodOptions}
                  />
                </div>
                <input
                  className="weight-input"
                  placeholder="Weight"
                  type="number"
                  name="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <div className="select-container">
                  <Select
                    value={weightUnit.value}
                    placeholder="Unit"
                    onChange={(val) => setWeightUnit(val.value)}
                    options={weightUnitOptions}
                  />
                </div>
              </div>
              {isAddingTransport ? (
                <div className="optional-fields">
                  <div className="select-container transport-mode-select">
                    <Select
                      value={transportMode.value}
                      placeholder="Transport mode"
                      onChange={(val) => setTransportMode(val.value)}
                      options={transportModeOptions}
                    />
                  </div>
                  <div className="select-container transport-type-select">
                    <Select
                      value={transportType.value}
                      placeholder="Transport type"
                      onChange={(val) => setTransportType(val.value)}
                      options={transportTypeOptions}
                    />
                  </div>
                  <input
                    className="distance-input"
                    placeholder="Distance"
                    type="number"
                    name="distance"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                  <div className="select-container transport-unit-select">
                    <Select
                      value={distanceUnit.value}
                      placeholder="Unit"
                      onChange={(val) => setDistanceUnit(val.value)}
                      options={distanceUnitOptions}
                    />
                  </div>
                </div>
              ) : (
                <div className="optional-fields">
                  <div className="add-transport-button-container">
                    <Button onClick={() => setIsAddingTransport(true)}>+ Add Transport</Button>
                  </div>
                  <span className="optional-text">
                    *If transport is not provided, the average transport emissions for the selected
                    ingredient will be used
                  </span>
                </div>
              )}
              <div className="add-button-container">
                <Button onClick={() => addIngredient()} disabled={!autocompleteValue || !weight}>
                  Add
                </Button>
              </div>
            </Card>
          ) : (
            <div className="add-ingredient-container">
              <Button onClick={() => setIsAdding(true)}>+ Add Ingredient</Button>
            </div>
          )}
        </Card>
        {ingredients.length > 0 && (
          <Card>
            <Pies
              meal={getTotalByCategory(ingredients, numberOfServings.value)}
              numberOfServings={numberOfServings.value}
            />
          </Card>
        )}
        <Card>
          <input
            type="text"
            name="meal-name"
            className="meal-input"
            placeholder="Meal name"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
          <textarea
            id="about-meal"
            name="about-meal"
            rows="4"
            cols="50"
            className="about-meal-input"
            placeholder="About meal (optional)"
            value={aboutMeal}
            onChange={(e) => setAboutMeal(e.target.value)}
          />
          <input
            type="text"
            name="meal-link"
            className="link-input"
            placeholder="Link to recipe (optional)"
            value={mealLink}
            onChange={(e) => setMealLink(e.target.value)}
          />
        </Card>
        <div className="button-container">
          <Button onClick={() => Router.push('/meals')} primary clear>
            Cancel
          </Button>
          <Button
            onClick={() => saveMeal()}
            disabled={ingredients.length === 0 || mealName === ''}
            primary
          >
            Save
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
          .weight-input,
          .distance-input {
            width: 100%;
            margin: 0 0 20px 0;
          }
          .add-ingredient {
            display: flex;
            flex-wrap: wrap;
            padding: 20px;
            border: 1px solid ${theme.colors.border};
            border-radius: 4px;
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
          .select-container {
            width: 100%;
          }
          .number-of-servings-select {
            width: 100%;
          }
          .ingredient-select {
            width: 100%;
            margin-bottom: 20px;
          }
          .transport-mode-select {
            width: 100%;
            margin-bottom: 20px;
          }
          .transport-type-select {
            width: 100%;
            margin-bottom: 20px;
          }
          .transport-unit-select {
            width: 100%;
            margin-right: 0;
          }
          .add-button {
            font-size: 16px;
            font-weight: bold;
            width: 180px;
            margin: 20px 0 0;
            padding: 10px;
            background-color: ${theme.colors.land};
            opacity: 1;
            transition: opacity 0.2s;
            cursor: pointer;
            border-radius: 4px;
            border: none;
            color: #fff;
          }
          .add-transport-button {
            font-size: 16px;
            font-weight: bold;
            width: 180px;
            margin-right: 20px;
            padding: 10px;
            background-color: ${theme.colors.land};
            opacity: 1;
            transition: opacity 0.2s;
            cursor: pointer;
            border-radius: 4px;
            border: none;
            color: #fff;
          }
          .add-button:disabled {
            opacity: 0.7;
            cursor: default;
          }
          .add-button:hover {
            opacity: 0.7;
          }
          .add-transport-button-container {
            margin-right: 20px;
            min-width: 160px;
          }
          .add-button-container {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            margin-top: 20px;
          }
          .add-ingredient-container {
            margin-top: 20px;
          }
          .add-button {
            width: 100px;
            margin-bottom: 0;
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
          .save-button {
            font-size: 20px;
            font-weight: bold;
            width: 220px;
            margin-top: 30px;
            padding: 15px;
            background-color: ${theme.colors.water};
            opacity: 1;
            transition: opacity 0.2s;
            cursor: pointer;
            border-radius: 4px;
            border: none;
            color: #fff;
          }
          .save-button:hover {
            opacity: 0.7;
          }
          .save-button:disabled {
            opacity: 0.7;
            cursor: default;
          }
          .save-button:disabled:hover {
            opacity: 0.7;
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
            .ingredient-select {
              width: 220px;
              margin: 0 20px 0 0;
            }
            .number-of-servings-select {
              width: 220px;
            }
            .weight-input,
            .distance-input {
              width: 104px;
              margin: 0 20px 0 0;
            }
            .distance-input {
              margin: 0 20px 20px 0;
            }
            .transport-mode-select {
              min-width: 170px;
              margin: 0 20px 20px 0;
            }
            .transport-type-select {
              min-width: 170px;
              margin: 0 20px 20px 0;
            }
            .transport-unit-select {
              min-width: 100px;
              margin: 0 0 20px 0;
            }
            .add-button-container {
              margin-top: 0;
            }
            .optional-text {
              margin: 10px 0;
            }
            .button-container {
              padding: 0;
            }
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

const mapDispatchToProps = (dispatch) => ({
  addNewMeal: (meal) => dispatch(addMeal(meal)),
  updateMeal: (mealId, meal) => dispatch(editMeal(mealId, meal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MealForm);
