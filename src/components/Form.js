import { useState } from "react";

import { useDispatch } from "react-redux";

import { addTodo } from "../redux/todos/todosSlice";

function Form() {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(addTodo({ title }));
    setTitle("");

    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
}

export default Form;
