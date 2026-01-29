import React from 'react';
import { useStyletron } from 'baseui';
import { layout } from '../../config/designSystem';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  noPadding?: boolean;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  maxWidth = 'xl',
  noPadding = false 
}) => {
  const [css] = useStyletron();
  
  return (
    <div className={css({
      maxWidth: layout.maxWidth[maxWidth],
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: noPadding ? '0' : layout.pagePadding.mobile,
      paddingRight: noPadding ? '0' : layout.pagePadding.mobile,
      '@media (min-width: 768px)': {
        paddingLeft: noPadding ? '0' : layout.pagePadding.tablet,
        paddingRight: noPadding ? '0' : layout.pagePadding.tablet,
      },
      '@media (min-width: 1024px)': {
        paddingLeft: noPadding ? '0' : layout.pagePadding.desktop,
        paddingRight: noPadding ? '0' : layout.pagePadding.desktop,
      },
    })}>
      {children}
    </div>
  );
};

export default Container;
