import { ComponentMeta } from "@storybook/react";
import ToastContainer from "../ToastContainer";
import toast from "../../toast";

export default {
  title: "Toast/ToastContainer",
  component: ToastContainer,
  decorators: [
    (Story) => (
      <>
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-2xl">click!</div>
          <div className="flex gap-4 flex-wrap basis-1/3 w-[30rem]">
            <button
              className="bg-blue-600 w-36 h-12 p-3 rounded-lg text-white text-center"
              onClick={() => toast("Toast Content", { position: "top-left" })}
            >
              top-left
            </button>
            <button
              className="bg-blue-600 w-36 h-12 p-3 rounded-lg text-white text-center"
              onClick={() => toast("Toast Content", { position: "top-center" })}
            >
              top-center
            </button>
            <button
              className="bg-blue-600 w-36 h-12 p-3 rounded-lg text-white text-center"
              onClick={() => toast("Toast Content", { position: "top-right" })}
            >
              top-right
            </button>
            <button
              className="bg-blue-600 w-36 h-12 p-3 rounded-lg text-white text-center"
              onClick={() =>
                toast("Toast Content", { position: "bottom-left" })
              }
            >
              bottom-left
            </button>
            <button
              className="bg-blue-600 w-36 h-12 p-3 rounded-lg text-white text-center"
              onClick={() =>
                toast("Toast Content", { position: "bottom-center" })
              }
            >
              bottom-center
            </button>
            <button
              className="bg-blue-600 w-36 h-12 p-3 rounded-lg text-white text-center"
              onClick={() =>
                toast("Toast Content", { position: "bottom-right" })
              }
            >
              bottom-right
            </button>
          </div>
        </div>
        <Story />
      </>
    ),
  ],
} as ComponentMeta<typeof ToastContainer>;

const Template = () => <ToastContainer />;

export const Default = Template.bind({});
