import React, { useState } from "react";

const toDoList = () => {
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
			<button className="button" onClick={handleAddItem}>
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
									className="fas fa-minus-circle right"
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
							className="button"
							onClick={() => setListItems([])}>
							Delete all tasks
						</button>
					</p>
				) : null}
			</div>
		</>
	);
};

export default toDoList;
