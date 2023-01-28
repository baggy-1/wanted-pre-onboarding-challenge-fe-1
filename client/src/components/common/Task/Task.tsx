interface Props {
  task: {
    id: string;
    title: string;
    state: string;
  };
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
}

const Task = ({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}: Props) => {
  return (
    <div className="bg-white flex">
      <label className="">
        <input
          type="checkbox"
          defaultChecked={state === "TASK_ARCHIVED"}
          disabled={true}
          name="checked"
        />
        <span
          onClick={() => onArchiveTask(id)}
          id={`ac-${id}`}
          aria-label={`ac-${id}`}
        />
      </label>
      <div>
        <input
          type="text"
          value={title}
          readOnly={true}
          placeholder="Input title"
        />
      </div>

      <div onClick={(event) => event.stopPropagation()}>
        {state !== "TASK_ARCHIVED" && (
          <a onClick={() => onPinTask(id)}>
            <span id={`pt-${id}`} aria-label={`pc-${id}`} />
          </a>
        )}
      </div>
    </div>
  );
};

export default Task;
