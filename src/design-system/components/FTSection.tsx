import React from 'react';
import { Block } from 'baseui/block';
import { useStyletron } from 'baseui';
import { fontFamily, typeScale, fontWeight, lineHeight } from '../tokens';

interface FTSectionProps {
  children: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
  marginBottom?: string;
}

export const FTSection: React.FC<FTSectionProps> = ({ 
  children, 
  title, 
  action,
  marginBottom = 'scale1000'
}) => {
  const [css, theme] = useStyletron();

  return (
    <Block as="section" marginBottom={marginBottom}>
      {title && (
        <Block
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="scale600"
        >
          <h2 className={css({
            fontFamily: fontFamily.heading,
            fontSize: typeScale['2'], // 23.04px
            fontWeight: fontWeight.normal,
            lineHeight: lineHeight.snug,
            margin: 0,
            color: theme.colors.contentPrimary,
            letterSpacing: '-0.01em',
          })}>
            {title}
          </h2>
          {action}
        </Block>
      )}
      {children}
    </Block>
  );
};
