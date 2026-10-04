/**
 * Shoaib Khan Portfolio - Interactive Behavior & UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Dynamic Footer Year
    // -------------------------------------------------------------------------
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // -------------------------------------------------------------------------
    // 2. Dark / Light Theme Toggle (with LocalStorage)
    // -------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'dark'); // Default to sleek dark
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);

            showToast(`Switched to ${newTheme} mode`, 'success');
        });
    }

    // -------------------------------------------------------------------------
    // 3. Mobile Navigation Menu Toggle
    // -------------------------------------------------------------------------
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('open')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close mobile menu on click outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // -------------------------------------------------------------------------
    // 4. ScrollSpy - Active Nav Link Indicator
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');

    function scrollSpy() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);

            if (correspondingNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Initial check

    // -------------------------------------------------------------------------
    // 5. Scroll Entrance Animations (IntersectionObserver)
    // -------------------------------------------------------------------------
    const animatableElements = document.querySelectorAll(
        '.section-header, .about-card, .pillar-card, .skill-category-card, .project-card, .certificate-card, .timeline-item, .contact-card, .modern-form, .stat-card, .project-filter-tabs'
    );

    animatableElements.forEach(el => el.classList.add('reveal-on-scroll'));

    if ('IntersectionObserver' in window) {
        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        });

        animatableElements.forEach(el => scrollObserver.observe(el));
    } else {
        // Fallback for older browsers
        animatableElements.forEach(el => el.classList.add('revealed'));
    }

    // -------------------------------------------------------------------------
    // 6. Interactive Mouse-Following Spotlight
    // -------------------------------------------------------------------------
    const spotlight = document.getElementById('mouse-spotlight');
    if (spotlight && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let isSpotlightVisible = false;

        window.addEventListener('mousemove', (e) => {
            if (!isSpotlightVisible) {
                spotlight.style.opacity = '1';
                isSpotlightVisible = true;
            }
            spotlight.style.left = `${e.clientX}px`;
            spotlight.style.top = `${e.clientY}px`;
        });

        document.addEventListener('mouseleave', () => {
            spotlight.style.opacity = '0';
            isSpotlightVisible = false;
        });
    }

    // -------------------------------------------------------------------------
    // 7. Dynamic Typewriter Effect in Hero
    // -------------------------------------------------------------------------
    const typedTextEl = document.getElementById('typed-text');
    if (typedTextEl) {
        const roles = [
            'Python Backend Architecture',
            'Agentic AI & LLM Systems',
            'FastAPI & High-Performance APIs',
            'Computer Vision & OCR Pipelines',
            'Scalable Distributed Systems'
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        function typeLoop() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                charIndex--;
                typedTextEl.textContent = currentRole.substring(0, charIndex);
                typingSpeed = 45;
            } else {
                charIndex++;
                typedTextEl.textContent = currentRole.substring(0, charIndex);
                typingSpeed = 90;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400;
            }

            setTimeout(typeLoop, typingSpeed);
        }

        typeLoop();
    }

    // -------------------------------------------------------------------------
    // 8. Interactive 3D Perspective Card Tilt
    // -------------------------------------------------------------------------
    const tiltCards = document.querySelectorAll('.card-tilt');
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // -------------------------------------------------------------------------
    // 9. Project Filtering by Domain
    // -------------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-grid .project-card');

    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const selectedFilter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategories = card.getAttribute('data-category') || '';

                    if (selectedFilter === 'all' || cardCategories.includes(selectedFilter)) {
                        card.classList.remove('filter-hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = '';
                        }, 50);
                    } else {
                        card.classList.add('filter-hidden');
                    }
                });
            });
        });
    }

    // -------------------------------------------------------------------------
    // 10. Copy Code Snippet Button
    // -------------------------------------------------------------------------
    const copyCodeBtn = document.getElementById('copy-code-btn');
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', async () => {
            const rawCode = `class Engineer:
    def __init__(self):
        self.name = "Shoaib Khan"
        self.current_company = "Neuroapp"
        self.degree = "Electrical Eng. (Computing & AI)"
        self.primary_stack = ["Python", "FastAPI", "PyTorch"]
        self.passions = ["Agentic AI", "Backend Scaling", "LLMs"]

    def build_solution(self, problem):
        return f"Practical AI & Robust APIs for {problem}"`;

            try {
                await navigator.clipboard.writeText(rawCode);
                copyCodeBtn.classList.add('copied');
                copyCodeBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span class="copy-label">Copied!</span>';
                showToast('Developer profile code copied to clipboard!', 'success');

                setTimeout(() => {
                    copyCodeBtn.classList.remove('copied');
                    copyCodeBtn.innerHTML = '<i class="fa-regular fa-copy"></i> <span class="copy-label">Copy</span>';
                }, 2200);
            } catch (err) {
                console.error('Clipboard copy failed:', err);
            }
        });
    }

    // -------------------------------------------------------------------------
    // 11. Copy Email Button
    // -------------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'shoaibdotani1147@gmail.com';
            try {
                await navigator.clipboard.writeText(email);
                copyEmailBtn.classList.add('copied');
                copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
                showToast('Email address copied to clipboard!', 'success');

                setTimeout(() => {
                    copyEmailBtn.classList.remove('copied');
                    copyEmailBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                }, 2200);
            } catch (err) {
                console.error('Clipboard copy failed:', err);
            }
        });
    }

    // -------------------------------------------------------------------------
    // 12. Download CV Button Notification
    // -------------------------------------------------------------------------
    const downloadCvBtn = document.getElementById('download-cv-btn');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', () => {
            showToast('Downloading Shoaib Khan\'s Resume (PDF)...', 'success');
        });
    }

    // -------------------------------------------------------------------------
    // 13. Real Web3Forms Contact Form Handling
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const nameInput = contactForm.name;
            const emailInput = contactForm.email;
            const messageInput = contactForm.message;

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Client-side validation
            if (!name || !email || !message) {
                showToast('Please fill out all required fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }

            // Disable submit button & show loading state
            const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    <span>Sending Message...</span>
                `;
            }

            try {
                const formData = new FormData(contactForm);

                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const result = await response.json();

                if (response.status === 200 && result.success) {
                    showToast(`Thank you, ${name}! Your message has been sent to my inbox.`, 'success');
                    contactForm.reset();
                } else {
                    showToast(result.message || 'Failed to send message. Please try again later.', 'error');
                }
            } catch (error) {
                console.error('Contact Form Error:', error);
                showToast('Network error. Please check your internet connection or email me directly.', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }
            }
        });
    }
});

// -------------------------------------------------------------------------
// 13. Modern Toast Notification Helper (Global)
// -------------------------------------------------------------------------
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';

    toast.innerHTML = `
        <i class="${iconClass}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger entrance animation
    setTimeout(() => toast.classList.add('show'), 50);

    // Remove after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// -------------------------------------------------------------------------
// 14. Certificate Lightbox Modal Handling (Global Functions)
// -------------------------------------------------------------------------
function openCertificateModal(imageSrc, caption) {
    const modal = document.getElementById('certificate-modal');
    const modalImage = document.getElementById('cert-modal-image');
    const modalCaption = document.getElementById('cert-modal-caption');

    if (modal && modalImage) {
        modalImage.src = imageSrc;
        if (modalCaption) {
            modalCaption.textContent = caption || '';
        }
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent page scroll
    }
}

function closeCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertificateModal();
    }
});

// -------------------------------------------------------------------------
// 15. AI Chatbot Widget Logic & Groq Integration
// -------------------------------------------------------------------------
(function initAIChatbot() {
    // Configurable Backend URL for Render / Vercel:
    // Once deployed to Render, change this URL to e.g. "https://your-service.onrender.com/api/chat"
    const GROQ_BACKEND_API_URL = window.GROQ_BACKEND_API_URL || null;

    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatClearBtn = document.getElementById('chat-clear-btn');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatTypingIndicator = document.getElementById('chat-typing-indicator');

    if (!chatToggleBtn || !chatWindow || !chatForm || !chatInput || !chatMessages) return;

    let conversationHistory = [];

    // Toggle Chat Window
    function toggleChat(forceOpen) {
        const isOpen = chatWindow.classList.contains('active');
        const shouldOpen = forceOpen !== undefined ? forceOpen : !isOpen;

        if (shouldOpen) {
            chatWindow.classList.add('active');
            chatToggleBtn.classList.add('open');
            chatWindow.setAttribute('aria-hidden', 'false');
            setTimeout(() => chatInput.focus(), 250);
        } else {
            chatWindow.classList.remove('active');
            chatToggleBtn.classList.remove('open');
            chatWindow.setAttribute('aria-hidden', 'true');
        }
    }

    chatToggleBtn.addEventListener('click', () => toggleChat());
    if (chatCloseBtn) chatCloseBtn.addEventListener('click', () => toggleChat(false));

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatWindow.classList.contains('active')) {
            toggleChat(false);
        }
    });

    // Clear Chat
    if (chatClearBtn) {
        chatClearBtn.addEventListener('click', () => {
            conversationHistory = [];
            chatMessages.innerHTML = `
                <div class="chat-msg chat-msg-assistant">
                    <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div class="msg-bubble">
                        <p>Conversation reset! ✨ What else would you like to know about Shoaib's engineering work?</p>
                    </div>
                </div>
                <div id="chat-suggestions" class="chat-suggestions">
                    <span class="suggestions-label">Suggested questions:</span>
                    <div class="suggestions-grid">
                        <button type="button" class="suggestion-chip" data-query="What is your current role at Neuroapp?">
                            <i class="fa-solid fa-briefcase"></i> Role at Neuroapp
                        </button>
                        <button type="button" class="suggestion-chip" data-query="What are your featured AI and backend projects?">
                            <i class="fa-solid fa-code"></i> Top Projects
                        </button>
                        <button type="button" class="suggestion-chip" data-query="What is your core tech stack and skills?">
                            <i class="fa-solid fa-layer-group"></i> Tech Stack
                        </button>
                        <button type="button" class="suggestion-chip" data-query="How can I contact or hire Shoaib?">
                            <i class="fa-solid fa-paper-plane"></i> Contact & Hire
                        </button>
                    </div>
                </div>
            `;
            attachSuggestionEvents();
            showToast('Chat history cleared', 'success');
        });
    }

    // Scroll chat to bottom
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Append Message to UI
    function appendMessage(role, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg chat-msg-${role}`;

        const avatarIcon = role === 'user' ? 'fa-user' : 'fa-robot';
        const formattedText = formatMarkdown(text);

        msgDiv.innerHTML = `
            <div class="msg-avatar"><i class="fa-solid ${avatarIcon}"></i></div>
            <div class="msg-bubble">${formattedText}</div>
        `;

        // Hide suggestions once user starts chatting
        const suggestionsEl = document.getElementById('chat-suggestions');
        if (suggestionsEl && role === 'user') {
            suggestionsEl.style.display = 'none';
        }

        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    // Basic markdown formatter
    function formatMarkdown(content) {
        let clean = content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // bold **text**
        clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // italics *text*
        clean = clean.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // links [text](url)
        clean = clean.replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>');
        // line breaks
        clean = clean.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');

        return `<p>${clean}</p>`;
    }

    // Show/Hide Typing Indicator
    function setTyping(isTyping) {
        if (chatTypingIndicator) {
            if (isTyping) {
                chatTypingIndicator.classList.remove('hidden');
                scrollToBottom();
            } else {
                chatTypingIndicator.classList.add('hidden');
            }
        }
    }

    // Attach click events to suggestion chips
    function attachSuggestionEvents() {
        const chips = chatMessages.querySelectorAll('.suggestion-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const query = chip.getAttribute('data-query');
                if (query) {
                    handleUserSubmit(query);
                }
            });
        });
    }
    attachSuggestionEvents();

    // Handle Form Submit
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = chatInput.value.trim();
        if (!query) return;
        chatInput.value = '';
        handleUserSubmit(query);
    });

    // Handle User Question Processing
    async function handleUserSubmit(userQuestion) {
        appendMessage('user', userQuestion);
        conversationHistory.push({ role: 'user', content: userQuestion });
        setTyping(true);

        try {
            let answer = '';

            // If a live backend URL is configured, call it
            if (GROQ_BACKEND_API_URL) {
                const response = await fetch(GROQ_BACKEND_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        question: userQuestion,
                        history: conversationHistory
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    answer = data.answer || data.reply || data.response;
                } else {
                    throw new Error('Backend returned status ' + response.status);
                }
            } else {
                // Instant Knowledge-Base Engine (Fallback & Local Mode)
                await new Promise(r => setTimeout(r, 650));
                answer = generateKnowledgeResponse(userQuestion);
            }

            setTyping(false);
            appendMessage('assistant', answer);
            conversationHistory.push({ role: 'assistant', content: answer });
        } catch (err) {
            console.warn('AI Chat API fallback activated:', err);
            setTyping(false);
            const fallbackAnswer = generateKnowledgeResponse(userQuestion);
            appendMessage('assistant', fallbackAnswer);
            conversationHistory.push({ role: 'assistant', content: fallbackAnswer });
        }
    }

    // Knowledge Base Engine for Shoaib Khan
    function generateKnowledgeResponse(query) {
        const q = query.toLowerCase();

        // 1. Current Company & Role
        if (q.includes('neuroapp') || q.includes('company') || q.includes('current role') || q.includes('where do you work') || q.includes('job') || q.includes('work at')) {
            return "Shoaib is currently working as a **Software Developer** at [Neuroapp](https://neuroapp.pro/about.html) software company! 🏢\n\nAt Neuroapp, he designs and engineers scalable production backend services, high-throughput APIs, and AI automation systems. You can verify the company directly on their [official About page](https://neuroapp.pro/about.html).";
        }

        // 2. Featured Projects
        if (q.includes('project') || q.includes('neuromcq') || q.includes('agent') || q.includes('code') || q.includes('portfolio work')) {
            return "Here are Shoaib's key featured engineering projects:\n\n" +
                   "• **NeuroMCQ Platform:** An intelligent assessment & question-bank platform built with **FastAPI** featuring automated OCR question extraction using **PaddleOCR**, dynamic **HTMX** UI, and PostgreSQL/SQLite integrations.\n\n" +
                   "• **Autonomous AI Coding Agent:** An agentic software engineering system built around Google ADK principles capable of multi-file AST codebase understanding, semantic indexing, dynamic tool calling, and automated refactoring.\n\n" +
                   "• **AI Content Generation System:** A multimodal pipeline for automated research, script synthesis, media asset discovery, and multi-channel content workflows.\n\n" +
                   "You can view the code repositories on his [GitHub](https://github.com/shoaib1147-dev).";
        }

        // 3. Technical Skills & Stack
        if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('python') || q.includes('fastapi')) {
            return "Shoaib's core technical competence includes:\n\n" +
                   "• **Backend & APIs:** Python, FastAPI, Flask, AsyncIO, RESTful APIs, Microservices, PostgreSQL, SQLite, Redis\n" +
                   "• **AI & Machine Learning:** PyTorch, PaddleOCR, LLMs, Agentic AI, Computer Vision, RAG Pipelines, Multi-Agent Systems\n" +
                   "• **Frontend & Cross-Platform:** Flutter, Dart, React, HTMX, Modern HTML5/CSS3/JavaScript\n" +
                   "• **DevOps & Architecture:** Docker, Linux, Git, GitHub, Clean Architecture, Performance Optimization";
        }

        // 4. Contact & Hire
        if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('linkedin') || q.includes('reach out') || q.includes('message')) {
            return "You can get in touch with Shoaib directly through multiple channels:\n\n" +
                   "• **Personal Email:** [shoaibdotani1147@gmail.com](mailto:shoaibdotani1147@gmail.com)\n" +
                   "• **LinkedIn:** [linkedin.com/in/shoaib-khan](https://www.linkedin.com/in/shoaib-khan-a60070333/)\n" +
                   "• **GitHub:** [github.com/shoaib1147-dev](https://github.com/shoaib1147-dev)\n\n" +
                   "You can also use the contact form at the bottom of this page to send a message directly to his Gmail!";
        }

        // 5. Resume / CV
        if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
            return "You can download Shoaib's updated PDF resume by clicking the **'Download CV'** button in the top header, or [click here to download](assets/Shoaib_Khan_Resume.pdf)! 📄";
        }

        // 6. Education & Certifications
        if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('certificate') || q.includes('flutter')) {
            return "Shoaib holds a **B.S. in Electrical Engineering (Computing & AI)**, with deep foundations in computer systems, mathematics, and machine learning.\n\nHe also holds a verified **Introduction to Flutter Course** certificate from Simplilearn SkillUp (Certificate ID: `10549631`, Aug 2026), verifiable in the Certificates section!";
        }

        // 7. General / Services / Overview
        return "Shoaib Khan is a Python Backend Developer and AI/ML Engineer currently working at [Neuroapp](https://neuroapp.pro/about.html).\n\nHe specializes in building high-throughput FastAPI backends, Computer Vision/OCR pipelines, and autonomous Agentic AI systems. Feel free to ask about his **projects**, **skills**, **current role**, or how to **contact** him!";
    }
})();