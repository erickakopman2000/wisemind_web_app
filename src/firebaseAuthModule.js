import firebase from "./firebase";

export const signup = (email, pass, notify_email_verification) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .then(() => {
      let user = firebase.auth().currentUser;

      //* Email verification
      if (user !== null && user.emailVerified === false)
        user.sendEmailVerification().then(() => notify_email_verification());
    })
    .catch((err) => console.log(err.code, err.message));
};

export const signin = async (
  email,
  pass,
  notify_signin_success,
  notify_signin_failure
) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .catch((err) => console.log(err.code, err.message));

  let user = firebase.auth().currentUser;
  // //  if (user !== null) console.log("Signed In", user.uid);
  user !== null ? notify_signin_success() : notify_signin_failure();
};

export const signout = (notify_signout_success) => {
  firebase
    .auth()
    .signOut()
    .then(
      () => notify_signout_success(),
      (err) => console.log("Sign out error", err)
    );
};
