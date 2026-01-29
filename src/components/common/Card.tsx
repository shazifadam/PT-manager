import React from 'react';
import { useStyletron } from 'baseui';
import { colors, borderRadius, shadows, layout } from '../../config/designSystem';

interface CardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'base' | 'lg' | 'none';
  shadow?: 'none' | 'sm' | 'base' | 'md' | 'lg';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  padding = 'base',
  shadow = 'md',
  onClick,
}) => {
  const [css] = useStyletron();
  
  const paddingValue = padding === 'none' ? '0' : layout.cardPadding[padding];
  
  return (
    <div 
      className={css({
        backgroundColor: colors.background.surface,
        borderRadius: borderRadius.md,
        boxShadow: shadows[shadow],
        padding: paddingValue,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s ease',
        ':hover': onClick ? {
          boxShadow: shadows.lg,
        } : {},
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
