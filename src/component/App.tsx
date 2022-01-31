import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import ErrorBoundary from "./ErrorBoundary";

function App() {

  return (
    <div className="App" >
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/chat">
            <ErrorBoundary>
              <Chat />
            </ErrorBoundary>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
