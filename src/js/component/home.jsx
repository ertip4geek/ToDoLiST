import React from "react";
import CounterTask from "./counterTask.jsx";
import ToDoList from "./toDoList.jsx";

//create your first component
const Home = () => {
	return (
		<>
			<ToDoList />
			<CounterTask />
		</>
	);
};

export default Home;
