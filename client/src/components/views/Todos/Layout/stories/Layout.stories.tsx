import { ComponentMeta, ComponentStory } from "@storybook/react";
import Layout from "../Layout";

export default {
  title: "Todo/Layout",
  component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  leftSide: <div>leftSide</div>,
  top: <div>top</div>,
  bottom: <div>bottom</div>,
};
