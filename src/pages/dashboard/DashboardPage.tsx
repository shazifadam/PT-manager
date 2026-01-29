import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';
import { useAuth } from '../../contexts/AuthContext';

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
      backgroundColor: '#f2e9e2',
      padding: '20px',
    })}>
      <div className={css({
        maxWidth: '1200px',
        margin: '0 auto',
      })}>
        {/* Header */}
        <div className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        })}>
          <div className={css({ display: 'flex', alignItems: 'center', gap: '16px' })}>
            {currentUser?.photoURL && (
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className={css({
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '2px solid #e6434c',
                })}
              />
            )}
            <div>
              <h1 className={css({
                fontFamily: 'Ubuntu, sans-serif',
                fontSize: '24px',
                fontWeight: '400',
                color: '#171619',
                margin: '0',
              })}>
                Hello, {currentUser?.displayName}
              </h1>
              <p className={css({
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#847369',
                margin: '4px 0 0 0',
              })}>
                {currentUser?.email}
              </p>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            kind="secondary"
            overrides={{
              BaseButton: {
                style: {
                  backgroundColor: '#ffffff',
                  color: '#e6434c',
                  border: '1px solid #e6434c',
                  ':hover': {
                    backgroundColor: '#fee',
                  },
                },
              },
            }}
          >
            Sign Out
          </Button>
        </div>

        {/* Welcome Content */}
        <div className={css({
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
        })}>
          <h2 className={css({
            fontFamily: 'Ubuntu, sans-serif',
            fontSize: '32px',
            fontWeight: '400',
            color: '#3a061a',
            marginBottom: '16px',
          })}>
            🎉 Authentication Complete!
          </h2>
          <p className={css({
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: '#847369',
            marginBottom: '24px',
          })}>
            Your authentication module is now working. Next steps:
          </p>
          <ul className={css({
            listStyle: 'none',
            padding: 0,
            textAlign: 'left',
            maxWidth: '600px',
            margin: '0 auto',
          })}>
            {[
              'Dashboard with Today\'s Sessions',
              'Client Management System',
              'Attendance Tracking',
              'Payment Recording',
              'Progress Analytics',
            ].map((feature, index) => (
              <li key={index} className={css({
                fontFamily: 'Inter, sans-sif',
                fontSize: '14px',
                color: '#171619',
                padding: '12px 16px',
                backgroundColor: '#f2e9e2',
                marginBottom: '8px',
                borderRadius: '8px',
              })}>
                ✓ {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
