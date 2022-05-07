import React, { useEffect } from "react";
import "./todoCard.css";
import { FiTrash } from "react-icons/fi";
import { AiFillFire } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
    addFire,
    removeTodo,
    selectById,
    selectTodoById,
} from "../features/todos/todoSlice";

export const TodoCard = ({ id }) => {
    const todo = useSelector((state) => selectTodoById(state, id));
    // const testById = useSelector((state) => selectById(state, id));

    const dispatch = useDispatch();

    const removeCurrentTodo = () => {
        dispatch(removeTodo(id));
    };

    const addMoreFire = () => {
        dispatch(addFire(id));
    };

    return (
        <div className="todo">
            <h4>{todo.title}</h4>

            <div className="action-container">
                <div
                    onClick={addMoreFire}
                    className={`onFireAction icons ${
                        todo.onFire > 0 ? "onFire" : "notOnFire"
                    }`}
                >
                    {todo.onFire > 0 ? todo.onFire : <AiFillFire />}
                </div>
                <FiTrash className="icons" onClick={removeCurrentTodo} />
            </div>
        </div>
    );
};
