import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import TodoItem from "../TodoItem";

export default {
  title: "Todo/TodoItem",
  component: TodoItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof TodoItem>;

const Template: ComponentStory<typeof TodoItem> = (args) => (
  <TodoItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  item: {
    id: "todo-id-code",
    title: "Todo title",
    content: "Todo content",
    createdAt: "2023-01-29T00:00:00.000Z",
    updatedAt: "2023-01-30T00:00:00.000Z",
  },
};
