import React, { useState } from 'react';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';
import { useAuth } from '../../contexts/AuthContext';
import { colors, spacing, fontSize, borderRadius, shadows } from '../../config/designSystem';

const LoginPage: React.FC = () => {
  const [css] = useStyletron();
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <div className={css({
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.primary,
      padding: spacing.xl,
    })}>
      <div className={css({
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
      })}>
        {/* Logo/Brand */}
        <div className={css({
          marginBottom: spacing['3xl'],
        })}>
          <h1 className={css({
            fontFamily: 'Ubuntu, sans-serif',
            fontSize: fontSize['6xl'],
            fontWeight: '400',
            color: colors.brand.burgundy,
            marginBottom: spacing.sm,
          })}>
            FitTrack Pro
          </h1>
          <p className={css({
            fontFamily: 'Inter, sans-serif',
            fontSize: fontSize.base,
            color: colors.gray[500],
          })}>
            Your Personal Training Hub
          </p>
        </div>

        {/* Sign In Card */}
        <div className={css({
          backgroundColor: colors.background.surface,
          borderRadius: borderRadius.md,
          padding: spacing['2xl'],
          boxShadow: shadows.md,
        })}>
          <h2 className={css({
            fontFamily: 'Ubuntu, sans-serif',
            fontSize: fontSize['2xl'],
            fontWeight: '400',
            color: colors.gray[900],
            marginBottom: spacing.xl,
          })}>
            Welcome Back
          </h2>

          {error && (
            <div className={css({
              backgroundColor: '#fee',
              color: colors.semantic.error,
              padding: spacing.md,
              borderRadius: borderRadius.base,
              marginBottom: spacing.lg,
              fontSize: fontSize.sm,
            })}>
              {error}
            </div>
          )}

          <Button
            onClick={handleGoogleSignIn}
            isLoading={loading}
            disabled={loading}
            overrides={{
              BaseButton: {
                style: {
                  width: '100%',
                  height: '48px',
                  borderRadius: borderRadius.full,
                  backgroundColor: colors.brand.burgundy,
                  ':hover': {
                    backgroundColor: colors.brand.pink,
                  },
                  ':active': {
                    backgroundColor: colors.brand.coralRed,
                  },
                },
              },
            }}
          >
            <div className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.md,
              fontSize: fontSize.base,
            })}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </div>
          </Button>
        </div>

        <p className={css({
          marginTop: spacing.xl,
          fontSize: fontSize.xs,
          color: colors.gray[400],
          fontFamily: 'Inter, sans-serif',
        })}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
