import React, { useState } from "react";
import propTypes from "prop-types";

const toDoList = (props) => {
	let [listItems, setListItems] = useState([]);
	let [task, setTask] = useState("");

	const handleAddItem = () => {
		setListItems([...listItems, task]);
		setTask("");
	};
	// SIN USAR
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	// console.log(newTask);
	// 	// setNewTask("");
	// 	handleAddItem({
	// 		done: false,
	// 		id: (+new Date()).toString(),
	// 		task,
	// 	});
	// };

	const onClickRemoveTask = (indexToDelete) => {
		setListItems(listItems.filter((x, y) => y != indexToDelete));
	};
	return (
		<>
			<input
				type="text"
				className="text"
				value={task}
				onKeyPress={(e) => {
					if (e.key == "Enter") {
						handleAddItem();
					}
				}}
				onChange={(e) => {
					setTask(e.target.value);
				}}
			/>
			<button
				type="button"
				className="btn btn-success"
				onClick={handleAddItem}>
				Add
			</button>
			<div className="todo-list">
				{listItems.map((item, index) => {
					return (
						<div key={index}>
							<p>{item}</p>
							<button>
								{" "}
								<i
									className="far fa-window-close"
									onClick={() =>
										onClickRemoveTask(index)
									}></i>
							</button>
						</div>
					);
				})}
				{listItems.length ? (
					<p>
						<button
							type="button"
							className="btn btn-info"
							onClick={() => setListItems([])}>
							Delete all tasks
						</button>
					</p>
				) : null}

				{/* // Counter
				<div className="header">
					<h3>
						{`You have  
					${props.item}  
					${props.item === 1 ? " task" : " tasks"}`}
					</h3>
				</div> */}
			</div>
		</>
	);
};

/// TESTING API FETCH
// fetch("https://assets.breatheco.de/apis/fake/todos/user/alex", requestOptions)
// 	.then((response) => response.text())
// 	.then((result) => console.log(result))
// 	.catch((error) => console.log("error", error));

// let myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// let raw = JSON.stringify([]);

// let requestOptions = {
// 	method: "GET",
// 	headers: myHeaders,
// 	body: raw,
// 	redirect: "follow",
// };
// COUNTER Props
// toDoList.propTypes = {
// 	item: propTypes.number,
// };
export default toDoList;
