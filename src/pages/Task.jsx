import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
function Task() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Học 2 bìa mới", completed: true },
        { id: 2, title: "Học 10 từ mới", completed: false },
        { id: 3, title: "Ôn tập từ vựng", completed: false },
    ]);

    const handleClaimReward = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: true } : task
            )
        );
    }

    return (
        <div style={styles.container}>
            <Sidebar />
            <div style={styles.content}>
                <h1 style={styles.title}>Nhiệm vụ</h1>
                <div style={styles.taskList}>
                    {tasks.map((task) => (
                        <div key={task.id} style={styles.taskItem}>
                            <div>
                                <h3 style={styles.taskTitle}>{task.title}</h3>
                                <p style={{ color: task.completed ? "green" : "gray" }}>
                                    {task.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
                                </p>
                            </div>
                            {!task.completed && (
                            <button
                                style={styles.button}
                                onClick={() => handleClaimReward(task.id)}
                            >
                                Nhận thưởng
                            </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
const styles = {
    container: {
        display: "flex",
        height: "100vh",
    },
    content: {
        width: "400px",
        flex:1,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        marginLeft: "240px",
    },
    title: {
        textAlign: "center",
        marginBottom: "30px",
        color: "#58cc02",
    },
    taskList: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    taskItem: {
        backgroundColor: "#f0fff0",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "transform 0.3s",
    },
    taskItemHover: {
        transform: "scale(1.05)",
    },
    taskTitle: {
        marginBottom: "10px",
        fontWeight: "bold",
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#58cc02",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    buttonHover: {
        backgroundColor: "#45a02d",
    },
  };
  
export default Task;