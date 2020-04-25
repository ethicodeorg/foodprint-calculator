import React, { useState } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import Autocomplete from 'react-autocomplete';
import Select from 'react-select';
import {
  getLandUseTotal,
  getGHGTotal,
  getWaterTotal,
  getEutroTotal,
  getTransportEmissions,
  convertToKilograms,
} from '../utils/calculations';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';
import Pies from '../components/Pies';
import TinyPies from '../components/TinyPies';
import Ingredients from '../components/Ingredients';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function getTotalByCategory(ingredients) {
  return {
    landUse: getLandUseTotal(ingredients),
    ghgEmissions: getGHGTotal(ingredients),
    waterWithdrawals: getWaterTotal(ingredients),
    eutrophyingEmissions: getEutroTotal(ingredients),
  };
}

function saveMeal(mealName, ingredients) {
  const id = mealName.toLowerCase().replace(/\s/g, '-');
  const meal = {
    id,
    title: mealName,
    landUse: getLandUseTotal(ingredients),
    ghgEmissions: getGHGTotal(ingredients),
    waterWithdrawals: getWaterTotal(ingredients),
    eutrophyingEmissions: getEutroTotal(ingredients),
    ingredients,
  };
  const { data, error } = fetch('/api/meals', {
    method: 'POST',
    body: JSON.stringify(meal),
  });
  Router.push(`/meals/${id}`);
}

function matchFoodToTerm(food, value) {
  return food.entity.toLowerCase().indexOf(value.toLowerCase()) !== -1;
}

export default function NewMeal() {
  const [mealName, setMealName] = useState('');
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [weight, setWeight] = useState('');
  const [distance, setDistance] = useState('');
  const [transportMode, setTransportMode] = useState('');
  const [transportType, setTransportType] = useState('');
  const [ingredients, setIngredients] = useState([]);
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
  const { data, error } = useSWR('/api/initialize', fetcher);
  const { data: transportData, error: transportError } = useSWR('/api/transport', fetcher);

  const options = data || [];

  const deleteIngredient = (index) => {
    const temp = [...ingredients];
    temp.splice(index, 1);
    setIngredients(temp);
  };

  const addIngredient = () => {
    const food = options.find((option) => option.entity === autocompleteValue);
    const transportEmissions = getTransportEmissions(
      transportData,
      distance,
      distanceUnit,
      transportMode,
      transportType
    );
    const ingredient = {
      entity: autocompleteValue,
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
    setIsAdding(false);
    setIsAddingTransport(false);
    setWeightUnit(weightUnitOptions[0].value);
  };

  return (
    <Layout>
      <Header activePage="meals" />
      <Content>
        <div className="meal-name">
          <input
            type="text"
            name="meal-name"
            className="meal-input"
            placeholder="Meal name"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
        </div>
        <Ingredients ingredients={ingredients} deleteIngredient={deleteIngredient} />
        {isAdding ? (
          <div className="add-ingredient">
            <div className="required-fields">
              <Autocomplete
                getItemValue={(item) => item.entity}
                items={options}
                shouldItemRender={matchFoodToTerm}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item.entity}
                    style={{ background: isHighlighted ? 'lightgray' : 'white' }}
                  >
                    {item.entity}
                  </div>
                )}
                value={autocompleteValue}
                onChange={(e) => setAutocompleteValue(e.target.value)}
                onSelect={(val) => setAutocompleteValue(val)}
                wrapperProps={{
                  style: {
                    marginRight: 20,
                  },
                }}
                inputProps={{
                  style: {
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    height: 36,
                    marginTop: 20,
                    fontSize: 14,
                    padding: '0 15px',
                    width: 200,
                  },
                  placeholder: 'Ingredient',
                }}
              />
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
            <button
              disabled={!autocompleteValue || !weight}
              className="add-button"
              onClick={() => addIngredient()}
            >
              Add
            </button>
            <div className="optional-fields">
              {isAddingTransport ? (
                <div className="add-transport">
                  <input
                    className="distance-input"
                    placeholder="Distance"
                    type="number"
                    name="distance"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                  <div className="transport-unit-select">
                    <Select
                      value={distanceUnit.value}
                      placeholder="Unit"
                      onChange={(val) => setDistanceUnit(val.value)}
                      options={distanceUnitOptions}
                    />
                  </div>
                  <div className="transport-select">
                    <Select
                      value={transportMode.value}
                      placeholder="Transport mode"
                      onChange={(val) => setTransportMode(val.value)}
                      options={transportModeOptions}
                    />
                  </div>
                  <div className="transport-select">
                    <Select
                      value={transportType.value}
                      placeholder="Transport type"
                      onChange={(val) => setTransportType(val.value)}
                      options={transportTypeOptions}
                    />
                  </div>
                </div>
              ) : (
                <button className="add-transport-button" onClick={() => setIsAddingTransport(true)}>
                  + Add Transport
                </button>
              )}
              <span>(Optional)</span>
            </div>
          </div>
        ) : (
          <button className="add-ingredient-button" onClick={() => setIsAdding(true)}>
            + Add Ingredient
          </button>
        )}
        <div className="meal-total">
          <h3>Meal total</h3>
          <Pies meal={getTotalByCategory(ingredients)} />
        </div>
        <div className="button-container">
          <button
            className="save-button"
            onClick={() => saveMeal(mealName, ingredients)}
            disabled={ingredients.length === 0 || mealName === ''}
          >
            Save Meal
          </button>
        </div>

        <style jsx>{`
          .meal-input {
            display: block;
            width: 100%;
            max-width: 400px;
            padding: 10px 15px;
            border-radius: 4px;
            border: 1px solid #ccc;
            font-size: 24px;
          }
          .add-ingredient {
            display: flex;
            flex-wrap: wrap;
          }
          .required-fields,
          .add-transport {
            display: flex;
            width: 80%;
          }
          .optional-fields {
            display: flex;
            align-items: center;
          }
          .weight-input {
            width: 70px;
            margin: 20px 20px 20px 0;
            padding: 0 15px;
            border-radius: 4px;
            border: 1px solid #ccc;
            font-size: 14px;
          }
          .distance-input {
            width: 100px;
            margin: 0 20px;
            padding: 0 15px;
            border-radius: 4px;
            border: 1px solid #ccc;
            font-size: 14px;
          }
          .select-container {
            margin: 20px 20px 0 0;
            width: 150px;
          }
          .transport-select {
            margin: 0 20px 0 0;
            width: 220px;
          }
          .transport-unit-select {
            margin: 0 20px 0 0;
            width: 150px;
          }
          .add-ingredient-button,
          .add-button {
            font-size: 16px;
            font-weight: bold;
            width: 180px;
            margin: 20px 0 20px;
            padding: 10px;
            background-color: #4caf50;
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
            margin: 0 20px;
            padding: 10px;
            background-color: #4caf50;
            opacity: 1;
            transition: opacity 0.2s;
            cursor: pointer;
            border-radius: 4px;
            border: none;
            color: #fff;
          }
          .add-ingredient-button:disabled,
          .add-button:disabled {
            opacity: 0.7;
            cursor: default;
          }
          .add-ingredient-button:hover,
          .add-button:hover {
            opacity: 0.7;
          }
          .add-button {
            width: 100px;
          }
          .button-container {
            display: flex;
            justify-content: flex-end;
          }
          .save-button {
            font-size: 20px;
            font-weight: bold;
            width: 220px;
            margin-top: 30px;
            padding: 15px;
            background-color: #2196f3;
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
        `}</style>
      </Content>
    </Layout>
  );
}
