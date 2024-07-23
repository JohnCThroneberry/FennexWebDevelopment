document.addEventListener('DOMContentLoaded', () => {
    // Matrix effect
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = ['<', '>', '/', 'a', 'p', 'div', 'h1', 'h2', 'span', 'body', 'html', 'head', 'title', 'meta', 
    '{', '}', ':', ';', 'color', 'background', 'font-size', 'width', 'height', 'margin', 'padding', 
    'function', 'var', 'let', 'const', 'if', 'else', 'for', 'while', 'return', 'console.log', '=>'];
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(229, 221, 213, 0.05)';  // Slightly transparent background to create a fading effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(150, 150, 150, 0.2)'; // Slightly darker color than the background
        ctx.font = fontSize + 'px monospace';

        drops.forEach((y, x) => {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, x * fontSize, y * fontSize);

            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                drops[x] = 0;
            }
            drops[x]++;
        });
    }

    setInterval(draw, 50);

    // Existing JavaScript functionality
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
        userMessage.innerHTML = `<p>Name: ${name}<br>Email: ${email}<br>Additional Information: ${messageContent}</p>`;

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

    document.getElementById('contact-form-element').addEventListener('submit', sendMessage);
    document.querySelector('.input-container').addEventListener('click', openContactForm);
});
document.addEventListener('DOMContentLoaded', function() {
    const messages = document.querySelectorAll('.message.received, .message.sent');
    const timestampElements = document.querySelectorAll('.time[data-timestamp]');

    // Initialize timestamp increment (e.g., starting from page load time)
    let currentTime = new Date();

    // Update existing message timestamps
    timestampElements.forEach((timestampElement, index) => {
        // Calculate timestamp for each message
        let messageTime = new Date(currentTime);
        messageTime.setMinutes(messageTime.getMinutes() - (messages.length - index - 1)); // Adjust timestamp for each message

        // Format timestamp as HH:mm AM/PM
        let formattedTime = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Update timestamp content
        timestampElement.textContent = formattedTime;
    });
});
