import React from "react";

export default function Profile({ match }) {
  console.log(match);
  return (
    <div className="ProfilePage">
      <h1>User id: {match.params.id}</h1>
    </div>
  );
}
