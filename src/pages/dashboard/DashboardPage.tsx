import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Block } from 'baseui/block';
import { LabelMedium, LabelSmall, ParagraphMedium } from 'baseui/typography';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import { StatefulMenu } from 'baseui/menu';
import { useStyletron } from 'baseui';
import { Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { FTPage, FTSection, semantic, fontFamily, fontSize, fontWeight } from '../../design-system';
import { SessionCard } from '../../components/dashboard/SessionCard';
import { RescheduleModal } from '../../components/dashboard/RescheduleModal';
import { ConfirmationModal } from '../../components/dashboard/ConfirmationModal';
import { mockTodaySessions, MockClient } from '../../services/mockData';

// Group sessions by time
const groupSessionsByTime = (sessions: MockClient[]) => {
  const grouped = sessions.reduce((acc, session) => {
    const time = session.scheduledTime;
    if (!acc[time]) {
      acc[time] = [];
    }
    acc[time].push(session);
    return acc;
  }, {} as Record<string, MockClient[]>);

  // Sort times
  return Object.entries(grouped).sort(([timeA], [timeB]) => {
    return timeA.localeCompare(timeB);
  });
};

export const DashboardPage: React.FC = () => {
  const [css, theme] = useStyletron();
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [sessions, setSessions] = useState<MockClient[]>(mockTodaySessions);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'attended' | 'absent' | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const selectedSession = sessions.find(s => s.id === selectedSessionId);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleMarkAttended = (id: string) => {
    setSelectedSessionId(id);
    setConfirmAction('attended');
    setConfirmModalOpen(true);
  };

  const handleMarkAbsent = (id: string) => {
    setSelectedSessionId(id);
    setConfirmAction('absent');
    setConfirmModalOpen(true);
  };

  const handleConfirmAttendance = () => {
    if (selectedSessionId && confirmAction) {
      setSessions(sessions.map(s => 
        s.id === selectedSessionId ? { ...s, attendanceStatus: confirmAction as any } : s
      ));
      setConfirmModalOpen(false);
      setConfirmAction(null);
      setSelectedSessionId(null);
    }
  };

  const handleReschedule = (id: string) => {
    setSelectedSessionId(id);
    setRescheduleModalOpen(true);
  };

  const handleConfirmReschedule = (newDate: Date, reason: string) => {
    if (selectedSessionId) {
      setSessions(sessions.map(s => 
        s.id === selectedSessionId ? { ...s, attendanceStatus: 'rescheduled' as const } : s
      ));
      console.log('Rescheduled to:', newDate, 'Reason:', reason);
      setRescheduleModalOpen(false);
      setSelectedSessionId(null);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getConfirmationMessage = () => {
    if (!selectedSession) return '';
    if (confirmAction === 'attended') {
      return `Mark ${selectedSession.name}'s session as attended?`;
    }
    return `Mark ${selectedSession.name}'s session as absent?`;
  };

  // Get user's first name
  const getFirstName = () => {
    if (!currentUser?.displayName) return 'there';
    const nameParts = currentUser.displayName.split(' ');
    return nameParts[0];
  };

  const pendingSessions = sessions.filter(s => s.attendanceStatus === 'pending');
  const completedSessions = sessions.filter(s => s.attendanceStatus !== 'pending');

  const pendingSessionsByTime = useMemo(() => groupSessionsByTime(pendingSessions), [pendingSessions]);
  const completedSessionsByTime = useMemo(() => groupSessionsByTime(completedSessions), [completedSessions]);

  const profileMenuItems = [
    {
      label: (
        <Block display="flex" alignItems="center" gridGap="scale400">
          <Settings size={18} strokeWidth={2} />
          <span>Settings</span>
        </Block>
      ),
      id: 'settings',
    },
    {
      label: (
        <Block display="flex" alignItems="center" gridGap="scale400">
          <LogOut size={18} strokeWidth={2} />
          <span>Sign Out</span>
        </Block>
      ),
      id: 'logout',
    },
  ];

  const handleProfileMenuSelect = (item: any) => {
    switch (item.item.id) {
      case 'settings':
        // TODO: Navigate to settings
        console.log('Navigate to settings');
        break;
      case 'logout':
        handleSignOut();
        break;
    }
  };

  return (
    <Block minHeight="100vh" backgroundColor="#f5f5f5">
      {/* Gradient Header with Profile Icon */}
      <Block
        $style={{
          background: 'linear-gradient(180deg, #fad0c4 0%, #ffd1a9 30%, #ffecd2 60%, #f5f5f5 100%)',
          paddingTop: '32px',
          paddingBottom: '32px',
          position: 'relative',
        }}
      >
        <Block
          maxWidth="1200px"
          marginLeft="auto"
          marginRight="auto"
          paddingLeft="scale600"
          paddingRight="scale600"
        >
          {/* Profile Icon - Top Right */}
          <Block
            $style={{
              position: 'absolute',
              top: '32px',
              right: '24px',
            }}
          >
            <StatefulPopover
              placement={PLACEMENT.bottomRight}
              content={({ close }) => (
                <StatefulMenu
                  items={profileMenuItems}
                  onItemSelect={(item) => {
                    handleProfileMenuSelect(item);
                    close();
                  }}
                  overrides={{
                    List: {
                      style: {
                        width: '200px',
                      },
                    },
                  }}
                />
              )}
            >
              <Block
                $style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255, 255, 255, 0.9)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  ':hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <User size={24} color="#171619" strokeWidth={2} />
                )}
              </Block>
            </StatefulPopover>
          </Block>

          {/* Title */}
          <Block>
            <h1 className={css({
              fontFamily: fontFamily.heading,
              fontSize: fontSize['3xl'],
              fontWeight: fontWeight.normal,
              lineHeight: '1.2',
              margin: 0,
              marginBottom: '4px',
              color: 'rgba(0, 0, 0, 0.85)',
              letterSpacing: '-0.01em',
            })}>
              Welcome back, {getFirstName()}
            </h1>
            <p className={css({
              fontFamily: fontFamily.body,
              fontSize: fontSize.base,
              fontWeight: fontWeight.normal,
              lineHeight: '1.4',
              margin: 0,
              color: 'rgba(0, 0, 0, 0.5)',
            })}>
              {getTodayDate()}
            </p>
          </Block>
        </Block>
      </Block>

      {/* Content Area */}
      <Block
        maxWidth="1200px"
        marginLeft="auto"
        marginRight="auto"
        paddingLeft="scale600"
        paddingRight="scale600"
        paddingTop="scale800"
        paddingBottom="scale800"
      >
        {/* Stats Card */}
        <Block marginBottom="scale800">
          <Block
            backgroundColor="#171619"
            padding="scale700"
            $style={{
              borderRadius: '16px',
              textAlign: 'center',
            }}
          >
            <div className={css({
              fontFamily: fontFamily.heading,
              fontSize: '48px',
              fontWeight: fontWeight.normal,
              lineHeight: '1',
              color: '#ffffff',
              marginBottom: '8px',
              letterSpacing: '-0.02em',
            })}>
              {sessions.length}
            </div>
            <div className={css({
              fontFamily: fontFamily.body,
              fontSize: fontSize.base,
              fontWeight: fontWeight.normal,
              color: 'rgba(255, 255, 255, 0.7)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            })}>
              Sessions Today
            </div>
          </Block>
        </Block>

        {/* Today's Sessions */}
        <FTSection title="Today's Sessions">
          {/* Pending Sessions Grouped by Time */}
          {pendingSessionsByTime.length > 0 && (
            <Block marginBottom={completedSessionsByTime.length > 0 ? 'scale1000' : 0}>
              {pendingSessionsByTime.map(([time, timeSessions]) => (
                <Block key={time} marginBottom="scale800">
                  {/* Time Header - Microtext Style */}
                  <LabelSmall
                    color="contentSecondary"
                    marginTop={0}
                    marginBottom="scale400"
                    $style={{
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 500,
                    }}
                  >
                    {time}
                  </LabelSmall>

                  {/* Sessions at this time */}
                  <Block>
                    {timeSessions.map((session) => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        onMarkAttended={handleMarkAttended}
                        onMarkAbsent={handleMarkAbsent}
                        onReschedule={handleReschedule}
                        showTime={false}
                      />
                    ))}
                  </Block>
                </Block>
              ))}
            </Block>
          )}

          {/* Completed Sessions Grouped by Time */}
          {completedSessionsByTime.length > 0 && (
            <>
              <h3 className={css({
                fontFamily: fontFamily.heading,
                fontSize: fontSize.lg,
                fontWeight: fontWeight.normal,
                color: theme.colors.contentSecondary,
                margin: 0,
                marginTop: theme.sizing.scale1000,
                marginBottom: theme.sizing.scale600,
              })}>
                Completed
              </h3>
              {completedSessionsByTime.map(([time, timeSessions]) => (
                <Block key={time} marginBottom="scale800">
                  {/* Time Header - Microtext Style */}
                  <LabelSmall
                    color="contentSecondary"
                    marginTop={0}
                    marginBottom="scale400"
                    $style={{
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 500,
                    }}
                  >
                    {time}
                  </LabelSmall>

                  {/* Sessions at this time */}
                  <Block>
                    {timeSessions.map((session) => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        onMarkAttended={handleMarkAttended}
                        onMarkAbsent={handleMarkAbsent}
                        onReschedule={handleReschedule}
                        showTime={false}
                      />
                    ))}
                  </Block>
                </Block>
              ))}
            </>
          )}

          {/* Empty State */}
          {sessions.length === 0 && (
            <Block
              backgroundColor="#ffffff"
              padding="scale1000"
              $style={{
                borderRadius: '12px',
                border: '1px solid #e0e0e0',
              }}
            >
              <ParagraphMedium
                color="contentSecondary"
                marginTop={0}
                marginBottom={0}
                $style={{ textAlign: 'center' }}
              >
                No sessions scheduled for today
              </ParagraphMedium>
            </Block>
          )}
        </FTSection>
      </Block>

      {/* Modals */}
      <ConfirmationModal
        isOpen={confirmModalOpen}
        title={confirmAction === 'attended' ? 'Confirm Attendance' : 'Confirm Absence'}
        message={getConfirmationMessage()}
        onConfirm={handleConfirmAttendance}
        onCancel={() => {
          setConfirmModalOpen(false);
          setConfirmAction(null);
          setSelectedSessionId(null);
        }}
      />

      <RescheduleModal
        isOpen={rescheduleModalOpen}
        clientName={selectedSession?.name || ''}
        onClose={() => {
          setRescheduleModalOpen(false);
          setSelectedSessionId(null);
        }}
        onConfirm={handleConfirmReschedule}
      />
    </Block>
  );
};

export default DashboardPage;
