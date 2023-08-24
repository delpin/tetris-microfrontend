import React from "react";
import ReactDOM from "react-dom";
import Test from 'react/Test';

import "./index.scss";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: home</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>
    <Test />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
