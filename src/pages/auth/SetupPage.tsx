import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { useStyletron } from 'baseui';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/userService';
import { colors, spacing, fontSize, borderRadius, shadows } from '../../config/designSystem';

const SetupPage: React.FC = () => {
  const [css] = useStyletron();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName.trim() || displayName.trim().length < 2) {
      setError('Please enter a valid name (at least 2 characters)');
      return;
    }

    if (!currentUser) {
      setError('No user found. Please sign in again.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await userService.createUserProfile(currentUser.uid, {
        displayName: displayName.trim(),
        email: currentUser.email || '',
        photoURL: currentUser.photoURL || '',
      });

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to complete setup');
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
      })}>
        {/* Welcome Header */}
        <div className={css({
          textAlign: 'center',
          marginBottom: spacing['3xl'],
        })}>
          {currentUser?.photoURL && (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className={css({
                width: '80px',
                height: '80px',
                borderRadius: borderRadius.full,
                margin: `0 auto ${spacing.base}`,
                border: `3px solid ${colors.brand.burgundy}`,
              })}
            />
          )}
          <h1 className={css({
            fontFamily: 'Ubuntu, sans-serif',
            fontSize: fontSize['4xl'],
            fontWeight: '400',
            color: colors.brand.burgundy,
            marginBottom: spacing.sm,
          })}>
            Welcome to FitTrack Pro
          </h1>
          <p className={css({
            fontFamily: 'Inter, sans-serif',
            fontSize: fontSize.base,
            color: colors.gray[500],
          })}>
            Let's set up your account
          </p>
        </div>

        {/* Setup Form Card */}
        <div className={css({
          backgroundColor: colors.background.surface,
          borderRadius: borderRadius.md,
          padding: spacing['2xl'],
          boxShadow: shadows.md,
        })}>
          <form onSubmit={handleSubmit}>
            <div className={css({ marginBottom: spacing.xl })}>
              <label className={css({
                display: 'block',
                fontFamily: 'Inter, sans-serif',
                fontSize: fontSize.sm,
                fontWeight: '500',
                color: colors.gray[900],
                marginBottom: spacing.sm,
              })}>
                Your Name *
              </label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.currentTarget.value)}
                placeholder="Enter your full name"
                disabled={loading}
                error={!!error}
                overrides={{
                  Root: {
                    style: {
                      borderRadius: borderRadius.base,
                    },
                  },
                  Input: {
                    style: {
                      backgroundColor: colors.background.primary,
                      borderColor: error ? colors.semantic.error : colors.gray[300],
                      fontFamily: 'Inter, sans-serif',
                    },
                  },
                }}
              />
            </div>

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
              type="submit"
              isLoading={loading}
              disabled={loading || !displayName.trim()}
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
                    ':disabled': {
                      backgroundColor: colors.gray[300],
                    },
                  },
                },
              }}
            >
              Continue to Dashboard
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
