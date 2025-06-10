
const firebaseConfig = {
  apiKey: "AIzaSyD9ytYejDuuJg2oGJdKHyjhmK3sC98Djkg",
  authDomain: "kdot-distribution.firebaseapp.com",
  projectId: "kdot-distribution",
  storageBucket: "kdot-distribution.appspot.com",
  messagingSenderId: "664065044961",
  appId: "1:664065044961:web:0a718f62142774f48922a0"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

function loadTracks() {
  const trackList = document.getElementById("track-list");
  db.collection("tracks").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    trackList.innerHTML = "";
    snapshot.forEach(doc => {
      const track = doc.data();
      const card = document.createElement("div");
      card.className = "track-card";
      card.innerHTML = `
        <h3>${track.title} - ${track.artist}</h3>
        <img src="${track.cover}" width="100%">
        <audio controls src="${track.audio}"></audio>
        ${track.video ? `<video controls width="300" src="${track.video}"></video>` : ""}
        <p>❤️ ${track.likes || 0} <button onclick="likeTrack('${doc.id}')">Like</button></p>
        <div>
          <textarea id="comment-${doc.id}" placeholder="Leave a comment..."></textarea>
          <button onclick="postComment('${doc.id}')">Post</button>
          <div id="comments-${doc.id}"></div>
        </div>
      `;
      trackList.appendChild(card);
      loadComments(doc.id);
    });
  });
}

function likeTrack(id) {
  const ref = db.collection("tracks").doc(id);
  ref.update({ likes: firebase.firestore.FieldValue.increment(1) });
}

function postComment(trackId) {
  const commentBox = document.getElementById("comment-" + trackId);
  const text = commentBox.value.trim();
  if (text) {
    db.collection("tracks").doc(trackId).collection("comments").add({
      text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    commentBox.value = "";
  }
}

function loadComments(trackId) {
  const container = document.getElementById("comments-" + trackId);
  db.collection("tracks").doc(trackId).collection("comments").orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      container.innerHTML = "";
      snapshot.forEach(doc => {
        const comment = doc.data();
        const div = document.createElement("div");
        div.textContent = "💬 " + comment.text;
        container.appendChild(div);
      });
    });
}

window.onload = loadTracks;
