import React from 'react';
import { Block } from 'baseui/block';
import { LabelSmall, DisplaySmall } from 'baseui/typography';

interface FTMetricProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export const FTMetric: React.FC<FTMetricProps> = ({ 
  label, 
  value, 
  unit,
  trend,
  trendValue,
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'positive';
      case 'down': return 'negative';
      default: return 'contentSecondary';
    }
  };

  return (
    <Block>
      <LabelSmall
        color="contentSecondary"
        marginTop={0}
        marginBottom="scale200"
        $style={{
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </LabelSmall>
      <Block display="flex" alignItems="baseline" gridGap="scale300">
        <DisplaySmall
          marginTop={0}
          marginBottom={0}
          $style={{
            lineHeight: '1',
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </DisplaySmall>
        {unit && (
          <LabelSmall
            color="contentSecondary"
            marginTop={0}
            marginBottom={0}
          >
            {unit}
          </LabelSmall>
        )}
      </Block>
      {trendValue && (
        <LabelSmall
          color={getTrendColor()}
          marginTop="scale200"
          marginBottom={0}
        >
          {trendValue}
        </LabelSmall>
      )}
    </Block>
  );
};
