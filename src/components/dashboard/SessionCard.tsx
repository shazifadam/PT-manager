import React from 'react';
import { Block } from 'baseui/block';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import { StatefulMenu } from 'baseui/menu';
import { LabelMedium } from 'baseui/typography';
import { Clock, CheckCircle2, XCircle, Calendar, MoreVertical } from 'lucide-react';
import { useStyletron } from 'baseui';
import { FTButton, FTBadge, semantic, programColors } from '../../design-system';
import { MockClient } from '../../services/mockData';

interface SessionCardProps {
  session: MockClient;
  onMarkAttended: (id: string) => void;
  onMarkAbsent: (id: string) => void;
  onReschedule: (id: string) => void;
  showTime?: boolean;
}

// Map program names to color tokens
const getProgramColor = (program: string): string => {
  const programMap: Record<string, string> = {
    'Strength': programColors.strength,
    'Body-Trans': programColors.bodyTrans,
    'Rehab': programColors.rehab,
    'Athlete': programColors.athlete,
    'Netbees': programColors.netbees,
    'Volley': programColors.volley,
    'Weight-loss': programColors.weightLoss,
  };
  return programMap[program] || semantic.bg;
};

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onMarkAttended,
  onMarkAbsent,
  onReschedule,
  showTime = false,
}) => {
  const [css, theme] = useStyletron();
  
  const getStatusVariant = (): 'active' | 'expiring' | 'expired' | 'default' => {
    switch (session.attendanceStatus) {
      case 'attended': return 'active';
      case 'absent': return 'expired';
      case 'rescheduled': return 'expiring';
      default: return 'default';
    }
  };

  const getStatusText = () => {
    switch (session.attendanceStatus) {
      case 'attended': return 'Attended';
      case 'absent': return 'Absent';
      case 'rescheduled': return 'Rescheduled';
      default: return 'Pending';
    }
  };

  const menuItems = [
    {
      label: (
        <Block display="flex" alignItems="center" gridGap="scale400">
          <XCircle size={18} color={semantic.danger} strokeWidth={2} />
          <span>Mark Absent</span>
        </Block>
      ),
      id: 'absent',
    },
    {
      label: (
        <Block display="flex" alignItems="center" gridGap="scale400">
          <Calendar size={18} color={semantic.text} strokeWidth={2} />
          <span>Reschedule</span>
        </Block>
      ),
      id: 'reschedule',
    },
  ];

  const handleMenuSelect = (item: any) => {
    switch (item.item.id) {
      case 'absent':
        onMarkAbsent(session.id);
        break;
      case 'reschedule':
        onReschedule(session.id);
        break;
    }
  };

  return (
    <Block
      backgroundColor={semantic.surface}
      padding="scale600"
      marginBottom="scale400"
      $style={{
        borderRadius: '12px',
        border: `1px solid ${semantic.border}`,
      }}
    >
      <Block
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        gridGap="scale600"
        marginBottom={session.attendanceStatus === 'pending' ? 'scale600' : 0}
      >
        {/* Left: Time (optional) + Client Info */}
        <Block display="flex" gridGap="scale600" flex={1} minWidth={0}>
          {/* Time Badge - only if showTime */}
          {showTime && (
            <Block
              backgroundColor="contentPrimary"
              color="contentInversePrimary"
              padding="scale400"
              $style={{
                borderRadius: '8px',
                minWidth: '60px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                lineHeight: '1',
              }}
            >
              <Clock size={20} strokeWidth={2.5} />
              <LabelMedium
                color="contentInversePrimary"
                marginTop={0}
                marginBottom={0}
              >
                {session.scheduledTime}
              </LabelMedium>
            </Block>
          )}

          {/* Client Info */}
          <Block flex={1} minWidth={0}>
            <LabelMedium marginTop={0} marginBottom="scale300">
              {session.name}
            </LabelMedium>

            {/* Training Tags */}
            <div className={css({
              display: 'flex',
              flexWrap: 'wrap',
              gap: theme.sizing.scale200,
            })}>
              {session.trainingPrograms.map((program) => (
                <Block
                  key={program}
                  backgroundColor={getProgramColor(program)}
                  color="contentPrimary"
                  padding="4px 12px"
                  $style={{
                    borderRadius: '9999px',
                    fontSize: '11px',
                    border: `1px solid ${theme.colors.borderOpaque}`,
                  }}
                >
                  {program}
                </Block>
              ))}
            </div>
          </Block>
        </Block>

        {/* Right: Status Badge */}
        <FTBadge variant={getStatusVariant()}>
          {getStatusText()}
        </FTBadge>
      </Block>

      {/* Action Buttons - only for pending */}
      {session.attendanceStatus === 'pending' && (
        <Block display="flex" gridGap="scale300">
          {/* Mark as Attended Button */}
          <FTButton
            kind="secondary"
            size="default"
            startEnhancer={<CheckCircle2 size={18} strokeWidth={2} />}
            onClick={() => onMarkAttended(session.id)}
            overrides={{
              BaseButton: {
                style: {
                  flex: 1,
                },
              },
            }}
          >
            Mark as Attended
          </FTButton>

          {/* More Menu */}
          <StatefulPopover
            placement={PLACEMENT.bottomRight}
            content={({ close }) => (
              <StatefulMenu
                items={menuItems}
                onItemSelect={(item) => {
                  handleMenuSelect(item);
                  close();
                }}
              />
            )}
          >
            <FTButton
              kind="tertiary"
              size="default"
              overrides={{
                BaseButton: {
                  style: {
                    minWidth: '44px',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                  },
                },
              }}
            >
              <MoreVertical size={20} strokeWidth={2} />
            </FTButton>
          </StatefulPopover>
        </Block>
      )}
    </Block>
  );
};
