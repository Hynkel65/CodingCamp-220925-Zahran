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
        // Simplified to always set 'Home' active if not on 'profile.html'.
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

// Function for clear form inputs after submission
const resetForm = (formElement) => {
    formElement.reset();
}

// ⚡ FIX: Added welcomeElement as an argument to resolve scope issue
// Function for reset the display data on page load/refresh
const clearOutputOnRefresh = (welcomeElement) => { 
    document.getElementById('output-time').textContent = '';
    
    // Clear the output values to match the empty state
    document.getElementById('output-name').textContent = ''; 
    document.getElementById('output-dob').textContent = ''; 
    document.getElementById('output-gender').textContent = ''; 
    document.getElementById('output-message').textContent = ''; 

    // Clear the stored name in localStorage
    localStorage.removeItem('submittedName');

    // Set Welcome Name to default 'Nama'
    if (welcomeElement) {
        const userName = localStorage.getItem('submittedName') || 'Nama';
        welcomeElement.textContent = userName
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    setActiveNav();
    initializeMobileMenu();

    const welcomeNameElement = document.getElementById('welcome-name');

    clearOutputOnRefresh(welcomeNameElement);

    // Form Submision
    const messageForm = document.getElementById('message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', function (event) {
            event.preventDefault(); 

            // Get Form Value
            const outputTimeElement = document.getElementById('output-time');
            const nameInput = document.getElementById('name');
            const dobInput = document.getElementById('date-of-birth');
            const messageInput = document.getElementById('message');
            const genderInput = messageForm.querySelector('input[name="gender"]:checked');
            
            // Check for all required elements to be safe
            if (nameInput && dobInput && messageInput && genderInput && outputTimeElement) {

                const now = new Date();
                const formattedTime = now.toString();

                outputTimeElement.textContent = formattedTime;
                document.getElementById('output-name').textContent = nameInput.value;
                document.getElementById('output-dob').textContent = dobInput.value;
                document.getElementById('output-gender').textContent = genderInput.value;
                document.getElementById('output-message').textContent = messageInput.value;


                localStorage.setItem('submittedName', nameInput.value);
                
                if (welcomeNameElement) {
                    welcomeNameElement.textContent = nameInput.value;
                }
                
                resetForm(messageForm);
                
            } else {
                console.error("Ada data yang belum di isi.");
            }
        })
    }

})