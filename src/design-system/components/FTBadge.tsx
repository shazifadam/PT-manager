import React from 'react';
import { Tag, KIND } from 'baseui/tag';

interface FTBadgeProps {
  children: React.ReactNode;
  variant?: 'active' | 'expiring' | 'expired' | 'default';
  closeable?: boolean;
  onActionClick?: () => void;
}

export const FTBadge: React.FC<FTBadgeProps> = ({
  children,
  variant = 'default',
  closeable = false,
  onActionClick,
}) => {
  const getKind = () => {
    switch (variant) {
      case 'active': return KIND.positive;
      case 'expiring': return KIND.warning;
      case 'expired': return KIND.negative;
      default: return KIND.neutral;
    }
  };

  return (
    <Tag
      kind={getKind()}
      closeable={closeable}
      onActionClick={onActionClick}
    >
      {children}
    </Tag>
  );
};
