import React from 'react';
import { BarChart, Bar, Label, XAxis, YAxis, Tooltip, LabelList, CartesianGrid } from 'recharts';
import ExternalLink from './ExternalLink';
import theme from '../styles/theme';

const TextAndChart = ({ data, total, text, source, unit, fill, interval }) => {
  return (
    <div className="textAndChart">
      <ul>
        <li>
          {text.beforeLink}
          <ExternalLink color={theme.colors.aqua} href={source}>
            {text.linkText}
          </ExternalLink>{' '}
          {text.afterLink}
        </li>
      </ul>
      <div className="chart">
        <BarChart
          data={data}
          width={650}
          height={200}
          layout="vertical"
          margin={{ top: 30, right: 20, bottom: 40, left: 50 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis
            stroke="#eee"
            type="number"
            domain={[0, (dataMax) => dataMax.toFixed(1)]}
            interval={interval}
          >
            <Label fill="#eee">{unit}</Label>
          </XAxis>
          <YAxis type="category" dataKey="name" stroke="#eee" />
          <Tooltip
            label="asdf"
            formatter={(value) => `${value} ${unit}`}
            contentStyle={{ background: '#222' }}
          />
          <Bar dataKey="food" stackId="a" fill={fill} layout="vertical">
            <LabelList
              formatter={(value) => `food: ${((value / total) * 100).toFixed(0)}%`}
              fill="#eee"
            />
          </Bar>
          <Bar dataKey="other" stackId="a" fill="#aaa" layout="vertical">
            <LabelList formatter={(_) => 'other'} />
          </Bar>
        </BarChart>
      </div>
      <style jsx>{`
        .textAndChart {
        }
        .chart {
        }
      `}</style>
    </div>
  );
};

export default TextAndChart;
