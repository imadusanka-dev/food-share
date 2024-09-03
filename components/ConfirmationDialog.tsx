import React from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
  title: string;
  content: string;
  primaryLabel: string;
  secondaryLabel: string;
}

export const ConfirmationDialog = ({
  visible,
  onConfirm,
  onDismiss,
  title,
  content,
  primaryLabel,
  secondaryLabel,
}: Props) => {
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{content}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onDismiss}>{secondaryLabel}</Button>
            <Button onPress={onConfirm}>{primaryLabel}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
