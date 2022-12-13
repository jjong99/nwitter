import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj(user);
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        if(user.displayName === null){
          const name = user.email.split("@")[0];
          user.updateProfile({displayName:name});
        }
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? 
        <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
     
  );
}

export default App;
