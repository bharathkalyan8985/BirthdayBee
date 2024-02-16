import React from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
const Signout = () => {
  return (
    <div>
      <button onClick={() => signOut(auth)}>sign out</button>
    </div>
  );
};

export default Signout;
