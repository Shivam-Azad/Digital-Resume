document.addEventListener("DOMContentLoaded", function() {
    
    // ===========================================
    // 1. TYPING ANIMATION VARIABLES & FUNCTION
    // ===========================================
    
    function typeWriterEffect() {
        const textElement = document.getElementById('typed-text');
        
        // Define the phrases that will be typed out
        const phrases = [
            "MCA Student | Aspiring Softwre Developer",
            "Automobile Enthusiast",
            "A Creative Web Developer",
            "A Problem Solver"
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        // This is the core typing function
        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Deleting text
                charIndex--;
                textElement.textContent = currentPhrase.substring(0, charIndex);
            } else {
                // Typing text
                charIndex++;
                textElement.textContent = currentPhrase.substring(0, charIndex);
            }

            let typeSpeed = isDeleting ? 50 : 100;

            // If a word is complete
            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000; // Pause at the end of a word
                isDeleting = true;
            } 
            // If deletion is complete
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length; // Move to the next phrase
                typeSpeed = 500; // Pause before typing the next word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start the typing effect
        type();
    }


    // ===========================================
    // 2. LOADING SCREEN LOGIC (Car & Smoke)
    // ===========================================

    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const loadingBar = document.getElementById('loading-bar-fill');
    const sportCar = document.getElementById('sport-car');

    let progress = 0;
    const intervalTime = 50; // Update every 50ms (controls smoothness)
    const totalTime = 1500; // Simulated time for the first 70% (1.5 seconds)
    const MAX_SIMULATED_PROGRESS = 70; // Stop the simulated animation here
    const totalSteps = totalTime / intervalTime;
    const stepIncrease = MAX_SIMULATED_PROGRESS / totalSteps;
    
    let pageLoaded = false;
    let animationDone = false; // Tracks if the simulated 70% is reached

    // Function to handle the final actions (jump to 100% and hide screen)
    function finishLoading() {
        if (pageLoaded && animationDone) {
            // Ensure the bar and car are at 100% immediately before hiding
            loadingBar.style.width = '100%';
            sportCar.style.left = `calc(100% - 30px)`; // Adjusted offset

            // Wait a moment for 100% to register visually
            setTimeout(() => {
                // Hide loading screen and show main content
                loadingScreen.style.opacity = '0';
                mainContent.classList.remove('hidden');

                // ⭐ START TYPING EFFECT HERE! ⭐
                typeWriterEffect(); 

                // Remove the screen completely after fade out
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500); // Matches CSS transition time
            }, 300); 
        }
    }

    // --- Simulated Animation (0% to 70%) ---
    const loadingInterval = setInterval(() => {
        if (progress < MAX_SIMULATED_PROGRESS) {
            progress += stepIncrease;
            
            // Update the visual loading bar and car position
            loadingBar.style.width = `${progress}%`;
            sportCar.style.left = `calc(${progress}% - 30px)`;

        } else if (!animationDone) {
            // Once simulation hits 70%, stop and wait for the real page load event
            clearInterval(loadingInterval);
            animationDone = true;
            finishLoading();
        }
    }, intervalTime);


    // --- REAL Page Load Event Listener ---
    // This waits for ALL resources (images, scripts, CSS) to be fetched.
    window.addEventListener('load', function() {
        pageLoaded = true;
        // If the animation is already at 70%, this will trigger the final jump to 100%
        finishLoading(); 
    });
    
    // Fallback check in case the load event fires extremely fast
    if (document.readyState === 'complete') {
        pageLoaded = true;
    }

    // ===========================================
    // 3. Optional: Navigation Active State Logic
    // ===========================================
    // (You will need this later for marking the current section in the navbar)
    // We will leave this section empty for now, but you would add code here 
    // to track scroll position and add an 'active' class to the correct menu link.

});