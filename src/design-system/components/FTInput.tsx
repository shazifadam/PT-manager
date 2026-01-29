import React from 'react';
import { Input, SIZE } from 'baseui/input';

interface FTInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: boolean;
  positive?: boolean;
  size?: 'mini' | 'compact' | 'default' | 'large';
  startEnhancer?: React.ReactNode;
  endEnhancer?: React.ReactNode;
  overrides?: any;
}

export const FTInput: React.FC<FTInputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
  error = false,
  positive = false,
  size = 'default',
  startEnhancer,
  endEnhancer,
  overrides = {},
}) => {
  const getSize = () => {
    switch (size) {
      case 'mini': return SIZE.mini;
      case 'compact': return SIZE.compact;
      case 'large': return SIZE.large;
      default: return SIZE.default;
    }
  };

  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      error={error}
      positive={positive}
      size={getSize()}
      startEnhancer={startEnhancer}
      endEnhancer={endEnhancer}
      overrides={overrides}
    />
  );
};
