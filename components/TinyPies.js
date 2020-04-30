import Pie from '../components/Pie';
import { getIngredientPieData } from '../utils/pieUtils';

export default function TinyPies({ ingredient, isSingle, numberOfServings }) {
  const pieData = getIngredientPieData(ingredient, numberOfServings);

  return pieData.map((category, cIndex) => {
    const { total, rda, name, unit, color } = category;
    const numberOfExtraPies = Math.floor(total / rda);
    const extraPies = [];
    for (let i = 0; i < numberOfExtraPies; i++) {
      extraPies.push({
        name: name,
        total: rda,
        rda: rda,
        unit: unit,
        color: color,
        isExtra: true,
      });
    }
    const lastPie = {
      name: name,
      total: total % rda,
      rda: rda,
      unit: unit,
      color: color,
    };

    return extraPies
      .concat(lastPie)
      .map((pie, pIndex) => <Pie key={pIndex} category={pie} isSingle={isSingle} />);
  });
}
