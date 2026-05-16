document.addEventListener('DOMContentLoaded', () => {
    // 1. Premium Loading Screen Sequence
    const loadingScreen = document.getElementById('loading-screen');
    const loaderStatus = document.getElementById('loader-status');
    const statuses = [
        "ESTABLISHING SECURE CONNECTION...",
        "BYPASSING MAINFRAME FIREWALLS...",
        "SYNCING TELEMETRY DATA...",
        "DECRYPTING LIVE FEED...",
        "ACCESS GRANTED."
    ];
    
    let step = 0;
    const interval = setInterval(() => {
        step++;
        if (step < statuses.length) {
            loaderStatus.innerText = statuses[step];
        } else {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => loadingScreen.style.display = 'none', 800);
            }, 500);
        }
    }, 700); // Total load time ~ 3.5s

    // 2. Real-time Clock
    const timeEl = document.getElementById('current-time');
    if (timeEl) {
        setInterval(() => {
            const now = new Date();
            timeEl.innerText = now.toLocaleTimeString('en-US', { hour12: false });
        }, 1000);
        // initial call
        timeEl.innerText = new Date().toLocaleTimeString('en-US', { hour12: false });
    }

    // 3. Time Since Update Simulation
    const lastUpdatedEl = document.getElementById('time-since-update');
    let secondsSinceUpdate = 0;
    if (lastUpdatedEl) {
        setInterval(() => {
            secondsSinceUpdate++;
            const mins = Math.floor(secondsSinceUpdate / 60).toString().padStart(2, '0');
            const secs = (secondsSinceUpdate % 60).toString().padStart(2, '0');
            lastUpdatedEl.innerText = `${mins}:${secs} AGO`;
        }, 1000);
    }

    // 4. Viewers Random Fluctuation
    const viewersEl = document.getElementById('viewers-count');
    let baseViewers = 1204;
    if (viewersEl) {
        setInterval(() => {
            const fluctuation = Math.floor(Math.random() * 11) - 5; // -5 to +5
            baseViewers += fluctuation;
            viewersEl.innerText = baseViewers.toLocaleString();
        }, 3000);
    }

    // 5. Iframe Refresh & Flash Effect
    const refreshBtn = document.getElementById('refresh-btn');
    const docsIframe = document.getElementById('docs-iframe');
    const flashEl = document.getElementById('update-flash');
    const skeleton = document.getElementById('iframe-skeleton');
    
    if (refreshBtn && docsIframe) {
        refreshBtn.addEventListener('click', () => {
            const icon = refreshBtn.querySelector('i');
            icon.classList.add('fa-spin');
            
            // Show flash effect
            if (flashEl) {
                flashEl.style.opacity = '1';
                setTimeout(() => flashEl.style.opacity = '0', 150);
            }
            
            // Show loading skeleton again (with terminal effect reset)
            if (skeleton) {
                skeleton.style.display = 'flex';
                // Reset terminal lines animation
                const lines = skeleton.querySelectorAll('.t-line');
                lines.forEach(line => {
                    line.style.animation = 'none';
                    line.offsetHeight; /* trigger reflow */
                    line.style.animation = null; 
                });
            }
            
            // Append random timestamp to bypass browser caching
            const url = new URL(docsIframe.src);
            url.searchParams.set('t', Date.now());
            docsIframe.src = url.href;
            
            secondsSinceUpdate = 0; // Reset timer
            if (lastUpdatedEl) lastUpdatedEl.innerText = `00:00 AGO`;

            // Remove spin after 1.5 seconds
            setTimeout(() => {
                icon.classList.remove('fa-spin');
            }, 1500);
        });
    }

    // 6. Generate Ambient Particles
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        for(let i=0; i<30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // 7. Dynamic Mini Graph Canvas
    const canvas = document.getElementById('miniGraph');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const points = Array(20).fill(10);
        setInterval(() => {
            points.shift();
            points.push(Math.random() * 15 + 2);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            for(let i=0; i<points.length; i++) {
                ctx.lineTo(i * 5, canvas.height - points[i]);
            }
            ctx.lineTo(100, canvas.height);
            ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
            ctx.fill();
            ctx.strokeStyle = '#00F0FF';
            ctx.stroke();
        }, 500);
    }

    // 8. System Load Randomizer
    const loadText = document.querySelector('.load-text');
    const loadFill = document.querySelector('.load-fill');
    if (loadText && loadFill) {
        setInterval(() => {
            const load = Math.floor(Math.random() * 40) + 20; // 20% to 60%
            loadText.innerText = load + '%';
            loadFill.style.width = load + '%';
        }, 2500);
    }
});

// Fullscreen toggle function
window.toggleFullscreen = function() {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
};
