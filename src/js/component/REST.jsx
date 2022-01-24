import React, { useState, useEffect } from "react";
// import createGuid from "react-native-create-guid";

const Rest = () => {
	let [task, setTask] = useState({ label: "", done: false, id: "" });
	let [listItems, setListItems] = useState([]);
	console.log("get", listItems);

	const onClickRemoveTask = (indexToDelete) => {
		let auxItems = listItems;
		console.log("aux:", auxItems);
		auxItems = auxItems.filter((x, y) => y != indexToDelete);
		console.log("auxfilter:", auxItems);
		setListItems(auxItems);
	};
	// pq ponemos fetch en useEffect??///
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

	const handleAddItem = () => {
		setListItems([...listItems, task]);
	};

	useEffect(() => {
		getTodos();
	}, []);

	const onClickRemoveAll = () => {
		setListItems([]);
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
			<ul className="todo-list">
				{listItems.map((item, index) => {
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
