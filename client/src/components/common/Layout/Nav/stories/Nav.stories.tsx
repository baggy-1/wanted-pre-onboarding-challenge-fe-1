import { ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "@/providers/auth";
import Nav from "../Nav";

export default {
  title: "Nav/Nav",
  component: Nav,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider>
          <Story />
        </AuthProvider>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Nav>;

const Template = () => <Nav />;

export const Default = Template.bind({});
