document.addEventListener('DOMContentLoaded', () => {
    // Simulate neural net initialization (loading screen)
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after 2.5 seconds to reveal the UI
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 2500);

    // Optional: Add some interactive hover effects to the glass panels
    const panels = document.querySelectorAll('.glass-panel, .glass-header');
    
    panels.forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            panel.style.setProperty('--mouse-x', `${x}px`);
            panel.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
