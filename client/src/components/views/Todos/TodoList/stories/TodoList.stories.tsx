import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { TodoList } from "../TodoList";

export default {
  title: "Todo/TodoList",
  component: TodoList,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof TodoList>;

export const Default: ComponentStory<typeof TodoList> = (args) => (
  <TodoList {...args} />
);
Default.args = {
  todos: [
    {
      id: "todo-1",
      title: "Todo 1 title",
      content: "Todo 1 Content",
      createdAt: "2023-01-29T00:00:00.000Z",
      updatedAt: "2023-01-30T00:00:00.000Z",
    },
    {
      id: "todo-2",
      title: "Todo 2 title",
      content: "Todo 2 Content",
      createdAt: "2023-01-29T00:00:00.000Z",
      updatedAt: "2023-01-30T00:00:00.000Z",
    },
    {
      id: "todo-3",
      title: "Todo 3 title",
      content: "Todo 3 Content",
      createdAt: "2023-01-29T00:00:00.000Z",
      updatedAt: "2023-01-30T00:00:00.000Z",
    },
    {
      id: "todo-4",
      title: "Todo 4 title",
      content: "Todo 4 Content",
      createdAt: "2023-01-29T00:00:00.000Z",
      updatedAt: "2023-01-30T00:00:00.000Z",
    },
    {
      id: "todo-5",
      title: "Todo 5 title",
      content: "Todo 5 Content",
      createdAt: "2023-01-29T00:00:00.000Z",
      updatedAt: "2023-01-30T00:00:00.000Z",
    },
  ],
};

export const Empty: ComponentStory<typeof TodoList> = (args) => (
  <TodoList {...args} />
);
Empty.args = {
  todos: [],
};
