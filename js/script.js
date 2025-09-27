// --- Utility Functions ---

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

// Function to clear form inputs after submission
const resetForm = (formElement) => {
    formElement.reset();
}

// Function to reset the display data and clear localStorage name on page load/refresh
const clearOutputOnRefresh = (welcomeElement) => {
    document.getElementById('output-time').textContent = '';

    // Clear the output values
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

// --- NEW VALIDATION AND SUCCESS HANDLERS ---

// Function to hide error message when input is corrected/interacted with
const initializeErrorHiding = () => {
    // Select all inputs (text, date, and radio containers) and the textarea
    const formFields = [
        { id: 'name', errorId: 'name-error', event: 'input' },
        { id: 'date-of-birth', errorId: 'dob-error', event: 'change' },
        { id: 'message', errorId: 'message-error', event: 'input' },
        // Gender inputs need a special handler since they are a radio group
    ];

    formFields.forEach(field => {
        const inputElement = document.getElementById(field.id);
        const errorElement = document.getElementById(field.errorId);
        
        if (inputElement && errorElement) {
            inputElement.addEventListener(field.event, () => {
                // Only hide the error if the input now has a value (i.e., is not blank)
                // For 'input', we check value. For 'change' (date), we also check value.
                if (inputElement.value.trim() !== '') {
                    errorElement.classList.add('hidden');
                }
            });
        }
    });

    // Handle Gender radio buttons (they require checking if *any* radio is selected)
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const genderError = document.getElementById('gender-error');
    if (genderError) {
        genderInputs.forEach(radio => {
            radio.addEventListener('change', () => {
                // If the user selects a gender, hide the error immediately
                genderError.classList.add('hidden');
            });
        });
    }
};

// Function is being called inside the 'submit' event listener
const validateForm = (formElement) => {
    let isValid = true;
    
    // 1. CLEAR: Clear all previously shown errors at the start
    formElement.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));

    // --- 2. VALIDATE NAME ---
    const nameInput = document.getElementById('name');
    if (nameInput.value.trim() === '') {
        document.getElementById('name-error').classList.remove('hidden'); // <--- A
        isValid = false;
    }

    // --- 3. VALIDATE DATE OF BIRTH ---
    const dobInput = document.getElementById('date-of-birth');
    if (dobInput.value.trim() === '') {
        document.getElementById('dob-error').classList.remove('hidden'); // <--- B
        isValid = false;
    }

    // --- 4. VALIDATE GENDER ---
    const genderChecked = formElement.querySelector('input[name="gender"]:checked');
    if (!genderChecked) {
        document.getElementById('gender-error').classList.remove('hidden'); // <--- C
        isValid = false;
    }

    // --- 5. VALIDATE MESSAGE ---
    const messageInput = document.getElementById('message');
    if (messageInput.value.trim() === '') {
        document.getElementById('message-error').classList.remove('hidden'); // <--- D
        isValid = false;
    }

    return isValid;
};

// Function to display the success message
const showSuccessMessage = () => {
    const successElement = document.getElementById('submission-success');
    if (successElement) {
        // Step 1: Make it visible and start the fade-in
        successElement.classList.remove('invisible'); // REMOVE invisible
        // Trigger the transition by removing opacity-0
        setTimeout(() => {
            successElement.classList.add('opacity-100'); // ADD opacity-100 for fade-in
            successElement.classList.remove('opacity-0');
        }, 10); // Small delay to ensure the 'invisible' change is registered

        // Step 2: Hide/Fade out after 3 seconds
        setTimeout(() => {
            // Start the fade-out
            successElement.classList.remove('opacity-100');
            successElement.classList.add('opacity-0'); // ADD opacity-0 for fade-out

            // Step 3: Wait for the fade-out to complete (500ms from CSS) before making it truly invisible
            setTimeout(() => {
                successElement.classList.add('invisible'); // ADD invisible to hide completely
            }, 500); // 500ms duration from CSS transition

        }, 3000); // Wait 3 seconds with the message fully visible
    }
};


// --- Main Execution ---
document.addEventListener('DOMContentLoaded', async () => {
    setActiveNav();
    initializeMobileMenu();
    initializeErrorHiding();

    const welcomeNameElement = document.getElementById('welcome-name');

    // Clear data and reset welcome name on page load/refresh
    clearOutputOnRefresh(welcomeNameElement);

    // Form Submision
    const messageForm = document.getElementById('message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', function (event) {
            // Prevent the default form submission (page refresh)
            event.preventDefault();

            // Perform validation
            if (!validateForm(messageForm)) {
                // Stop processing if validation fails
                console.error("Validation failed. Please fill out all required fields.");
                return;
            }

            // --- Get Form Values for successful submission ---
            const outputTimeElement = document.getElementById('output-time');
            const nameInput = document.getElementById('name');
            const dobInput = document.getElementById('date-of-birth');
            const messageInput = document.getElementById('message');
            const genderInput = messageForm.querySelector('input[name="gender"]:checked');

            // Check again for safety, though validation should cover this
            if (nameInput && dobInput && messageInput && genderInput && outputTimeElement) {

                // Get and format time
                const now = new Date();
                const formattedTime = now.toString();

                // Update output section
                outputTimeElement.textContent = formattedTime;
                document.getElementById('output-name').textContent = nameInput.value;
                document.getElementById('output-dob').textContent = dobInput.value;
                document.getElementById('output-gender').textContent = genderInput.value;
                document.getElementById('output-message').textContent = messageInput.value;

                // Update and store name
                localStorage.setItem('submittedName', nameInput.value);
                if (welcomeNameElement) {
                    welcomeNameElement.textContent = nameInput.value;
                }

                // Show success message
                showSuccessMessage();

                // Clear the form
                resetForm(messageForm);

            } else {
                console.error("An unexpected error occurred: Required output elements missing.");
            }
        })
    }

})