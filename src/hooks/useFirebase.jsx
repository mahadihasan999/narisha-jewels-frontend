import initializeAuthentication from "config/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  getIdToken,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

//initialize firebase  authentication
initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const history = useHistory();
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState("");

  //on State Change
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [auth]);

  // observer user state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) => {
          setToken(idToken);
        });
      } else {
        setUser({});
      }
    });
    return () => unsubscribed;
  }, []);

  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    fetch("https://server-narisha.malihatabassum.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  useEffect(() => {
    fetch(`https://server-narisha.malihatabassum.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  //sign up functionality
  const signUpUser = (email, password, name, image) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        const newUser = { email, displayName: name };
        setUser(newUser);
        // save user to the database
        saveUser(email, name, "POST");

        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: image,
        }).then(() => {
          swal("Good job!", "Account has been created!", "success");
          history.push("/");
        });
      })
      .catch((err) => swal("Something went wrong!", `${err.message}`, "error"));
  };

  //sign in functionality
  const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        swal("Sign in Successful!", "Welcome back !", "success");
        history.push("/");
      })
      .catch((err) => swal("Something went wrong!", `${err.message}`, "error"));
  };

  //google sign in
  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;

        saveUser(user.email, user.displayName, "POST");
        swal("Good job!", "Account has been created!", "success");
        history.push("/");
      })
      .catch((err) => console.log(err.message));
  };

  // sign out
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        setUser({});
        swal("Logout Successful!", "You are logged out!", "success");
        // history.push("/");
      })
      .catch((err) => {
        swal("Something went wrong!", `${err.message}`, "error");
      });
  };

  return {
    user,
    admin,
    token,
    signUpUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
  };
};

export default useFirebase;
