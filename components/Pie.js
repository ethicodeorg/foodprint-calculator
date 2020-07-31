import PieChart from 'react-minimal-pie-chart';
import classNames from 'classnames';
import { Tooltip } from '@material-ui/core';

const Pie = ({ category, isSingle, label }) => {
  const { name, total, unit, color, rda } = category;
  let data = [{ value: total, color: color }];

  // Add grey filler to last pie of each category
  if (total !== rda) {
    data.push({ value: rda - total, color: '#eee' });
  }

  return (
    <Tooltip title={label} placement="top" arrow>
      <div
        className={classNames('pie', {
          'tiny-pie': isSingle,
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
          }
          .tiny-pie {
            max-width: 20px;
          }
        `}</style>
      </div>
    </Tooltip>
  );
};

export default Pie;
