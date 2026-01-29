import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';
import { useAuth } from '../../contexts/AuthContext';
import Container from '../../components/common/Container';
import Card from '../../components/common/Card';
import Section from '../../components/common/Section';
import { colors, spacing, fontSize, borderRadius } from '../../config/designSystem';

const DashboardPage: React.FC = () => {
  const [css] = useStyletron();
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={css({
      minHeight: '100vh',
      backgroundColor: colors.background.primary,
      paddingTop: spacing.xl,
      paddingBottom: spacing.xl,
    })}>
      <Container>
        {/* User Profile Header */}
        <Section>
          <Card>
            <div className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            })}>
              <div className={css({ 
                display: 'flex', 
                alignItems: 'center', 
                gap: spacing.base 
              })}>
                {currentUser?.photoURL && (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className={css({
                      width: '48px',
                      height: '48px',
                      borderRadius: borderRadius.full,
                      border: `2px solid ${colors.brand.burgundy}`,
                    })}
                  />
                )}
                <div>
                  <h1 className={css({
                    fontFamily: 'Ubuntu, sans-serif',
                    fontSize: fontSize.xl,
                    fontWeight: '400',
                    color: colors.gray[900],
                    margin: '0',
                  })}>
                    Hello, {currentUser?.displayName}
                  </h1>
                  <p className={css({
                    fontFamily: 'Inter, sans-serif',
                    fontSize: fontSize.sm,
                    color: colors.gray[500],
                    margin: `${spacing.xs} 0 0 0`,
                  })}>
                    {currentUser?.email}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleSignOut}
                kind="secondary"
                size="compact"
                overrides={{
                  BaseButton: {
                    style: {
                      borderRadius: borderRadius.full,
                      backgroundColor: colors.background.surface,
                      color: colors.brand.burgundy,
                      border: `1px solid ${colors.brand.burgundy}`,
                      ':hover': {
                        backgroundColor: colors.background.primary,
                      },
                    },
                  },
                }}
              >
                Sign Out
              </Button>
            </div>
          </Card>
        </Section>

        {/* Welcome Content */}
        <Section>
          <Card padding="lg">
            <div className={css({ textAlign: 'center' })}>
              <h2 className={css({
                fontFamily: 'Ubuntu, sans-serif',
                fontSize: fontSize['4xl'],
                fontWeight: '400',
                color: colors.brand.burgundy,
                marginBottom: spacing.base,
              })}>
                🎉 Authentication Complete!
              </h2>
              <p className={css({
                fontFamily: 'Inter, sans-serif',
                fontSize: fontSize.base,
                color: colors.gray[500],
                marginBottom: spacing.xl,             })}>
                Your authentication module is now working. Next steps:
              </p>
              <ul className={css({
                listStyle: 'none',
                padding: 0,
                textAlign: 'left',
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.sm,
              })}>
                {[
                  'Dashboard with Today\'s Sessions',
                  'Client Management System',
                  'Attendance Tracking',
                  'Payment Recording',
                  'Progress Analytics',
                ].map((feature, index) => (
                  <li key={index} className={css({
                    fontFamily: 'Inter, sans-serif',
                    fontSize: fontSize.sm,
                    color: colors.gray[900],
                    padding: spacing.md,
                    backgroundColor: colors.background.primary,
                    borderRadius: borderRadius.base,
                  })}>
                    ✓ {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Section>
      </Container>
    </div>
  );
};

export default DashboardPage;
