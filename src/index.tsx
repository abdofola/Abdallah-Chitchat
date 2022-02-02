import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./component/App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./contexts/AuthContext";

//TODO: how many nested contexts we could have ???
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
