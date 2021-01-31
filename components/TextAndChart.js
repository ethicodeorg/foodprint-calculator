import React from 'react';
import {
  BarChart,
  Bar,
  Label,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import ExternalLink from './ExternalLink';
import theme from '../styles/theme';

const TextAndChart = ({ data, total, text, title, source, unit, fill, interval, t }) => {
  return (
    <div className="textAndChart">
      <p>
        {text.beforeLink}
        <ExternalLink color={theme.colors.aqua} href={source}>
          {text.linkText}
        </ExternalLink>{' '}
        {text.afterLink}
      </p>
      <h4>{title}</h4>
      <div className="chart">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 20, bottom: 20, left: 20 }}
          >
            <XAxis
              stroke="#eee"
              type="number"
              domain={[0, (dataMax) => dataMax.toFixed(1)]}
              interval={interval}
            >
              <Label fill="#eee">{unit}</Label>
            </XAxis>
            <YAxis type="category" dataKey="name" width={0} stroke="#eee" />
            <Bar dataKey="food" stackId="a" fill={fill} layout="vertical">
              <LabelList
                formatter={(value) => `${t('food')}: ${((value / total) * 100).toFixed(0)}%`}
                fill="#eee"
              />
            </Bar>
            <Bar dataKey="other" stackId="a" fill="#aaa" layout="vertical">
              <LabelList formatter={(_) => t('other')} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <style jsx>{`
        .textAndChart {
        }
        .chart {
        }
        p {
          line-height: 1.4;
        }
        h4 {
          text-align: center;
          margin: 30px 0 10px;
        }
      `}</style>
    </div>
  );
};

export default TextAndChart;
