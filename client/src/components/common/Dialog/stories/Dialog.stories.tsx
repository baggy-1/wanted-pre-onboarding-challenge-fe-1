import { ComponentMeta, ComponentStory } from "@storybook/react";
import Dialog from "../Dialog";

export default {
  title: "Dialog/Dialog",
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

export const Default: ComponentStory<typeof Dialog> = (args) => {
  const props = {
    ...args,
    isOpen: true,
  };

  return (
    <Dialog {...props}>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Content>Dialog Content</Dialog.Content>
      <Dialog.Actions>
        <Dialog.Button>Cancel</Dialog.Button>
        <Dialog.Button>Ok</Dialog.Button>
      </Dialog.Actions>
    </Dialog>
  );
};
