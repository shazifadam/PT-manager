import React from 'react';
import { Block } from 'baseui/block';
import { useStyletron } from 'baseui';
import { fontFamily, typeScale, fontWeight } from '../tokens';

interface FTCardProps {
  children: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
}

export const FTCard: React.FC<FTCardProps> = ({
  children,
  title,
  action,
}) => {
  const [css, theme] = useStyletron();

  return (
    <Block
      backgroundColor="#ffffff"
      padding="scale600"
      $style={{
        borderRadius: '12px',
        border: '1px solid #e0e0e0',
      }}
    >
      {title && (
        <Block
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="scale600"
        >
          <Block
            className={css({
              fontFamily: fontFamily.heading,
              fontSize: typeScale['1'], // 19.2px
              fontWeight: fontWeight.normal,
              color: theme.colors.contentPrimary,
            })}
          >
            {title}
          </Block>
          {action}
        </Block>
      )}
      {children}
    </Block>
  );
};
