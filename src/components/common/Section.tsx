import React from 'react';
import { useStyletron } from 'baseui';
import { layout } from '../../config/designSystem';

interface SectionProps {
  children: React.ReactNode;
  spacing?: 'sm' | 'base' | 'lg';
}

const Section: React.FC<SectionProps> = ({ children, spacing = 'base' }) => {
  const [css] = useStyletron();
  
  return (
    <div className={css({
      marginBottom: layout.sectionGap[spacing],
    })}>
      {children}
    </div>
  );
};

export default Section;
