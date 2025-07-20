document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('dashboard.html')) {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
        }
        // Further implementation to fetch and display projects
    }
});
