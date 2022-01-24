import React, { useState, useEffect } from "react";
// import { shortid } from "shortid";
import { nanoid } from "nanoid";

const Rest = () => {
	let [task, setTask] = useState({ label: "", done: false, id: "" });
	let [listItems, setListItems] = useState([]);

	const createUsers = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alex", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify([]),
		}).then((response) => response.json());
	};

	const getTodos = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alex", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((json) => {
				json.msg ? createUsers() : setListItems(json);
			});
	};
	///	// ??? async (e)??
	const handleAddItem = async () => {
		setListItems([...listItems, task]);
		setTask("");
		try {
			const request = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/alex",
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newList),
				}
			);
			const response = await request.json();
			console.log("response", response);
		} catch (error) {
			console.log(error);
		}
		setTask({ label: "" });
	};

	const onClickRemoveTask = (indexToDelete) => {
		setListItems(listItems.filter((x, y) => y != indexToDelete));
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alex", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(arrayNew),
			//arrayNew not defined
		})
			.then((response) => response.json())
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		createUsers();
		getTodos();
	}, []);

	const onClickRemoveAll = () => {
		setList([]);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alex", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	};

	return (
		<>
			<input
				type="text"
				className="text"
				value={task.label}
				onKeyPress={(e) => {
					if (e.key == "Enter") {
						handleAddItem();
					}
				}}
				onChange={(e) => {
					setTask({
						label: e.target.value,
						done: false,
						id: "",
					});
				}}
			/>
			<button className="button" onClick={handleAddItem}>
				Add
			</button>
			<div className="todo-list">
				{listItems.map((item, index) => {
					return (
						<div key={index.id}>
							<p>{item.label}</p>
							<button>
								{" "}
								<i
									className="fas fa-minus-circle right"
									onClick={() =>
										onClickRemoveTask(index.id)
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

export default Rest;
