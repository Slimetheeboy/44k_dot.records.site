
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

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const artist = document.getElementById("artist").value;
  const audioFile = document.getElementById("audioFile").files[0];
  const coverImage = document.getElementById("coverImage").files[0];
  const videoFile = document.getElementById("videoFile").files[0];

  const audioRef = storage.ref('tracks/' + audioFile.name);
  const coverRef = storage.ref('covers/' + coverImage.name);
  const videoRef = videoFile ? storage.ref('videos/' + videoFile.name) : null;

  await audioRef.put(audioFile);
  await coverRef.put(coverImage);
  const audioURL = await audioRef.getDownloadURL();
  const coverURL = await coverRef.getDownloadURL();
  let videoURL = "";
  if (videoRef) {
    await videoRef.put(videoFile);
    videoURL = await videoRef.getDownloadURL();
  }

  await db.collection("tracks").add({
    title,
    artist,
    audio: audioURL,
    cover: coverURL,
    video: videoURL,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    likes: 0
  });

  alert("Track and post uploaded!");
});
