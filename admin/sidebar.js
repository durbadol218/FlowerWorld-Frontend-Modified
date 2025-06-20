document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    const main = document.getElementById('main');
    const overlay = document.getElementById('sidebar-overlay');
    
    // Toggle sidebar
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('expand');
        
        // Close sidebar when clicking overlay on mobile
        if (window.innerWidth < 992) {
            if (sidebar.classList.contains('expand')) {
                overlay.style.display = 'block';
                setTimeout(() => {
                    overlay.style.opacity = '1';
                    overlay.style.visibility = 'visible';
                }, 10);
            } else {
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 350);
            }
        }
    });
    
    // Close sidebar when clicking overlay
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('expand');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 350);
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            // Desktop - ensure overlay is hidden
            overlay.style.display = 'none';
        } else {
            // Mobile - collapse sidebar if expanded
            if (sidebar.classList.contains('expand')) {
                overlay.style.display = 'block';
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
            }
        }
    });
});