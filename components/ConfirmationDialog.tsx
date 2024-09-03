import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export const ConfirmationDialog = () => {
  return (
    <View>
      <Portal>
        <Dialog visible={true} onDismiss={() => {}}>
          <Dialog.Title>Confirmation</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this item?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button>Cancel</Button>
            <Button>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
