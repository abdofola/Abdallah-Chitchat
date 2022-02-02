import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import PrivateRoutes from "../pages/PrivateRoutes";
import PublicRoutes from "../pages/PublicRoutes";
import { useAuth } from "../contexts/AuthContext";
import PopupProvider from "../contexts/PopupContext";
import ThemeProvider from "../contexts/themeContext";
import NotFound from "../pages/NotFound";

function App() {
  const user = useAuth();

  return (
    <div className="App">
      <Router>
        <Switch>
          <PublicRoutes isAuthenticated={user?.isAuthenticated} path="/" exact>
            <Login />
          </PublicRoutes>
          <PrivateRoutes
            isAuthenticated={user?.isAuthenticated}
            path="/chat"
            exact
          >
            <ThemeProvider>
              <PopupProvider>
                <Chat />
              </PopupProvider>
            </ThemeProvider>
          </PrivateRoutes>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
