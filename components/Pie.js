import { PieChart } from 'react-minimal-pie-chart';
import classNames from 'classnames';
import MyTooltip from './MyTooltip';

const Pie = ({ category, isTiny, label }) => {
  const { name, total, unit, color, rda } = category;
  let data = [{ value: total, color: color }];

  // Add grey filler to last pie of each category
  if (total !== rda) {
    data.push({ value: rda - total, color: '#eee' });
  }

  return (
    <MyTooltip title={label} placement="top" arrow enterTouchDelay={0} leaveTouchDelay={3000}>
      <div
        className={classNames('pie', {
          'tiny-pie': isTiny,
        })}
      >
        <PieChart
          data={data}
          totalValue={rda}
          animate={true}
          animationDuration={800}
          animationEasing="ease-out"
        />
        <style jsx>{`
          .pie {
            max-width: 60px;
            font-size: 14px;
            margin: 5px;
            cursor: pointer;
          }
          .tiny-pie {
            max-width: 20px;
          }
        `}</style>
      </div>
    </MyTooltip>
  );
};

export default Pie;
