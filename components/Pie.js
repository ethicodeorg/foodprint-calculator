import PieChart from 'react-minimal-pie-chart';
import classNames from 'classnames';

const Pie = ({ category, isSingle, label }) => {
  const { name, total, unit, color, rda } = category;

  return (
    <div
      className={classNames('pie', {
        'tiny-pie': isSingle,
      })}
    >
      <PieChart
        data={[{ title: label, value: total, color: color }]}
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
  );
};

export default Pie;
