import React, { useState, useEffect } from "react";

const ClassToDo = () => {
	let [listItems, setListItems] = useState([]);
	let [task, setTask] = useState("");

	const handleAddItem = () => {
		setListItems([...listItems, task]);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(newTask);
		// setNewTask("");
		handleAddItem({
			done: false,
			id: (+new Date()).toString(),
			task,
		});
	};

	const onClickRemoveTask = (indexToDelete) => {
		console.log(indexToDelete);
		listItems.splice(indexToDelete, 1);
		setListItems(listItems);
		console.log(listItems);

		// listItems.filter((_, index) => {
		//console.log("Index", index);
		//console.log("itemToDelete", indexToDelete);
		// 	// console.log(index);
		// 	// console.log(listItems);
		// 	//console.log("one at the time");
		// 	index !== indexToDelete;
		//console.log(updateListItems);
		//setListItems(updateListItems);
	};
	// const checkItem = listItems.map((task) => (
	// 	// <CheckBox key={task.id} data={task} onChange={onChangeStatus} />
	// 	<button className="button green">X</button>
	// ));
	return (
		<>
			<input
				type="text"
				className="text"
				value={task}
				onChange={(e) => setTask(e.target.value)}
			/>
			<button className="button" onClick={handleAddItem}>
				Add
			</button>
			<div className="todo-list">
				{listItems.map((item, index) => {
					return (
						<div key={index}>
							<p>{item}</p>
							<button onClick={() => onClickRemoveTask(index)}>
								X
							</button>
						</div>
					);
				})}
				{listItems.length ? (
					<p>
						<button className="button" onClick={onClickRemoveTask}>
							Delete all tasks
						</button>
					</p>
				) : null}
			</div>
		</>
	);
};

export default ClassToDo;
