import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import PrivateRoutes from "../pages/PrivateRoutes";
import PublicRoutes from "../pages/PublicRoutes";
import { useAuth } from "../contexts/AuthContext";

function App() {
  const user = useAuth()
  return (
    <div className="App">
      <Router>
        <Switch>
          <PublicRoutes component={Login} isAuthenticated={user?.isAuthenticated} path="/" exact />
          <PrivateRoutes component={Chat} isAuthenticated={user?.isAuthenticated} path="/chat" exact />
          <Route path="*" render={()=> {
            return (function NotFound(){
              return (
                <h3 style={{ textAlign: "center", paddingTop: "5rem" }}>
                  Sorry you need to <Link to="/">sign in</Link> first.
                </h3>
              );
            })()
          }}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
