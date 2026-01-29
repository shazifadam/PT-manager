import React from 'react';
import { Block } from 'baseui/block';
import { ParagraphMedium } from 'baseui/typography';
import { useStyletron } from 'baseui';
import { AlertCircle } from 'lucide-react';
import { FTModal, semantic } from '../../design-system';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  danger = false,
}) => {
  const [css, theme] = useStyletron();
  
  return (
    <FTModal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      primaryAction={{
        label: confirmText,
        onClick: onConfirm,
      }}
      secondaryAction={{
        label: cancelText,
        onClick: onCancel,
      }}
      overrides={{
        Dialog: {
          style: {
            borderRadius: '12px',
          },
        },
      }}
    >
      <Block display="flex" gridGap="scale600" alignItems="flex-start">
        <AlertCircle
          size={24}
          color={danger ? semantic.danger : semantic.warning}
          strokeWidth={2}
        />
        <ParagraphMedium
          marginTop={0}
          marginBottom={0}
          $style={{ lineHeight: '1.5' }}
        >
          {message}
        </ParagraphMedium>
      </Block>
    </FTModal>
  );
};
