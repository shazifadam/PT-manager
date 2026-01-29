import React from 'react';
import { Button, KIND, SIZE, SHAPE } from 'baseui/button';

interface FTButtonProps {
  children: React.ReactNode;
  kind?: 'primary' | 'secondary' | 'tertiary' | 'minimal';
  size?: 'mini' | 'compact' | 'default' | 'large';
  shape?: 'default' | 'pill' | 'round' | 'square';
  isLoading?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  startEnhancer?: React.ReactNode;
  endEnhancer?: React.ReactNode;
  overrides?: any;
}

export const FTButton: React.FC<FTButtonProps> = ({
  children,
  kind = 'primary',
  size = 'default',
  shape = 'default',
  isLoading = false,
  isSelected = false,
  disabled = false,
  onClick,
  type = 'button',
  startEnhancer,
  endEnhancer,
  overrides = {},
}) => {
  const getKind = () => {
    switch (kind) {
      case 'primary': return KIND.primary;
      case 'secondary': return KIND.secondary;
      case 'tertiary': return KIND.tertiary;
      case 'minimal': return KIND.tertiary;
      default: return KIND.primary;
    }
  };

  const getSize = () => {
    switch (size) {
      case 'mini': return SIZE.mini;
      case 'compact': return SIZE.compact;
      case 'large': return SIZE.large;
      default: return SIZE.default;
    }
  };

  const getShape = () => {
    switch (shape) {
      case 'pill': return SHAPE.pill;
      case 'round': return SHAPE.round;
      case 'square': return SHAPE.square;
      default: return SHAPE.default;
    }
  };

  return (
    <Button
      kind={getKind()}
      size={getSize()}
      shape={getShape()}
      isLoading={isLoading}
      isSelected={isSelected}
      disabled={disabled}
      onClick={onClick}
      type={type}
      startEnhancer={startEnhancer}
      endEnhancer={endEnhancer}
      overrides={overrides}
    >
      {children}
    </Button>
  );
};
