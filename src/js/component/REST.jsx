import React, { useState, useEffect } from "react";

const Rest = () => {
	let [task, setTask] = useState({ label: "", done: false, id: "" });
	let [listItems, setListItems] = useState([]);
	console.log("get", listItems);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alex", {
			method: "GET",
		}).then((response) => {
			console.log(response.status);
			if (response.status == 404) {
				createUser("alex");
			} else {
				getTodos();
			}
		});
	}, []);
	// pq ponemos fetch en useEffect??///
	useEffect(() => {
		console.log(listItems);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alex", {
			method: "PUT",
			body: JSON.stringify(listItems), // data can be a `string` or  an {object}
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then((response) => console.log("Success:", response))
			.catch((error) => console.error(error));
	}, [listItems]);

	const getTodos = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alex", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((json) => {
				setListItems(json);
			});
	};
	const onClickRemoveTask = (indexToDelete) => {
		let auxItems = listItems;
		console.log("aux:", auxItems);
		auxItems = auxItems.filter((x, y) => y != indexToDelete);
		console.log("auxfilter:", auxItems);
		setListItems(auxItems);
	};

	const handleAddItem = () => {
		console.log(task);
		if (task.label != "") {
			setListItems([...listItems, task]);
			setTask({ label: "", done: false, id: "" });
		} else {
			alert("La tarea no puede estar en blanco");
		}
	};
	const createUser = (user) => {
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify([]),
		})
			.then((response) => response.json())
			.then(() => getTodos());
	};

	// useEffect(() => {
	// 	getTodos();
	// }, []);

	const onClickRemoveAll = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alex", {
			method: "PUT",
			body: JSON.stringify([{ label: "sample task", done: false }]),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(() => getTodos())
			.catch((error) => console.error(error));
	};

	return (
		<>
			<input
				type="text"
				className="text"
				value={task.label}
				onKeyUp={(e) => {
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
			<ul className="todo-list">
				{listItems.map((item, index) => {
					if (item.id == "") {
						return (
							<li key={index}>
								<p>{item.label}</p>
								<button>
									{" "}
									<i
										className="fas fa-minus-circle right"
										onClick={() =>
											onClickRemoveTask(index)
										}></i>
								</button>
							</li>
						);
					}
				})}
				{listItems.length ? (
					<p>
						<button
							className="button"
							onClick={() => onClickRemoveAll([])}>
							Delete all tasks
						</button>
					</p>
				) : null}
			</ul>
		</>
	);
};

export default Rest;
