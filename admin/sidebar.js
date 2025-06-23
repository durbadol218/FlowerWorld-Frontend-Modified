document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    const main = document.getElementById('main');
    const overlay = document.getElementById('sidebar-overlay');
    
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('expand');
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
    
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('expand');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 350);
    });
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            overlay.style.display = 'none';
        } else {
            if (sidebar.classList.contains('expand')) {
                overlay.style.display = 'block';
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
            }
        }
    });
});