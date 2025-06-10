
// contact.js - Handle contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    await firebase.firestore().collection('contacts').add({
      name,
      email,
      message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert('Message sent!');
    contactForm.reset();
  });
}
