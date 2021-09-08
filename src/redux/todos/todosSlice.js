import { createSlice } from "@reduxjs/toolkit";

import alertify from "alertifyjs";

import { nanoid } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      { id: "1", title: "Learn JavaScript", completed: true },
      { id: "2", title: "Learn React", completed: true },
      { id: "3", title: "Learn Redux", completed: false },
    ],
    activeFilter: "all",
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        if (action.payload.title === "") {
          alertify.error("Error! Title cannot be empty.", 2);
        } else {
          state.items.push(action.payload);
          alertify.success("To-do added !", 2);
        }
      },
      prepare: ({ title }) => {
        return {
          payload: {
            id: nanoid(),
            completed: false,
            title,
          },
        };
      },
    },
    toggle: (state, action) => {
      const { id } = action.payload;
      const selectItem = state.items.find((item) => item.id === id);
      selectItem.completed = !selectItem.completed;
      if (selectItem.completed === false) {
        alertify.error("Completed undone !", 2);
      } else {
        alertify.success("To-do completed !", 2);
      }
    },
    destroy: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
      alertify.error("To-do deleted !", 2);
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
      alertify.success("Completed to-do's have been deleted!", 2);
    },
  },
});

export const selectTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter((item) =>
    state.todos.activeFilter === "active"
      ? item.completed === false
      : item.completed === true
  );
};

export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;
