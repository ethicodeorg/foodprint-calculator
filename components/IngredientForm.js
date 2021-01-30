import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, Router } from '../i18n';
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { setFocus } from '../utils/ui';
import { useUser } from '../lib/hooks';
import useSWR from 'swr';
import Select from 'react-select';
import Card from './Card';
import Button from './Button';
import InfoIcon from './InfoIcon';
import MyTooltip from './MyTooltip';
import theme from '../styles/theme';

const fetcher = (url) => fetch(url).then((r) => r.json());

const IngredientForm = ( {meal, foodData, addIngredient, cancelIngredient, t} ) => { 
    const [user] = useUser();
    const { data, error } = useSWR(user && id ? `/api/meals?id=${id}` : null, fetcher);
    const [selectedIngredient, setSelectedIngredient] = useState();
    
    const [amount, setAmount] = useState('');
  const [distance, setDistance] = useState('');
  const [transportMode, setTransportMode] = useState('');
  const [transportType, setTransportType] = useState('');
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
      const ingredientData = data.meals[0].ingredients;
      
    }
  }, [data]);

  // Automatically focus the next input when an ingredient has been selected
  // react reference for the "amount" field.
  const refAmount = useRef();

  // When ingredient is selected we add quantity and volume options if applicaple
  // for the selected ingredient.
  const changeUnitOptions = (val) => {
    let unitsToAdd = [];
    let unitsToRemove = [];
    if (val.averageWeight) {
      // Don't add it if it's already there
      if (!amountUnitOptions.find((unit) => unit.value === 'qty')) {
        unitsToAdd.push({ value: 'qty', label: t('qty') });
      }
    } else {
      unitsToRemove.push('qty');
    }

    if (val.gramsPerLiter) {
      // Don't add it if it's already there
      if (!amountUnitOptions.find((unit) => unit.value === 'tsp')) {
        unitsToAdd = [
          ...unitsToAdd,
          { value: 'tsp', label: t('tsp') },
          { value: 'tbsp', label: t('tbsp') },
          { value: 'cups', label: t('cups') },
          { value: 'ltr', label: t('ltr') },
        ];
      }
    } else {
      unitsToRemove.push('tsp', 'tbsp', 'cups', 'ltr');
    }

    // Remove options with .filter and add options with .concat
    setAmountUnitOptions(
      amountUnitOptions.filter((unit) => !unitsToRemove.includes(unit.value)).concat(unitsToAdd)
    );
  };

return (
<Fragment>
<Card inner>
    <div className="close-container">
    <MyTooltip
        title={t('cancel')}
        placement="top"
        arrow
        enterTouchDelay={0}
        leaveTouchDelay={3000}
    >
        <button
        className="close-button"
        onClick={() => {
          cancelIngredient()
        }}
        >
        <FaTimes />
        </button>
    </MyTooltip>
    </div>
    <div className="required-fields">
    <div className="select-container ingredient-select">
        <Select
        value={selectedIngredient}
        placeholder={t('ingredient')}
        onChange={(val) => {
            setSelectedIngredient(val);
            changeUnitOptions(val);
            setFocus(refAmount);
        }}
        options={foodOptions}
        instanceId="ingredient"
        autoFocus
        />
    </div>
    <input
        className="amount-input"
        placeholder={t('amount')}
        type="number"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        ref={refAmount}
    />
    <div className="select-container ingredient-unit">
        <Select
        value={amountUnit.value}
        placeholder={t('unit')}
        onChange={(val) => setAmountUnit(val.value)}
        options={amountUnitOptions}
        instanceId="amount-unit"
        />
    </div>
    </div>
    {isAddingTransport ? (
    <div className="optional-fields">
        <div className="select-container transport-mode-select">
        <Select
            value={transportMode.value}
            placeholder={t('transport_mode')}
            onChange={(val) => setTransportMode(val.value)}
            options={transportModeOptions}
            instanceId="transport-mode"
        />
        </div>
        <div className="select-container transport-type-select">
        <Select
            value={transportType.value}
            placeholder={t('transport_type')}
            onChange={(val) => setTransportType(val.value)}
            options={transportTypeOptions}
            instanceId="transport-type"
        />
        </div>
        <input
        className="distance-input"
        placeholder={t('distance')}
        type="number"
        name="distance"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        />
        <div className="select-container transport-unit-select">
        <Select
            value={distanceUnit.value}
            placeholder={t('unit')}
            onChange={(val) => setDistanceUnit(val.value)}
            options={distanceUnitOptions}
            instanceId="distance-unit"
        />
        </div>
    </div>
    ) : (
    <div className="optional-fields">
        <div className="add-transport-button-container">
        <Button clear onClick={() => setIsAddingTransport(true)}>
            {t('add_transport_optional')}
        </Button>
        </div>
        <InfoIcon title={t('transport_not_provided')} color={theme.colors.water} />
    </div>
    )}
    <div className="add-button-container">
    <Link href="/about?openSection=how-to-use">
        <a target="_blank" className="instructions">
        {t('how_to_use')}
        <span className="new-tab-icon">
            <FaExternalLinkAlt />
        </span>
        </a>
    </Link>
    <Button onClick={() => addIngredient(selectedIngredient, amount, amountUnit, distance, distanceUnit, transportMode, transportType)} disabled={!selectedIngredient || !amount}>
        {t('add')}
    </Button>
    </div>
</Card>

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
  .amount-input,
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
    min-width: 160px;
  }
  .add-button-container {
    display: flex;
    justify-content: space-between;
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
  .close-container {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    height: 30px;
  }
  .close-button {
    display: flex;
    align-items: center;
    padding: 0;
    font-size: 22px;
    color: ${theme.colors.text};
    background-color: #fff;
    opacity: 1;
    transition: opacity 0.2s;
    cursor: pointer;
    border: none;
    outline: none;
  }
  .close-button:hover {
    opacity: 0.7;
  }
  .ingredient-unit {
    width: 200px;
  }
  .instructions {
    margin-top: 20px;
    color: ${theme.colors.water};
    text-decoration: none;
    font-size: 16px;
    text-align: center;
  }
  .new-tab-icon {
    display: inline;
    margin-left: 5px;
    font-size: 12px;
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
      width: 300px;
    }
    .amount-input,
    .distance-input {
      width: 104px;
      margin: 0 20px 0 0;
    }
    .distance-input {
      margin: 0 20px 20px 0;
    }
    .transport-mode-select {
      min-width: 182px;
      margin: 0 20px 20px 0;
    }
    .transport-type-select {
      min-width: 170px;
      margin: 0 20px 20px 0;
    }
    .transport-unit-select {
      width: 158px;
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
    .ingredient-unit {
      width: 200px;
    }
  }

  @media only screen and (min-width: ${theme.sizes.ipad}) {
    .close-container {
      height: 0;
    }
  }
`}</style>
</Fragment>
)}

const mapStateToProps = (state) => ({
    foodData: state.foodData,
    transportData: state.transportEmissions,
  });

export default connect(mapStateToProps)(IngredientForm);