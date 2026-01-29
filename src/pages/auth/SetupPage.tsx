import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { useStyletron } from 'baseui';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/userService';

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

      // Create user profile in Firestore
      await userService.createUserProfile(currentUser.uid, {
        displayName: displayName.trim(),
        email: currentUser.email || '',
        photoURL: currentUser.photoURL || '',
      });

      // Navigate to dashboard
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
      backgroundColor: '#f2e9e2',
      padding: '20px',
    })}>
      <div className={css({
        maxWidth: '400px',
        width: '100%',
      })}>
        {/* Welcome Header */}
        <div className={css({
          textAlign: 'center',
          marginBottom: '40px',
        })}>
          {currentUser?.photoURL && (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className={css({
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                margin: '0 auto 16px',
                border: '3px solid #e6434c',
              })}
            />
          )}
          <h1 className={css({
            fontFamily: 'Ubuntu, sans-serif',
            fontSize: '32px',
            fontWeight: '400',
            color: '#3a061a',
            marginBottom: '8px',
          })}>
            Welcome to FitTrack Pro
          </h1>
          <p className={css({
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: '#847369',
          })}>
            Let's set up your account
          </p>
        </div>

        {/* Setup Form Card */}
        <div className={css({
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '40px 32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        })}>
          <form onSubmit={handleSubmit}>
            <div className={css({ marginBottom: '24px' })}>
              <label className={css({
                display: 'block',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                color: '#171619',
                marginBottom: '8px',
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
                      borderRadius: '8px',
                    },
                  },
                  Input: {
                    style: {
                      backgroundColor: '#f2e9e2',
                      borderColor: error ? '#e6434c' : '#d0bfb1',
                      fontFamily: 'Inter, sans-serif',
                    },
                  },
                }}
              />
            </div>

            {error && (
              <div className={css({
                backgroundColor: '#fee',
                color: '#e6434c',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '14px',
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
                    backgroundColor: '#e6434c',
                    ':hover': {
                      backgroundColor: '#9a375b',
                    },
                    ':active': {
                      backgroundColor: '#3a061a',
                    },
                    ':disabled': {
                      backgroundColor: '#d0bfb1',
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
