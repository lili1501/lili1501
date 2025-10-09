// script
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.querySelector('.hamburger').classList.remove('open');
            }
        });
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Chatbot functionality
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotBody = document.getElementById('chatbot-body');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const menuOptions = document.querySelectorAll('.menu-option');

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('open');
        if (chatbotWindow.classList.contains('open')) {
            userInput.focus();
            userInput.disabled = false;
            sendBtn.disabled = false;
        } else {
            userInput.disabled = true;
            sendBtn.disabled = true;
        }
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('open');
        userInput.disabled = true;
        sendBtn.disabled = true;
    });

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', `${sender}-message`);
        messageDiv.textContent = text;
        chatbotBody.appendChild(messageDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight; // Scroll to bottom
    };

    const botResponses = {
        "about": "Shesadree Priyadarshani is a passionate Data Scientist with a Master's in Applied Data Science from the University of Florida. She excels at transforming complex data into actionable insights, leveraging machine learning, statistical analysis, and data visualization.",
        "experience": "Shesadree has worked as a Decision Analyst I at Bristol Myers Squibb, a Decision Analytics Associate at ZS Associates, and an intern at Tata Steel Long Products, gaining extensive experience in ML model deployment, analytical pipeline automation, and data visualization.",
        "education": "Shesadree holds a Master’s in Applied Data Science from the University of Florida and a B.Tech in Electrical Engineering from the National Institute of Technology Rourkela.",
        "skills": "Her key skills include Python, SQL, R, various ML techniques (Regression, Classification, LLM, Deep Learning), and data visualization tools like Tableau, Power BI, and Excel.",
        "projects": "Shesadree has worked on projects like 'Automated PCB Test Plan Generation' using LLMs and an 'IoT-Based Automatic Vehicle Accident Detection and Rescue Model' with PySpark ML pipelines.",
        "contact": "You can contact Shesadree via email at pshesadree151@gmail.com or phone at +1 (352) 328-1832. You can also connect on LinkedIn: p-shesadree.",
        "default": "I'm sorry, I don't have information on that specific query. Please try asking about 'About', 'Experience', 'Education', 'Skills', 'Projects', or 'Contact'."
    };

    const handleBotResponse = (query) => {
        const lowerQuery = query.toLowerCase();
        let response = botResponses.default;

        for (const key in botResponses) {
            if (lowerQuery.includes(key)) {
                response = botResponses[key];
                break;
            }
        }
        addMessage(response, 'bot');
    };

    menuOptions.forEach(button => {
        button.addEventListener('click', () => {
            const query = button.dataset.query;
            addMessage(button.textContent, 'user'); // Show what user clicked
            if (query === 'other') {
                addMessage("Please type your custom question in the input field below.", 'bot');
            } else {
                handleBotResponse(query);
            }
        });
    });

    sendBtn.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            handleBotResponse(message);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
});