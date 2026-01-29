import React from 'react';
import { Block } from 'baseui/block';
import { LabelMedium, ParagraphSmall } from 'baseui/typography';
import { ChevronRight } from 'lucide-react';

interface FTListRowProps {
  title: string;
  subtitle?: string;
  value?: string | React.ReactNode;
  showChevron?: boolean;
  onClick?: () => void;
}

export const FTListRow: React.FC<FTListRowProps> = ({ 
  title, 
  subtitle, 
  value,
  showChevron = false,
  onClick,
}) => {
  return (
    <Block
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingTop="scale600"
      paddingBottom="scale600"
      $style={{
        borderBottom: '1px solid',
        borderColor: '#e8ddd3',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background-color 0.2s',
        ':hover': onClick ? {
          backgroundColor: '#f2e9e2',
          marginLeft: '-16px',
          marginRight: '-16px',
          paddingLeft: '16px',
          paddingRight: '16px',
          borderRadius: '8px',
        } : {},
      }}
      onClick={onClick}
    >
      <Block flex={1} minWidth={0}>
        <LabelMedium
          marginTop={0}
          marginBottom={subtitle ? '4px' : 0}
        >
          {title}
        </LabelMedium>
        {subtitle && (
          <ParagraphSmall
            color="contentSecondary"
            marginTop={0}
            marginBottom={0}
          >
            {subtitle}
          </ParagraphSmall>
        )}
      </Block>
      
      <Block
        display="flex"
        alignItems="center"
        gridGap="scale300"
        marginLeft="scale600"
      >
        {value && (
          <LabelMedium marginTop={0} marginBottom={0}>
            {value}
          </LabelMedium>
        )}
        {showChevron && (
          <ChevronRight size={20} color="#847369" strokeWidth={2} />
        )}
      </Block>
    </Block>
  );
};
