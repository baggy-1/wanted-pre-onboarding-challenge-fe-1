import { ComponentMeta, ComponentStory } from "@storybook/react";
import Backdrop from "../Backdrop";

export default {
  title: "Backdrop/Backdrop",
  component: Backdrop,
  argTypes: {
    opacity: {
      control: {
        type: "radio",
        options: ["none", "low", "medium", "high"],
      },
    },
  },
} as ComponentMeta<typeof Backdrop>;

export const Default: ComponentStory<typeof Backdrop> = (args) => (
  <Backdrop {...args} />
);
