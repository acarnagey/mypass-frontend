import * as React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.scss';

render(
    <App />,
    document.getElementById('root')
);

//
// // document.addEventListener('DOMContentLoaded', () => {
// //     render(<App />, document.getElementById('root'));
// // });
//
// // import * as React from "react";
// import * as ReactDOM from "react-dom";
//
// import { Hello } from "./components/Hello";
//
// ReactDOM.render(
//     <Hello compiler="TypeScript" framework="React" />,
//     document.getElementById("example")
// );

// import * as React from "react";
// import * as ReactDOM from "react-dom";
//
// import { Hello } from "./components/Hello";
//
// ReactDOM.render(
//     <Hello compiler="TypeScript" framework="React" />,
//     document.getElementById("root")
// );
