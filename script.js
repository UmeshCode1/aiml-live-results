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
});
