
// comments.js - Handle fan comments
const db = firebase.firestore();
const commentForm = document.getElementById('commentForm');
if (commentForm) {
  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('commentName').value;
    const text = document.getElementById('commentText').value;
    await db.collection('comments').add({
      name,
      text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert('Comment posted!');
    commentForm.reset();
    loadComments();
  });
}

async function loadComments() {
  const container = document.getElementById('commentsSection');
  if (!container) return;
  const snapshot = await db.collection('comments').orderBy('timestamp', 'desc').get();
  container.innerHTML = '';
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.innerHTML = `<p><strong>${data.name}:</strong> ${data.text}</p>`;
    container.appendChild(div);
  });
}
