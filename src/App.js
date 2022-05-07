import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { TodoCard } from "./components/TodoCard";
import { decrement, increment } from "./features/counterSlice";
import {
    addNewTodo,
    getAllTodos,
    selectAllTodos,
    selectTodoIds,
} from "./features/todos/todoSlice";

function App() {
    const todoIds = useSelector(selectTodoIds);

    const [c, setC] = useState(0);

    useMemo(() => {
        console.log("memo");
        setC((prev) => (prev += 1));
        console.log(c);
    }, [todoIds]);

    useEffect(() => {
        console.log("use effect", c);
    }, [c]);

    useEffect(() => {
        console.log(todoIds);
    }, [todoIds]);
    // useEffect(() => {
    //     console.log(todos);
    // }, [todos]);

    const [newTodo, setNewTodo] = useState("");

    const input = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getAllTodos(""));
    }, []);

    const addTodo = (e) => {
        // e.preventDefault();
        if (input.current?.value?.length) {
            setNewTodo("");
            dispatch(addNewTodo(newTodo));
            input.current.focus();
        }
    };

    return (
        <div className="container">
            <Navbar />
            <div className="todos-container">
                {todoIds?.length ? (
                    todoIds?.map((todo) => (
                        <TodoCard
                            key={todo}
                            id={todo}
                            // title={todo?.title}
                            // completed={todo?.completed}
                            // onFire={todo?.onFire}
                        />
                    ))
                ) : (
                    <h3>Not todos</h3>
                )}
            </div>

            <div className="input-box">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="input"
                    placeholder="Enter your todo :)"
                    ref={input}
                />
                <button className="btn" onClick={addTodo}>
                    Add
                </button>
            </div>
        </div>
    );
}

export default App;
