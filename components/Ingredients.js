import TinyPies from './TinyPies';
import CardTitle from './CardTitle';

const Ingredients = ({ ingredients, deleteIngredient, numberOfServings }) => (
  <div className="ingredients">
    <CardTitle>Ingredients</CardTitle>
    {ingredients.map((ingredient, index) => {
      const transportString = ingredient.distance
        ? `Transported ${ingredient.distance} ${ingredient.distanceUnit} by ${ingredient.transportMode}`
        : '';
      return (
        <div className="ingredient" key={index}>
          <div className="ingredient-basic">
            {`${ingredient.entity} ${ingredient.weight} ${ingredient.weightUnit}`}
            <div className="transport">{transportString}</div>
          </div>
          <TinyPies ingredient={ingredient} isSingle numberOfServings={numberOfServings} />
          {deleteIngredient && (
            <button className="delete-button" onClick={deleteIngredient.bind(this, index)}>
              Remove
            </button>
          )}
        </div>
      );
    })}

    <style jsx>{`
      .ingredient {
        display: flex;
        align-items: center;
        margin-top: 10px;
      }
      .ingredient-basic {
        min-width: 300px;
      }
      .transport {
        font-size: 12px;
      }
      .delete-button {
        min-width: 100px;
        padding: 5px 20px;
        margin-left: auto;
        font-size: 14px;
        font-weight: bold;
        background-color: #e91e63;
        color: #fff;
        opacity: 1;
        transition: opacity 0.2s;
        cursor: pointer;
        border-radius: 4px;
        border: none;
      }
      .delete-button:hover {
        opacity: 0.7;
      }
    `}</style>
  </div>
);

export default Ingredients;
