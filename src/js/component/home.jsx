import React, { useState } from "react";
import AddNewTask from "./addtask.jsx";
import ToDoList from "./todolist.jsx";
import ClassToDo from "./class-to-do.jsx";

//create your first component
const Home = () => {
	return (
		<>
			<ClassToDo />
		</>
	);
};

export default Home;
