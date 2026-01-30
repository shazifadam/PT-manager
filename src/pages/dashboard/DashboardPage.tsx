import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Block } from 'baseui/block';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import { StatefulMenu } from 'baseui/menu';
import { useStyletron } from 'baseui';
import { Settings, LogOut, User, Calendar, MoreVertical } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { semantic, fontFamily, typeScale, fontWeight, lineHeight, gray } from '../../design-system';
import { RescheduleModal } from '../../components/dashboard/RescheduleModal';
import { ConfirmationModal } from '../../components/dashboard/ConfirmationModal';
import { mockTodaySessions, MockClient } from '../../services/mockData';

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
    setSessions(sessions.map(s => 
      s.id === id ? { ...s, attendanceStatus: 'attended' as const } : s
    ));
  };

  const handleMarkAbsent = (id: string) => {
    setSessions(sessions.map(s => 
      s.id === id ? { ...s, attendanceStatus: 'absent' as const } : s
    ));
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

  const pendingSessions = sessions.filter(s => s.attendanceStatus === 'pending');
  const completedSessions = sessions.filter(s => s.attendanceStatus !== 'pending');

  // Group by time
  const groupByTime = (sessionList: MockClient[]) => {
    const grouped = sessionList.reduce((acc, session) => {
      const time = session.scheduledTime;
      if (!acc[time]) acc[time] = [];
      acc[time].push(session);
      return acc;
    }, {} as Record<string, MockClient[]>);
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  };

  const pendingByTime = useMemo(() => groupByTime(pendingSessions), [pendingSessions]);
  const completedByTime = useMemo(() => groupByTime(completedSessions), [completedSessions]);

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

  const getSessionMenuItems = (sessionId: string) => [
    {
      label: 'Attended',
      id: 'attended',
    },
    {
      label: 'Absent',
      id: 'absent',
    },
    {
      label: 'Reschedule',
      id: 'reschedule',
    },
  ];

  const handleProfileMenuSelect = (item: any) => {
    if (item.item.id === 'logout') handleSignOut();
  };

  const handleSessionMenuSelect = (sessionId: string, item: any) => {
    switch (item.item.id) {
      case 'attended': handleMarkAttended(sessionId); break;
      case 'absent': handleMarkAbsent(sessionId); break;
      case 'reschedule': handleReschedule(sessionId); break;
    }
  };

  return (
    <Block minHeight="100vh" backgroundColor={semantic.bg} paddingBottom="80px">
      {/* Header with Gradient */}
      <Block
        backgroundColor={semantic.surface}
        padding="scale600"
        paddingTop="scale800"
        $style={{
          // eslint-disable-next-line no-restricted-syntax
          background: 'linear-gradient(to bottom, #FFE6C7 0%, #F5F5F5 100%)',
        }}
      >
        <Block
          maxWidth="600px"
          marginLeft="auto"
          marginRight="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Block>
            <p className={css({
              fontFamily: fontFamily.body,
              fontSize: typeScale['0'],
              fontWeight: fontWeight.normal,
              lineHeight: lineHeight.normal,
              color: gray[600],
              margin: 0,
              marginBottom: '2px',
            })}>
              Welcome Back
            </p>
            <h1 className={css({
              fontFamily: fontFamily.heading,
              fontSize: typeScale['2'],
              fontWeight: fontWeight.medium,
              lineHeight: lineHeight.tight,
              margin: 0,
              color: theme.colors.contentPrimary,
            })}>
              {currentUser?.displayName || 'User'}
            </h1>
          </Block>

          {/* Profile Icon */}
          <StatefulPopover
            placement={PLACEMENT.bottomRight}
            content={({ close }) => (
              <StatefulMenu
                items={profileMenuItems}
                onItemSelect={(item) => {
                  handleProfileMenuSelect(item);
                  close();
                }}
              />
            )}
          >
            <Block
              $style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: gray[200],
              }}
            >
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Block display="flex" alignItems="center" justifyContent="center" height="100%">
                  <User size={24} color={gray[600]} />
                </Block>
              )}
            </Block>
          </StatefulPopover>
        </Block>
      </Block>

      {/* Content */}
      <Block
        maxWidth="600px"
        marginLeft="auto"
        marginRight="auto"
        padding="scale600"
      >
        {/* Date Card */}
        <Block
          backgroundColor={semantic.surface}
          padding="scale500"
          marginBottom="scale500"
          $style={{
            borderRadius: '10px',
            border: `1px solid ${semantic.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span className={css({
            fontFamily: fontFamily.body,
            fontSize: typeScale['0'],
            fontWeight: fontWeight.normal,
            lineHeight: lineHeight.normal,
            color: gray[900],
          })}>
            {getTodayDate()}
          </span>
          <Calendar size={20} color={gray[600]} strokeWidth={2} />
        </Block>

        {/* Stats Bar */}
        <Block
          backgroundColor={gray[800]}
          padding="scale600"
          marginBottom="scale700"
          $style={{
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Block flex={1}>
            <p className={css({
              fontFamily: fontFamily.body,
              fontSize: typeScale['1'],
              fontWeight: fontWeight.normal,
              lineHeight: lineHeight.normal,
              color: 'rgba(255,255,255,0.8)',
              margin: 0,
              marginBottom: '8px',
            })}>
              Clients for the day
            </p>
            <Block
              height="4px"
              backgroundColor="rgba(255,255,255,0.2)"
              $style={{ borderRadius: '2px', overflow: 'hidden' }}
            >
              <Block
                height="100%"
                backgroundColor={gray.white}
                $style={{ width: `${(completedSessions.length / sessions.length) * 100}%` }}
              />
            </Block>
          </Block>
          <Block
            backgroundColor="rgba(255,255,255,0.15)"
            padding="8px 16px"
            marginLeft="scale600"
            $style={{ borderRadius: '8px' }}
          >
            <span className={css({
              fontFamily: fontFamily.heading,
              fontSize: typeScale['1'],
              fontWeight: fontWeight.medium,
              lineHeight: lineHeight.snug,
              color: gray.white,
            })}>
              {sessions.length} clients
            </span>
          </Block>
        </Block>

        {/* Timeline - Pending Sessions */}
        {pendingByTime.map(([time, timeSessions], timeIndex) => (
          <Block key={time} marginBottom="scale700">
            {/* Time Label - Full Width */}
            <Block marginBottom="scale300">
              <p className={css({
                fontFamily: fontFamily.body,
                fontSize: typeScale['-1'],
                fontWeight: fontWeight.medium,
                lineHeight: lineHeight.normal,
                color: gray[600],
                margin: 0,
              })}>
                {time}
              </p>
            </Block>

            {/* Timeline + Cards Container */}
            <Block display="flex" paddingLeft="19px" $style={{ gap: '26px' }}>
              {/* Vertical Line */}
              <Block
                width="2px"
                backgroundColor={semantic.border}
                $style={{
                  minHeight: '100%',
                  flexShrink: 0,
                }}
              />

              {/* Cards Column */}
              <Block flex={1}>
                {timeSessions.map((session, index) => (
                  <Block
                    key={session.id}
                    backgroundColor={semantic.surface}
                    padding="scale600"
                    marginBottom={index < timeSessions.length - 1 ? 'scale400' : '0'}
                    $style={{
                      borderRadius: '12px',
                      border: `1px solid ${semantic.border}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Block>
                      <h3 className={css({
                        fontFamily: fontFamily.heading,
                        fontSize: typeScale['1'],
                        fontWeight: fontWeight.medium,
                        lineHeight: lineHeight.snug,
                        margin: 0,
                        marginBottom: '4px',
                        color: gray[900],
                      })}>
                        {session.name}
                      </h3>
                      <p className={css({
                        fontFamily: fontFamily.body,
                        fontSize: typeScale['-1'],
                        fontWeight: fontWeight.normal,
                        lineHeight: lineHeight.normal,
                        color: gray[600],
                        margin: 0,
                      })}>
                        {session.trainingPrograms.join(' • ')}
                      </p>
                    </Block>

                    <StatefulPopover
                      placement={PLACEMENT.bottomRight}
                      content={({ close }) => (
                        <StatefulMenu
                          items={getSessionMenuItems(session.id)}
                          onItemSelect={(item) => {
                            handleSessionMenuSelect(session.id, item);
                            close();
                          }}
                          overrides={{
                            List: {
                              style: {
                                backgroundColor: semantic.surface,
                                borderRadius: '12px',
                                border: `1px solid ${semantic.border}`,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                padding: '8px',
                                minWidth: '180px',
                                outline: 'none',
                                ':focus': {
                                  outline: 'none',
                                },
                              },
                            },
                            Option: {
                              props: {
                                overrides: {
                                  ListItem: {
                                    style: ({ $isHighlighted }: any) => ({
                                      backgroundColor: $isHighlighted ? gray[50] : 'transparent',
                                      borderRadius: '8px',
                                      paddingTop: '12px',
                                      paddingBottom: '12px',
                                      paddingLeft: '16px',
                                      paddingRight: '16px',
                                      fontFamily: fontFamily.body,
                                      fontSize: typeScale['0'],
                                      fontWeight: fontWeight.normal,
                                      lineHeight: lineHeight.normal,
                                      color: gray[900],
                                      cursor: 'pointer',
                                      outline: 'none',
                                      ':hover': {
                                        backgroundColor: gray[50],
                                      },
                                      ':focus': {
                                        outline: 'none',
                                        backgroundColor: gray[50],
                                      },
                                    }),
                                  },
                                },
                              },
                            },
                            ListItem: {
                              style: ({ $isHighlighted }: any) => ({
                                backgroundColor: $isHighlighted ? gray[50] : 'transparent',
                                borderRadius: '8px',
                                paddingTop: '12px',
                                paddingBottom: '12px',
                                paddingLeft: '16px',
                                paddingRight: '16px',
                                fontFamily: fontFamily.body,
                                fontSize: typeScale['0'],
                                fontWeight: fontWeight.normal,
                                lineHeight: lineHeight.normal,
                                color: gray[900],
                                cursor: 'pointer',
                                outline: 'none',
                                ':hover': {
                                  backgroundColor: gray[50],
                                },
                                ':focus': {
                                  outline: 'none',
                                  backgroundColor: gray[50],
                                },
                              }),
                            },
                          }}
                        />
                      )}
                      overrides={{
                        Body: {
                          style: {
                            zIndex: 1300,
                            outline: 'none',
                            border: 'none',
                          },
                        },
                        Inner: {
                          style: {
                            backgroundColor: 'transparent',
                            outline: 'none',
                            border: 'none',
                            boxShadow: 'none',
                          },
                        },
                      }}
                      focusLock={false}
                      autoFocus={false}
                      returnFocus={false}
                    >
                      <Block
                        $style={{
                          cursor: 'pointer',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '8px',
                          backgroundColor: gray[50],
                        }}
                      >
                        <MoreVertical size={20} color={gray[600]} strokeWidth={2} />
                      </Block>
                    </StatefulPopover>
                  </Block>
                ))}
              </Block>
            </Block>
          </Block>
        ))}

        {/* Completed Section */}
        {completedByTime.length > 0 && (
          <Block marginTop="scale1000">
            <h2 className={css({
              fontFamily: fontFamily.heading,
              fontSize: typeScale['2'],
              fontWeight: fontWeight.medium,
              lineHeight: lineHeight.snug,
              margin: 0,
              marginBottom: '16px',
              color: gray[900],
            })}>
              Completed today
            </h2>
            {completedByTime.map(([time, timeSessions]) => (
              <Block key={time}>
                {timeSessions.map((session) => (
                  <Block key={session.id} marginBottom="scale700">
                    <Block
                      backgroundColor={gray[50]}
                      padding="scale600"
                      marginBottom="scale300"
                      $style={{
                        borderRadius: '12px',
                        border: `1px solid ${semantic.border}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Block>
                        <h3 className={css({
                          fontFamily: fontFamily.heading,
                          fontSize: typeScale['1'],
                          fontWeight: fontWeight.medium,
                          lineHeight: lineHeight.snug,
                          margin: 0,
                          marginBottom: '4px',
                          color: gray[900],
                        })}>
                          {session.name}
                        </h3>
                        <p className={css({
                          fontFamily: fontFamily.body,
                          fontSize: typeScale['-1'],
                          fontWeight: fontWeight.normal,
                          lineHeight: lineHeight.normal,
                          color: gray[600],
                          margin: 0,
                        })}>
                          {session.trainingPrograms.join(' • ')}
                        </p>
                      </Block>
                      
                      <StatefulPopover
                        placement={PLACEMENT.bottomRight}
                        content={({ close }) => (
                          <StatefulMenu
                            items={[
                              {
                                label: 'Undo Attendance',
                                id: 'undo',
                              },
                            ]}
                            onItemSelect={(item) => {
                              if (item.item.id === 'undo') {
                                setSessions(sessions.map(s => 
                                  s.id === session.id ? { ...s, attendanceStatus: 'pending' as const } : s
                                ));
                              }
                              close();
                            }}
                            overrides={{
                              List: {
                                style: {
                                  backgroundColor: semantic.surface,
                                  borderRadius: '12px',
                                  border: `1px solid ${semantic.border}`,
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                  padding: '8px',
                                  minWidth: '180px',
                                  outline: 'none',
                                },
                              },
                              ListItem: {
                                style: ({ $isHighlighted }: any) => ({
                                  backgroundColor: $isHighlighted ? gray[50] : 'transparent',
                                  borderRadius: '8px',
                                  paddingTop: '12px',
                                  paddingBottom: '12px',
                                  paddingLeft: '16px',
                                  paddingRight: '16px',
                                  fontFamily: fontFamily.body,
                                  fontSize: typeScale['0'],
                                  fontWeight: fontWeight.normal,
                                  lineHeight: lineHeight.normal,
                                  color: gray[900],
                                  cursor: 'pointer',
                                  outline: 'none',
                                  ':hover': {
                                    backgroundColor: gray[50],
                                  },
                                }),
                              },
                            }}
                          />
                        )}
                        overrides={{
                          Body: {
                            style: {
                              zIndex: 1300,
                              outline: 'none',
                              border: 'none',
                            },
                          },
                          Inner: {
                            style: {
                              backgroundColor: 'transparent',
                              outline: 'none',
                              border: 'none',
                              boxShadow: 'none',
                            },
                          },
                        }}
                        focusLock={false}
                        autoFocus={false}
                        returnFocus={false}
                      >
                        <Block
                          $style={{
                            cursor: 'pointer',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            backgroundColor: gray[50],
                          }}
                        >
                          <MoreVertical size={20} color={gray[400]} strokeWidth={2} />
                        </Block>
                      </StatefulPopover>
                    </Block>
                    <p className={css({
                      fontFamily: fontFamily.body,
                      fontSize: typeScale['-1'],
                      fontWeight: fontWeight.normal,
                      lineHeight: lineHeight.normal,
                      fontStyle: 'italic',
                      color: gray[500],
                      margin: 0,
                      textAlign: 'right',
                    })}>
                      Marked as attended at 16:23
                    </p>
                  </Block>
                ))}
              </Block>
            ))}
          </Block>
        )}

        {/* Rescheduled Section */}
        {sessions.filter(s => s.attendanceStatus === 'rescheduled').length > 0 && (
          <Block marginTop="scale1000">
            <h2 className={css({
              fontFamily: fontFamily.heading,
              fontSize: typeScale['2'],
              fontWeight: fontWeight.medium,
              lineHeight: lineHeight.snug,
              margin: 0,
              marginBottom: '16px',
              color: gray[900],
            })}>
              Rescheduled
            </h2>
            {sessions.filter(s => s.attendanceStatus === 'rescheduled').map((session) => (
              <Block key={session.id} marginBottom="scale700">
                <Block
                  backgroundColor={semantic.surface}
                  padding="scale600"
                  marginBottom="scale300"
                  $style={{
                    borderRadius: '12px',
                    border: `1px solid ${semantic.border}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Block>
                    <h3 className={css({
                      fontFamily: fontFamily.heading,
                      fontSize: typeScale['1'],
                      fontWeight: fontWeight.medium,
                      lineHeight: lineHeight.snug,
                      margin: 0,
                      marginBottom: '4px',
                      color: gray[900],
                    })}>
                      {session.name}
                    </h3>
                    <p className={css({
                      fontFamily: fontFamily.body,
                      fontSize: typeScale['-1'],
                      fontWeight: fontWeight.normal,
                      lineHeight: lineHeight.normal,
                      color: gray[600],
                      margin: 0,
                    })}>
                      {session.trainingPrograms.join(' • ')}
                    </p>
                  </Block>
                  
                  <StatefulPopover
                    placement={PLACEMENT.bottomRight}
                    content={({ close }) => (
                      <StatefulMenu
                        items={[
                          {
                            label: 'Undo Reschedule',
                            id: 'undo',
                          },
                        ]}
                        onItemSelect={(item) => {
                          if (item.item.id === 'undo') {
                            setSessions(sessions.map(s => 
                              s.id === session.id ? { ...s, attendanceStatus: 'pending' as const } : s
                            ));
                          }
                          close();
                        }}
                        overrides={{
                          List: {
                            style: {
                              backgroundColor: semantic.surface,
                              borderRadius: '12px',
                              border: `1px solid ${semantic.border}`,
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                              padding: '8px',
                              minWidth: '180px',
                              outline: 'none',
                            },
                          },
                          ListItem: {
                            style: ({ $isHighlighted }: any) => ({
                              backgroundColor: $isHighlighted ? gray[50] : 'transparent',
                              borderRadius: '8px',
                              paddingTop: '12px',
                              paddingBottom: '12px',
                              paddingLeft: '16px',
                              paddingRight: '16px',
                              fontFamily: fontFamily.body,
                              fontSize: typeScale['0'],
                              fontWeight: fontWeight.normal,
                              lineHeight: lineHeight.normal,
                              color: gray[900],
                              cursor: 'pointer',
                              outline: 'none',
                              ':hover': {
                                backgroundColor: gray[50],
                              },
                            }),
                          },
                        }}
                      />
                    )}
                    overrides={{
                      Body: {
                        style: {
                          zIndex: 1300,
                          outline: 'none',
                          border: 'none',
                        },
                      },
                      Inner: {
                        style: {
                          backgroundColor: 'transparent',
                          outline: 'none',
                          border: 'none',
                          boxShadow: 'none',
                        },
                      },
                    }}
                    focusLock={false}
                    autoFocus={false}
                    returnFocus={false}
                  >
                    <Block
                      $style={{
                        cursor: 'pointer',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        backgroundColor: gray[50],
                      }}
                    >
                      <MoreVertical size={20} color={gray[600]} strokeWidth={2} />
                    </Block>
                  </StatefulPopover>
                </Block>
                <p className={css({
                  fontFamily: fontFamily.body,
                  fontSize: typeScale['-1'],
                  fontWeight: fontWeight.normal,
                  lineHeight: lineHeight.normal,
                  fontStyle: 'italic',
                  color: gray[500],
                  margin: 0,
                  textAlign: 'right',
                })}>
                  Rescheduled to Feb 2, 2026 at 10:00 AM
                </p>
              </Block>
            ))}
          </Block>
        )}
      </Block>

      {/* Modals */}
      <ConfirmationModal
        isOpen={confirmModalOpen}
        title={confirmAction === 'attended' ? 'Confirm Attendance' : 'Confirm Absence'}
        message={selectedSession ? `Mark ${selectedSession.name}'s session as ${confirmAction}?` : ''}
        onConfirm={() => setConfirmModalOpen(false)}
        onCancel={() => setConfirmModalOpen(false)}
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