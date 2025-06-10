
const firebaseConfig = {
  apiKey: "AIzaSyD9ytYejDuuJg2oGJdKHyjhmK3sC98Djkg",
  authDomain: "kdot-distribution.firebaseapp.com",
  projectId: "kdot-distribution",
  storageBucket: "kdot-distribution.appspot.com",
  messagingSenderId: "664065044961",
  appId: "1:664065044961:web:0a718f62142774f48922a0"
};
firebase.initializeApp(firebaseConfig);

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Logged in!");
      window.location.href = "admin.html";
    })
    .catch(error => {
      alert(error.message);
    });
});
