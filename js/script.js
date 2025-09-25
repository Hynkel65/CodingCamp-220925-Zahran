// Function for mark Active Navbar item
const setActiveNav = () => {
    const path = window.location.pathname;

    const navHome = document.getElementById('nav-home');
    const navProfile = document.getElementById('nav-profile');

    const activeClasses = ['text-primary-medium', 'font-bold', 'border-b-2', 'border-primary-dark'];

    if (path.includes('profile.html')) {
        if (navProfile) navProfile.classList.add(...activeClasses);
        if (navHome) navHome.classList.remove(...activeClasses);
    } else {
        if (navHome) navHome.classList.add(...activeClasses);
        if (navProfile) navProfile.classList.remove(...activeClasses);
    }
};

// Function for Toggle Menu Navbar
const initializeMobileMenu = () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        })
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    setActiveNav();
    initializeMobileMenu();
})