document.addEventListener('DOMContentLoaded', () => {
    // Placeholder for JavaScript functionality
});

function openContactForm() {
    document.getElementById('contact-form').classList.remove('hidden');
}

function closeContactForm() {
    document.getElementById('contact-form').classList.add('hidden');
}

function sendMessage(event) {
    event.preventDefault();

    const form = event.target;
    const chatSection = document.getElementById('chat-section');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const messageContent = document.getElementById('message').value;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'received');
    userMessage.innerHTML = `<p>Name: ${name}<br>Email: ${email}<br>Message: ${messageContent}</p>`;

    const userTime = document.createElement('span');
    userTime.classList.add('time');
    userTime.textContent = time;

    const devMessage = document.createElement('div');
    devMessage.classList.add('message', 'sent');
    devMessage.textContent = `Thank you, ${name}! We received your message and will contact you soon at ${email}.`;

    const devTime = document.createElement('span');
    devTime.classList.add('time');
    devTime.textContent = time;

    chatSection.appendChild(userMessage);
    chatSection.appendChild(userTime);
    chatSection.appendChild(devMessage);
    chatSection.appendChild(devTime);

    chatSection.scrollTop = chatSection.scrollHeight; // Scroll to the bottom
    
    closeContactForm();
    const formData = new FormData(form);
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(formData).toString()
				}).then(() => {
						console.log('Form successfully submitted');
				}).catch((error) => {
						console.error('Error submitting form:', error);
				});
}
