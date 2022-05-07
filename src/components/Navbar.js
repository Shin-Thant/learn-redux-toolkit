import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Navbar.css";

export const Navbar = () => {
    const { todos } = useSelector((state) => state.todos);

    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(todos?.length ?? 0);
    }, [todos, todos?.length]);

    const increaseCount = () => {
        setCount((prev) => prev + 1);
    };

    return (
        <div className="navbar-container">
            <h2>Todos</h2>
            <div className="count" onClick={increaseCount}>
                {count}
            </div>
        </div>
    );
};
