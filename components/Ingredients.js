import Tooltip from '@material-ui/core/Tooltip';
import TinyPies from './TinyPies';
import CardTitle from './CardTitle';
import theme from '../styles/theme';
import { FaTrash } from 'react-icons/fa';

const Ingredients = ({ ingredients, deleteIngredient, numberOfServings, t }) => (
  <div className="ingredients">
    <CardTitle>{t('ingredients')}</CardTitle>
    {ingredients.map((ingredient, index) => {
      const transportString = ingredient.distance
        ? t('transported_text')
            .replace('|distance|', ingredient.distance)
            .replace('|distanceUnit|', ingredient.distanceUnit)
            .replace('|transportMode|', t(ingredient.transportMode))
        : '';
      const amountString = `${ingredient.amount} ${
        ingredient.amountUnit === 'qty' ? '' : t(`${ingredient.amountUnit}_short`)
      }`;

      return (
        <div className="ingredient" key={index}>
          <div className="ingredient-basic">
            {`${amountString} ${t(ingredient.label)}`}
            <div className="transport">{transportString}</div>
          </div>
          <div className="pies-container">
            <TinyPies ingredient={ingredient} numberOfServings={numberOfServings} t={t} />
          </div>
          {deleteIngredient && (
            <Tooltip title="Remove ingredient" placement="left" arrow>
              <button className="delete-button" onClick={deleteIngredient.bind(this, index)}>
                <FaTrash />
              </button>
            </Tooltip>
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
