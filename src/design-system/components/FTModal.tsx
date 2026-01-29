import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton, SIZE, ROLE } from 'baseui/modal';

interface FTModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'default' | 'full' | 'auto';
  role?: 'dialog' | 'alertdialog';
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  overrides?: any;
}

export const FTModal: React.FC<FTModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'default',
  role = 'dialog',
  primaryAction,
  secondaryAction,
  overrides = {},
}) => {
  const getSize = () => {
    switch (size) {
      case 'full': return SIZE.full;
      case 'auto': return SIZE.auto;
      default: return SIZE.default;
    }
  };

  const getRole = () => {
    switch (role) {
      case 'alertdialog': return ROLE.alertdialog;
      default: return ROLE.dialog;
    }
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      animate
      autoFocus
      size={getSize()}
      role={getRole()}
      overrides={{
        Dialog: {
          style: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
          },
        },
        ...overrides,
      }}
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      {(primaryAction || secondaryAction) && (
        <ModalFooter>
          {secondaryAction && (
            <ModalButton kind="tertiary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </ModalButton>
          )}
          {primaryAction && (
            <ModalButton onClick={primaryAction.onClick}>
              {primaryAction.label}
            </ModalButton>
          )}
        </ModalFooter>
      )}
    </Modal>
  );
};