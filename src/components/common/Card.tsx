import React from 'react';
import { useStyletron } from 'baseui';
import { colors, borderRadius, shadows, layout } from '../../config/designSystem';

interface CardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'base' | 'lg' | 'none';
  shadow?: 'none' | 'sm' | 'base' | 'md' | 'lg';
  onClick?: () => void;
  noBorder?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  padding = 'base',
  shadow = 'base',
  onClick,
  noBorder = false,
}) => {
  const [css] = useStyletron();
  
  const paddingValue = padding === 'none' ? '0' : layout.cardPadding[padding];
  
  return (
    <div 
      className={css({
        backgroundColor: colors.background.surface,
        borderRadius: borderRadius.md,
        boxShadow: shadows[shadow],
        border: noBorder ? 'none' : `0.5px solid ${colors.gray[200]}`,
        padding: paddingValue,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        ':hover': onClick ? {
          boxShadow: shadows.md,
          transform: 'translateY(-1px)',
        } : {},
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
