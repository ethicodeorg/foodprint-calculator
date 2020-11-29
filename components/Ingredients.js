import { FaTrash } from 'react-icons/fa';
import TinyPies from './TinyPies';
import CardTitle from './CardTitle';
import MyTooltip from './MyTooltip';
import theme from '../styles/theme';

const Ingredients = ({ ingredients, deleteIngredient, numberOfServings, t }) => (
  <div className="ingredients">
    <CardTitle>{t('ingredients')}</CardTitle>
    {!ingredients.length && (
      <div className="ingredient-basic ingredient-basic-none">{t('no_ingredient')}</div>
    )}
    {ingredients.map((ingredient, index) => {
      const transportString = ingredient.distance
        ? t('transported_text', {
            distance: ingredient.distance,
            distanceUnit: ingredient.distanceUnit,
            transportMode: t(ingredient.transportMode),
          })
        : '';
      const amountString = `${ingredient.amount} ${
        ingredient.amountUnit === 'qty' ? '' : t(`${ingredient.amountUnit}_short`)
      }`;

      return (
        <div className="ingredient" key={index}>
          <div className="ingredient-basic">
            {`${amountString} ${t(ingredient.rawLabel)}`}
            <div className="transport">{transportString}</div>
          </div>
          <div className="pies-container">
            <TinyPies ingredient={ingredient} numberOfServings={numberOfServings} t={t} />
          </div>
          {deleteIngredient && (
            <MyTooltip title={t('remove_ingredient')} placement="left" arrow>
              <button className="delete-button" onClick={deleteIngredient.bind(this, index)}>
                <FaTrash />
              </button>
            </MyTooltip>
          )}
        </div>
      );
    })}

    <style jsx>{`
      .ingredient {
        display: flex;
        align-items: center;
      }
      .ingredient-basic {
        min-width: 50%;
        font-size: 14px;
      }
      .ingredient-basic-none {
        padding-top: 7px;
      }
      .pies-container {
        display: flex;
        flex-wrap: wrap;
      }
      .transport {
        font-size: 12px;
      }
      .delete-button {
        padding: 0;
        margin-left: auto;
        font-size: 14px;
        color: ${theme.colors.eutro};
        background-color: #fff;
        opacity: 1;
        transition: opacity 0.2s;
        cursor: pointer;
        border-radius: 4px;
        border: none;
      }
      .delete-button:hover {
        opacity: 0.7;
      }

      @media only screen and (min-width: ${theme.sizes.mobile}) {
        .ingredient-basic {
          font-size: 14px;
        }
      }
    `}</style>
  </div>
);

export default Ingredients;
