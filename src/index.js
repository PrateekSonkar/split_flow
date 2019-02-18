import React from "react";
import ReactDOM from "react-dom";
import CustomCheckList from "./listWithChekbox";

import "./styles.css";

function App() {
  return (
    <React.Fragment>
      <CustomCheckList />
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
