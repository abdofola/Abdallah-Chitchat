import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../pages/LoginPage";
import Signup from "../pages/SignupPage";
import Chat from "../pages/Chat";
import PrivateRoutes from "../pages/PrivateRoutes";
import PublicRoutes from "../pages/PublicRoutes";
import { useAuth } from "../features/contexts/AuthContext";
import PopupProvider from "../features/contexts/PopupContext";
import ThemeProvider from "../features/contexts/themeContext";
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
          <PublicRoutes
            path="/signup"
            isAuthenticated={user?.isAuthenticated}
          >
            <Signup />
          </PublicRoutes>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
