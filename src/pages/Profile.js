import React, { useEffect, useState } from "react";
import firebase from "../firebase";

export default function Profile({ match }) {
  const [usr, setUsr] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(match.params.id)
      .get()
      .then((res) => console.log(res.data()));
  }, []);

  console.log(usr);

  return (
    <div className="ProfilePage">
      <h1>User id: {match.params.id}</h1>
    </div>
  );
}
