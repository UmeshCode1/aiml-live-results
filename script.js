document.addEventListener('DOMContentLoaded', () => {
    // Simulate neural net initialization (loading screen)
    const loadingScreen = document.getElementById('loading-screen');
    
    const progressBar = document.querySelector('.progress-bar');
    const percentageText = document.querySelector('.percentage');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800);
            }, 500);
        }
        
        progressBar.style.width = `${progress}%`;
        percentageText.textContent = `${Math.floor(progress)}%`;
    }, 150);

    // Optional: Add some interactive hover effects to the glass panels
    const panels = document.querySelectorAll('.glass-panel, .glass-header, .glass-footer');
    
    panels.forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            panel.style.setProperty('--mouse-x', `${x}px`);
            panel.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    // Live Time Clock
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        setInterval(() => {
            const now = new Date();
            timeElement.textContent = now.toLocaleTimeString();
        }, 1000);
    }

    // Typewriter effect for panel subtitle
    const typingTextElement = document.querySelector('.typing-text');
    if (typingTextElement) {
        const text = "Receiving live updates from control center...";
        let i = 0;
        typingTextElement.textContent = ''; // Clear initial text
        
        function typeWriter() {
            if (i < text.length) {
                typingTextElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    typingTextElement.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing after loader finishes
        setTimeout(typeWriter, 4000);
    }

    // Handle iframe refresh to pull latest Google Docs changes
    const refreshBtn = document.getElementById('refresh-btn');
    const docsIframe = document.getElementById('docs-iframe');
    
    if (refreshBtn && docsIframe) {
        refreshBtn.addEventListener('click', () => {
            const icon = refreshBtn.querySelector('i');
            icon.classList.add('fa-spin');
            
            // Append a random timestamp to bypass browser caching
            const currentSrc = docsIframe.src;
            const url = new URL(currentSrc);
            url.searchParams.set('t', Date.now());
            docsIframe.src = url.href;
            
            // Remove spin after 1.5 seconds or when loaded
            setTimeout(() => {
                icon.classList.remove('fa-spin');
            }, 1500);
        });
    }
    const skeleton = document.querySelector('.skeleton-loader');
    if (docsIframe && skeleton) {
        docsIframe.addEventListener('load', () => {
            skeleton.style.opacity = '0';
            setTimeout(() => {
                skeleton.style.display = 'none';
            }, 500);
        });
    }
    // Scroll progress bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressElement = document.getElementById("scroll-progress");
        if (progressElement) {
            progressElement.style.width = scrolled + "%";
        }
    });
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
