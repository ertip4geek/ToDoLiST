//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
// import 'react-native-get-random-values'

// include your styles into the webpack bundle
import "../styles/index.css";
import "../styles/indicator.css";

//import your own components
import Home from "./component/home.jsx";

//render your react application
ReactDOM.render(<Home />, document.querySelector("#app"));
