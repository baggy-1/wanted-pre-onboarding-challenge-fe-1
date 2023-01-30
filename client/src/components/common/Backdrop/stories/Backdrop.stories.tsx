import { ComponentMeta, ComponentStory } from "@storybook/react";
import Backdrop from "../Backdrop";

export default {
  title: "Backdrop/Backdrop",
  component: Backdrop,
} as ComponentMeta<typeof Backdrop>;

export const Default: ComponentStory<typeof Backdrop> = (args) => (
  <Backdrop {...args} />
);
