import Pie from '../components/Pie';
import { getMealPieData } from '../utils/pieUtils';

export default function Pies({ meal, isSingle }) {
  const pieData = getMealPieData(meal);

  return (
    <div className="pie-container">
      {pieData.map((category, cIndex) => {
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

        return (
          <div className="category-container" key={cIndex}>
            <div className="legend-container">
              <div className="legend-name">{name}</div>
              <div className="value">{`${total.toFixed(2)} ${unit}`}</div>
              <div className="percentage">
                <span className={`percentage-${cIndex}`}>
                  {((total / rda) * 100).toFixed(2)}% RDA
                </span>
              </div>
            </div>
            {extraPies.concat(lastPie).map((pie, pIndex) => (
              <Pie key={pIndex} category={pie} isSingle={isSingle} />
            ))}
          </div>
        );
      })}
      <style jsx>{`
        .pie-container {
          margin: 20px 0;
        }
        .category-container {
          display: flex;
          align-items: center;
          margin: 10px 0;
        }
        .legend-container {
          min-width: 240px;
          font-size: 14px;
        }
        .legend-name {
          font-size: 18px;
        }
        .percentage {
        }
        .percentage-0 {
          color: #4caf50;
        }
        .percentage-1 {
          color: #e91e63;
        }
        .percentage-2 {
          color: #2196f3;
        }
        .percentage-3 {
          color: #222;
        }
      `}</style>
    </div>
  );
}
