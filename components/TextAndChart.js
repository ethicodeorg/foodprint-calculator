import React from 'react';
import { BarChart, Bar, Label, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import ExternalLink from './ExternalLink';
import theme from '../styles/theme';

const TextAndChart = ({ data, text, source, xLabel, fill, interval }) => {
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
          height={230}
          layout="vertical"
          margin={{ top: 30, right: 20, bottom: 40, left: 50 }}
        >
          <XAxis type="number" domain={[0, (dataMax) => dataMax.toFixed(1)]} interval={interval}>
            <Label style={{ fill: '#888' }}>{xLabel}</Label>
          </XAxis>
          <YAxis type="category" dataKey="name" />
          <Tooltip formatter={(value) => `${value} ${xLabel}`} />
          <Legend />
          <Bar dataKey="food" stackId="a" fill={fill} layout="vertical" />
          <Bar dataKey="other" stackId="a" fill="#aaa" layout="vertical" />
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
