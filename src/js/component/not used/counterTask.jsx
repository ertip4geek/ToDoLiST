import React from "react";

const counterTask = (props) => {
	return (
		<div className="header">
			<h3>
				{`You have  
            ${props.item}  
            ${props.item === 1 ? " task" : " tasks"}`}
			</h3>
		</div>
	);
};

export default counterTask;
