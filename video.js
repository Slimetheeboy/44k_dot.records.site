
// video.js - Admin posts YouTube links for fans to watch
const videoForm = document.getElementById('videoForm');
if (videoForm) {
  videoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('videoTitle').value;
    const link = document.getElementById('videoLink').value;
    await firebase.firestore().collection('videos').add({
      title,
      link,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert('Video posted!');
    videoForm.reset();
    loadVideos();
  });
}

async function loadVideos() {
  const container = document.getElementById('videosSection');
  if (!container) return;
  const snapshot = await firebase.firestore().collection('videos').orderBy('timestamp', 'desc').get();
  container.innerHTML = '';
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.innerHTML = `<h4>${data.title}</h4><iframe width="100%" height="315" src="${data.link}" frameborder="0" allowfullscreen></iframe>`;
    container.appendChild(div);
  });
}
