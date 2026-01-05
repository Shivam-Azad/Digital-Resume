document.addEventListener("DOMContentLoaded", function() {
    // 1. Elements Selection
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const loadingBar = document.getElementById('loading-bar-fill');
    const sportCar = document.getElementById('sport-car');
    const textElement = document.getElementById('typed-text');
    const statsSection = document.querySelector(".stats-grid");
    const counters = document.querySelectorAll(".counter");
    const statItems = document.querySelectorAll(".stat-item");

    // 2. Loading Screen Logic (F1 Theme)
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        if (loadingBar) loadingBar.style.width = progress + "%";
        if (sportCar) sportCar.style.left = `calc(${progress}% - 30px)`;

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                mainContent.classList.remove('hidden');
                
                // Start Typing Effect after main content reveals
                startTyping();
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 30);

    // 3. Multi-Phrase Typing Effect
   function startTyping() {
    const textElement = document.getElementById('typed-text');
    if (!textElement) return;

    const phrases = [
        "MCA Student",
        "Aspiring Software Developer",
        "Automobile Enthusiast",
        "A Creative Web Developer",
        "A Problem Solver"
    ];
    let pIndex = 0, cIndex = 0, isDel = false;

    function type() {
        const current = phrases[pIndex];
        
        // Only update the text, NO cursor symbol here
        textElement.textContent = current.substring(0, cIndex);

        if (isDel) {
            cIndex--;
        } else {
            cIndex++;
        }

        let speed = isDel ? 50 : 100;

        if (!isDel && cIndex > current.length) { 
            isDel = true; 
            speed = 2000; // Wait at the end
        }
        else if (isDel && cIndex < 0) { 
            isDel = false; 
            pIndex = (pIndex + 1) % phrases.length; 
            cIndex = 0;
            speed = 500; 
        }
        setTimeout(type, speed);
    }
    type();
}

    // 4. Scroll-Triggered Counting Stats (Intersection Observer)
    if (statsSection) {
        const countOptions = {
            threshold: 0.6, // Trigger when 60% of the grid is visible
        };

        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Staggered card reveal (Slide up effect)
                    statItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add("is-visible");
                        }, index * 150);
                    });

                    // Start counting logic for numbers
                    counters.forEach((counter) => {
                        const target = parseFloat(counter.getAttribute("data-target"));
                        const isDecimal = counter.getAttribute("data-target").includes(".");
                        
                        const updateCount = () => {
                            const current = parseFloat(counter.innerText) || 0;
                            const increment = target / 40; // Control speed of count here

                            if (current < target) {
                                let nextVal = current + increment;
                                if (isDecimal) {
                                    counter.innerText = Math.min(nextVal, target).toFixed(2);
                                } else {
                                    counter.innerText = Math.ceil(Math.min(nextVal, target));
                                }
                                setTimeout(updateCount, 30);
                            } else {
                                counter.innerText = isDecimal ? target.toFixed(2) : target;
                            }
                        };
                        updateCount();
                    });

                    // Stop observing once animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, countOptions);

        statsObserver.observe(statsSection);
    }
});