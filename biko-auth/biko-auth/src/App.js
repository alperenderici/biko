import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { auth } from "./firebase/firebase";
import LoginScreen from "./pages/LoginScreen";
import MachineListScreen from "./pages/MachineListScreen";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <Router>
      <div className="App">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {!user ? (
              <Route path="/" exact>
                <LoginScreen />
              </Route>
            ) : (
              <>
                <Route path="/" exact>
                  <Redirect to="/machines" />
                </Route>
                <Route path="/machines">
                  <MachineListScreen />
                </Route>
              </>
            )}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
