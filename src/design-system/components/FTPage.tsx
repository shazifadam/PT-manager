import React from 'react';
import { Block } from 'baseui/block';
import { useStyletron } from 'baseui';
import { fontFamily, typeScale, fontWeight, lineHeight } from '../tokens';

interface FTPageProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  maxWidth?: string;
}

export const FTPage: React.FC<FTPageProps> = ({ 
  children, 
  title, 
  subtitle,
  maxWidth = '1200px'
}) => {
  const [css] = useStyletron();

  return (
    <Block minHeight="100vh" backgroundColor="#f5f5f5">
      {/* Gradient Header Container - Seamlessly transitions to gray */}
      <Block
        $style={{
          background: 'linear-gradient(180deg, #fad0c4 0%, #ffd1a9 30%, #ffecd2 60%, #f5f5f5 100%)',
          paddingTop: '32px',
          paddingBottom: '32px',
        }}
      >
        <Block
          maxWidth={maxWidth}
          marginLeft="auto"
          marginRight="auto"
          paddingLeft="scale600"
          paddingRight="scale600"
        >
          {(title || subtitle) && (
            <Block>
              {title && (
                <h1 className={css({
                  fontFamily: fontFamily.heading,
                  fontSize: typeScale['4'], // 33.18px
                  fontWeight: fontWeight.normal,
                  lineHeight: lineHeight.tight,
                  margin: 0,
                  marginBottom: subtitle ? '4px' : 0,
                  color: 'rgba(0, 0, 0, 0.85)',
                  letterSpacing: '-0.01em',
                })}>
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className={css({
                  fontFamily: fontFamily.body,
                  fontSize: typeScale['0'], // 16px
                  fontWeight: fontWeight.normal,
                  lineHeight: lineHeight.normal,
                  margin: 0,
                  color: 'rgba(0, 0, 0, 0.5)',
                })}>
                  {subtitle}
                </p>
              )}
            </Block>
          )}
        </Block>
      </Block>

      {/* Content Area - Light gray background */}
      <Block
        maxWidth={maxWidth}
        marginLeft="auto"
        marginRight="auto"
        paddingLeft="scale600"
        paddingRight="scale600"
        paddingTop="scale800"
        paddingBottom="scale800"
      >
        {children}
      </Block>
    </Block>
  );
};
