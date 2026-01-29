import React, { useState } from 'react';
import { Block } from 'baseui/block';
import { DatePicker } from 'baseui/datepicker';
import { Textarea } from 'baseui/textarea';
import { LabelMedium } from 'baseui/typography';
import { useStyletron } from 'baseui';
import { Calendar, FileText } from 'lucide-react';
import { FTModal, semantic } from '../../design-system';

interface RescheduleModalProps {
  isOpen: boolean;
  clientName: string;
  onClose: () => void;
  onConfirm: (newDate: Date, reason: string) => void;
}

export const RescheduleModal: React.FC<RescheduleModalProps> = ({
  isOpen,
  clientName,
  onClose,
  onConfirm,
}) => {
  const [css, theme] = useStyletron();
  const [selectedDate, setSelectedDate] = useState<Date[]>([new Date()]);
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (selectedDate[0]) {
      onConfirm(selectedDate[0], reason);
      setReason('');
      onClose();
    }
  };

  const handleDateChange = (params: any) => {
    const date = params.date;
    if (Array.isArray(date)) {
      const validDates = date.filter((d: any): d is Date => d instanceof Date);
      if (validDates.length > 0) {
        setSelectedDate(validDates);
      }
    } else if (date instanceof Date) {
      setSelectedDate([date]);
    }
  };

  return (
    <FTModal
      isOpen={isOpen}
      onClose={onClose}
      title="Reschedule Session"
      primaryAction={{
        label: 'Confirm',
        onClick: handleConfirm,
      }}
      secondaryAction={{
        label: 'Cancel',
        onClick: onClose,
      }}
    >
      <Block display="flex" flexDirection="column" gridGap="scale700">
        {/* Date Field */}
        <Block>
          <Block
            display="flex"
            alignItems="center"
            gridGap="scale200"
            marginBottom="scale300"
          >
            <Calendar size={18} color={semantic.text} strokeWidth={2} />
            <LabelMedium marginTop={0} marginBottom={0}>
              New Date
            </LabelMedium>
          </Block>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
          />
        </Block>

        {/* Reason Field */}
        <Block>
          <Block
            display="flex"
            alignItems="center"
            gridGap="scale200"
            marginBottom="scale300"
          >
            <FileText size={18} color={semantic.text} strokeWidth={2} />
            <LabelMedium marginTop={0} marginBottom={0}>
              Reason (Optional)
            </LabelMedium>
          </Block>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.currentTarget.value)}
            placeholder="Why are you rescheduling this session?"
            overrides={{
              Input: {
                style: {
                  minHeight: '100px',
                },
              },
            }}
          />
        </Block>
      </Block>
    </FTModal>
  );
};