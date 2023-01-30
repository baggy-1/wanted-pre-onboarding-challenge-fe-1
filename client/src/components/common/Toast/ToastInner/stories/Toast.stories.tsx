import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getIcon } from "../../ToastContainer/utils";
import { Options, TypeOptions } from "../../types";
import ToastInner from "../ToastInner";

export default {
  title: "Toast/ToastInner",
  component: ToastInner,
} as ComponentMeta<typeof ToastInner>;

const Template: ComponentStory<typeof ToastInner> = (args) => (
  <ToastInner {...args} />
);

const type: Record<TypeOptions, TypeOptions> = {
  default: "default",
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};

const getOptions = (typeOption: TypeOptions): Options => {
  return {
    type: type[typeOption],
    toastId: `toastId-${typeOption}`,
    position: "top-right",
  };
};

export const Default = Template.bind({});
Default.args = {
  children: "Toast Content",
  type: "default",
  iconOut: getIcon(getOptions(type.default)),
};

export const Success = Template.bind({});
Success.args = {
  children: "Toast Content",
  type: "success",
  iconOut: getIcon(getOptions(type.success)),
};

export const Error = Template.bind({});
Error.args = {
  children: "Toast Content",
  type: "error",
  iconOut: getIcon(getOptions(type.error)),
};

export const Warning = Template.bind({});
Warning.args = {
  children: "Toast Content",
  type: "warning",
  iconOut: getIcon(getOptions(type.warning)),
};

export const Info = Template.bind({});
Info.args = {
  children: "Toast Content",
  type: "info",
  iconOut: getIcon(getOptions(type.info)),
};
