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

const IngredientForm = ({ meal, foodData, cancelIngredient, ingredient, index, saveIngredient, t }) => {
  const [user] = useUser();
  const { data, error } = useSWR(user && id ? `/api/meals?id=${id}` : null, fetcher);
  const [amount, setAmount] = useState(ingredient ? ingredient.amount : '');
  const [distance, setDistance] = useState(ingredient ? ingredient.distance : '');
  const [isAddingTransport, setIsAddingTransport] = useState(
    ingredient ? ingredient.transportMode || ingredient.transportType : false
  );
  const [amountUnitOptions, setAmountUnitOptions] = useState(
    []
  );
  const distanceUnitOptions = [
    { value: 'km', label: t('km') },
    { value: 'mi', label: t('mi') },
  ];
  const [distanceUnit, setDistanceUnit] = useState(
    ingredient
      ? distanceUnitOptions.find((o) => o.value === ingredient.distanceUnit)
      : distanceUnitOptions[0].value
  );
  const transportModeOptions = [
    { value: 'road', label: t('road') },
    { value: 'rail', label: t('rail') },
    { value: 'water', label: t('water') },
    { value: 'air', label: t('air') },
  ];
  const [transportMode, setTransportMode] = useState(
    ingredient ? transportModeOptions.find((o) => o.value === ingredient.transportMode) : ''
  );
  const transportTypeOptions = [
    { value: 'ambient', label: t('ambient') },
    { value: 'temperatureControlled', label: t('temperatureControlled') },
  ];
  const [transportType, setTransportType] = useState(
    ingredient ? transportTypeOptions.find((o) => o.value === ingredient.transportType) : ''
  );

  let foodOptions = [];
  for (let i = 0; i < foodData.length; i++) {
    for (let j = 0; j < foodData[i].entities.length; j++) {
      const label = t(foodData[i].entities[j].label);

      // No need to add the same entry twice
      if (!foodOptions.find((option) => option.label === label)) {
        foodOptions.push({
          key: foodData[i].key,
          value: `${foodData[i].key}${j}`,
          baseUnit: foodData[i].baseUnit,
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

  const [selectedIngredient, setSelectedIngredient] = useState(
    ingredient
      ? foodOptions.find((o) => o.key === ingredient.key && o.rawLabel === ingredient.rawLabel)
      : ''
  );

  // Automatically focus the next input when an ingredient has been selected
  // react reference for the "amount" field.
  const refAmount = useRef();
  
  const changeUnitOptions = (val) => {
    const quantityUnits = [{ value: 'qty', label: t('qty') }];
    const weightUnits = [
      { value: 'g', label: t('g') },
      { value: 'kg', label: t('kg') },
      { value: 'oz', label: t('oz') },
      { value: 'lbs', label: t('lbs') },
    ];
    const volumeUnits = [
      { value: 'tsp', label: t('tsp') },
      { value: 'tbsp', label: t('tbsp') },
      { value: 'cups', label: t('cups') },
      { value: 'ltr', label: t('ltr') },
    ];
    let newUnits;
    if (val.baseUnit === 'l') {
      newUnits = volumeUnits;
    } else {
      if ((val.averageWeight && val.gramsPerLiter) || val.key === 'uns') {
        newUnits = quantityUnits.concat(weightUnits).concat(volumeUnits);
      } else if (val.averageWeight) {
        newUnits = quantityUnits.concat(weightUnits);
      } else if (val.gramsPerLiter) {
        newUnits = weightUnits.concat(volumeUnits);
      } else {
        newUnits = weightUnits;
      }
    }
    setAmountUnitOptions(newUnits);
    // If the currently selected unit is unavailable for the ingredient, we clear it.
    if (!newUnits.some((unit) => unit.value === amountUnit?.value)) {
      console.log("setting blank")
      //setAmountUnit('');
    }
  };
  const [amountUnit, setAmountUnit] = useState([]);

  useEffect(() => {
    if (ingredient) {
      changeUnitOptions(selectedIngredient);
    }
  }, [ingredient]);

  useEffect(() => {
    if (ingredient && amountUnitOptions.length) {
      console.log("amountUnitOptions.find((o) => o.value === ingredient.amountUnit");
      console.log(amountUnitOptions.find((o) => o.value === ingredient.amountUnit))
      setAmountUnit(amountUnitOptions.find((o) => o.value === ingredient.amountUnit));
    }
  }, [amountUnitOptions]);
  
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
                cancelIngredient();
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
              value={amountUnit}
              placeholder={t('unit')}
              onChange={(val) => setAmountUnit(val)}
              options={amountUnitOptions}
              instanceId="amount-unit"
            />
          </div>
        </div>
        {isAddingTransport ? (
          <div className="optional-fields">
            <div className="select-container transport-mode-select">
              <Select
                defaultValue={transportMode}
                placeholder={t('transport_mode')}
                onChange={(val) => setTransportMode(val.value)}
                options={transportModeOptions}
                instanceId="transport-mode"
              />
            </div>
            <div className="select-container transport-type-select">
              <Select
                defaultValue={transportType}
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
                defaultValue={distanceUnit}
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
          <Button
            onClick={() =>
            {
              saveIngredient(
                index,
                selectedIngredient,
                amount,
                amountUnit,
                distance,
                distanceUnit,
                transportMode,
                transportType
              );
            cancelIngredient()}
                
            }
            disabled={!selectedIngredient || !amount}
            >
          {!ingredient ? t('add') : t('edit_ingredient')}
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
        .amount-input,
        .distance-input {
          width: 100%;
          margin: 0 0 20px 0;
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
        .add-transport-button-container {
          min-width: 160px;
        }
        .add-button-container {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 20px;
        }
        .optional-text {
          margin: 10px 0 0;
          font-size: 14px;
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
  );
};

const mapStateToProps = (state) => ({
  foodData: state.foodData,
  transportData: state.transportEmissions,
});

export default connect(mapStateToProps)(IngredientForm);
