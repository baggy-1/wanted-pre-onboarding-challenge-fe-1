import Form from "@/components/common/Form";
import useTodoForm from "./hooks/useTodoForm";

const TodoFormContainer = () => {
  const { titleProps, contentProps, onSubmit } = useTodoForm();

  return (
    <Form
      className="flex flex-col items-center justify-center w-full h-full"
      onSubmit={onSubmit}
    >
      <div className="flex items-center justify-center w-full gap-4">
        <div className="flex flex-col w-full max-w-lg gap-4">
          <Form.Input label="제목" {...titleProps}></Form.Input>
          <Form.Input label="내용" {...contentProps}></Form.Input>
        </div>
        <Form.Button
          className="w-24 h-12 border rounded-md hover:bg-blue-500 hover:text-white"
          type="submit"
        >
          Todo 추가
        </Form.Button>
      </div>
    </Form>
  );
};

export default TodoFormContainer;
