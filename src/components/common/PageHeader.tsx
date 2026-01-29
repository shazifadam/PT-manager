import React from 'react';
import { useStyletron } from 'baseui';
import { colors, fontSize, fontWeight, spacing, layout } from '../../config/designSystem';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, rightElement }) => {
  const [css] = useStyletron();
  
  return (
    <div className={css({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: layout.sectionGap.base,
    })}>
      <div>
        <h1 className={css({
          fontFamily: 'Ubuntu, sans-serif',
          fontSize: fontSize['3xl'],
          fontWeight: fontWeight.normal,
          color: colors.gray[900],
          margin: '0',
          lineHeight: '1.2',
        })}>
          {title}
        </h1>
        {subtitle && (
          <p className={css({
            fontFamily: 'Inter, sans-serif',
            fontSize: fontSize.sm,
            color: colors.gray[500],
            margin: `${spacing.xs} 0 0 0`,
          })}>
            {subtitle}
          </p>
        )}
      </div>
      {rightElement && (
        <div>
          {rightElement}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
