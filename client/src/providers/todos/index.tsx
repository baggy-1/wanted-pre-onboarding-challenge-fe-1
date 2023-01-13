import { Todo } from "@/types/todos";
import React, { createContext, Dispatch, useContext, useReducer } from "react";

interface State {
  todos: Todo[];
}
const initialState: State = {
  todos: [],
};

const GET_TODOS = "GET_TODOS" as const;
const SET_TODOS = "SET_TODOS" as const;
const ADD_TODO = "ADD_TODO" as const;
const UPDATE_TODO = "UPDATE_TODO" as const;
const DELETE_TODO = "DELETE_TODO" as const;

const getTodos = () => ({
  type: GET_TODOS,
});

const setTodos = (todos: Todo[]) => ({
  type: SET_TODOS,
  payload: {
    todos,
  },
});

const addTodo = (todo: Todo) => ({
  type: ADD_TODO,
  payload: {
    todo,
  },
});

const updateTodo = (todo: Todo) => ({
  type: UPDATE_TODO,
  payload: {
    todo,
  },
});

const deleteTodo = (id: string) => ({
  type: DELETE_TODO,
  payload: {
    id,
  },
});

type Action = ReturnType<
  | typeof getTodos
  | typeof setTodos
  | typeof deleteTodo
  | typeof addTodo
  | typeof updateTodo
>;

type Reducer = (state: State, action: Action) => State;

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
      };
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload.todo],
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todo.id ? action.payload.todo : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    default:
      throw new Error();
  }
};

const TodosStateContext = createContext<State | null>(null);
const TodosDispatchContext = createContext<Dispatch<Action> | null>(null);

const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodosStateContext.Provider value={state}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosStateContext.Provider>
  );
};

export const useTodosState = () => {
  const todosState = useContext(TodosStateContext);
  if (!todosState) {
    throw new Error("404, TodosProvider not found");
  }
  return todosState;
};

export const useTodosDispatch = () => {
  const todosDispatch = useContext(TodosDispatchContext);
  if (!todosDispatch) {
    throw new Error("404, TodosProvider not found");
  }
  return todosDispatch;
};

export default TodosProvider;
