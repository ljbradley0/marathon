// Helper function for calculating total distance
function calculateWeekDistance(workouts) {
    return workouts.reduce((total, workout) => total + workout.distance, 0);
}

function calculateRunTime(distance, paceMin) {
    return Math.round(distance * paceMin);
}

function formatTime(minutes) {
    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }
    return `${minutes}m`;
}

// Define paces
const PACES = {
    easy: 6.5,    // 6:30 min/km
    tempo: 5.5,   // 5:30 min/km
    long: 6.5,    // Using easy pace for long runs
    interval: 6,   // Average pace for interval sessions
    strength: 45,  // Fixed 45m for Crossfit
    rest: 0       // No time for rest days
};

// Define the training plan with weekly distances
const trainingPlan = [
    { weekDistance: "40-45km", workouts: [
        { title: "Easy run 5km", distance: 5, type: "easy", 
        time: formatTime(calculateRunTime(5, PACES.easy)) },
        { title: "Crossfit", distance: 0, type: "strength", 
        time: formatTime(PACES.strength) },
        { title: "Tempo run 6km", distance: 6, type: "tempo", 
        time: formatTime(calculateRunTime(6, PACES.tempo)) },
        { title: "Rest", distance: 0, type: "rest", 
        time: formatTime(PACES.rest) },
        { title: "Easy run 5km", distance: 5, type: "easy", 
        time: formatTime(calculateRunTime(5, PACES.easy)) },
        { title: "Crossfit", distance: 0, type: "strength", 
        time: formatTime(PACES.strength) },
        { title: "Long run 12km", distance: 12, type: "long", 
        time: formatTime(calculateRunTime(12, PACES.long)) }
    ]},
    { weekDistance: "45-50km", workouts: [
        { title: "Easy run 5km", distance: 5, type: "easy", 
        time: formatTime(calculateRunTime(5, PACES.easy)) },
        { title: "Crossfit", distance: 0, type: "strength", 
        time: formatTime(PACES.strength) },
        { title: "Tempo run 7km", distance: 7, type: "tempo", 
        time: formatTime(calculateRunTime(7, PACES.tempo)) },
        { title: "Rest", distance: 0, type: "rest", 
        time: formatTime(PACES.rest) },
        { title: "Easy run 6km", distance: 6, type: "easy", 
        time: formatTime(calculateRunTime(6, PACES.easy)) },
        { title: "Crossfit", distance: 0, type: "strength", 
        time: formatTime(PACES.strength) },
        { title: "Long run 14km", distance: 14, type: "long", 
        time: formatTime(calculateRunTime(14, PACES.long)) }
    ]},
    { weekDistance: "50-55km", workouts: [
        { title: "Easy run 6km", distance: 6, type: "easy", 
        time: formatTime(calculateRunTime(6, PACES.easy)) },
        { title: "Crossfit", distance: 0, type: "strength", 
        time: formatTime(PACES.strength) },
        { title: "Intervals 8km", distance: 8, type: "interval", 
        time: formatTime(calculateRunTime(8, PACES.interval)) },
        { title: "Rest", distance: 0, type: "rest", 
        time: formatTime(PACES.rest) },
        { title: "Easy run 7km", distance: 7, type: "easy", 
        time: formatTime(calculateRunTime(7, PACES.easy)) },
        { title: "Crossfit", distance: 0, type: "strength", 
        time: formatTime(PACES.strength) },
        { title: "Long run 16km", distance: 16, type: "long", 
        time: formatTime(calculateRunTime(16, PACES.long)) }
    ]}
];

// Function to generate dates starting from Monday
function generateDates(startDate, numWeeks) {
    const dates = [];
    const currentDate = new Date(startDate);
    
    for (let week = 0; week < numWeeks; week++) {
        const weekDates = [];
        for (let day = 0; day < 7; day++) {
            weekDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        dates.push(weekDates);
    }
    
    return dates;
}

// Format date as Day Month DD (Monday first)
function formatDate(date) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Adjust to make Monday = 0, Sunday = 6
    const dayIndex = (date.getDay() + 6) % 7;
    
    return `${days[dayIndex]} ${months[date.getMonth()]} ${date.getDate()}`;
}

// Generate HTML for all weeks
function generateWeeksHTML() {
    const startDate = new Date('2025-06-02'); // Monday, June 2nd, 2025
    const dates = generateDates(startDate, trainingPlan.length);
    let html = '';

    dates.forEach((weekDates, weekIndex) => {
        const weekPlan = trainingPlan[weekIndex];
        const weekId = `week${weekIndex + 1}`;
        const firstDateOfWeek = formatDate(weekDates[0]);
        
        html += `
        <div class="week-container" id="${weekId}-container">
            <button class="week-header" onclick="toggleWeek(this)" aria-expanded="false">
                <div class="week-header-content">
                    <svg class="chevron-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="week-date">${firstDateOfWeek}</span>
                </div>
                <span class="week-distance">${weekPlan.weekDistance}</span>
            </button>
            
            <div class="week-content collapsed">
                <div class="progress-container">
                    <div class="progress-bars">
                        ${Array(7).fill().map((_, i) => `
                            <div class="progress-segment" id="${weekId}-progress-${i}"></div>
                        `).join('')}
                    </div>
                    <div class="progress-footer">
                        <div class="workouts-count" id="${weekId}-workouts">
                            <span class="label">Workouts:</span>
                            <span class="value">0/7</span>
                        </div>
                        <div class="distance-count" id="${weekId}-distance">
                            <span class="label">Distance:</span>
                            <span class="value">0/${calculateWeekDistance(weekPlan.workouts)}km</span>
                        </div>
                    </div>
                </div>
                <div class="days-container">
        `;

        weekDates.forEach((date, dayIndex) => {
            const workout = weekPlan.workouts[dayIndex];
            const id = `week${weekIndex + 1}_day${dayIndex + 1}`;
            
            html += `
                <div class="day-card ${workout.type}">
                    <div class="card-header">
                        <div class="date-container">
                            ${formatDate(date)}
                        </div>
                        <div class="checkbox-container">
                            <input type="checkbox" id="${id}" onchange="toggleCompleted(this, ${weekIndex + 1})">
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="workout-title">${workout.title}</div>
                        <div class="workout-time">${workout.time}</div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        </div>
        `;
    });

    return html;
}

// Toggle week expansion
function toggleWeek(button) {
    const content = button.nextElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    button.setAttribute('aria-expanded', !isExpanded);
    content.classList.toggle('collapsed');
}

// Toggle completed class when checkbox is checked
function toggleCompleted(checkbox, weekNum) {
    const card = checkbox.closest('.day-card');
    if (checkbox.checked) {
        card.classList.add('completed');
    } else {
        card.classList.remove('completed');
    }
    
    updateProgressBar(weekNum);
    saveProgress();
}

// Update progress bar for a specific week - fills from left to right
function updateProgressBar(weekNum, weekPrefix = 'week') {
    const weekId = `${weekPrefix}${weekNum}`;
    const checkboxes = document.querySelectorAll(`#${weekId}-container input[type="checkbox"]`);
    
    if (checkboxes.length === 0) return; // Skip if no checkboxes found
    
    const totalWorkouts = checkboxes.length;
    let completedWorkouts = 0;
    let completedDistance = 0;
    const weekPlan = trainingPlan[weekNum - 1];
    const totalDistance = calculateWeekDistance(weekPlan.workouts);
    
    // Count completed workouts
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            completedWorkouts++;
            completedDistance += weekPlan.workouts[index].distance;
        }
    });
    
    // Update progress segments from left to right based on total completed
    const progressSegments = document.querySelectorAll(`#${weekId}-container .progress-segment`);
    progressSegments.forEach((segment, index) => {
        if (index < completedWorkouts) {
            segment.classList.add('completed');
        } else {
            segment.classList.remove('completed');
        }
    });
    
    const workoutsText = document.getElementById(`${weekId}-workouts`);
    const distanceText = document.getElementById(`${weekId}-distance`);
    
    if (workoutsText && distanceText) {
        workoutsText.innerHTML = `<span class="label">Workouts:</span><span class="value">${completedWorkouts}/${totalWorkouts}</span>`;
        distanceText.innerHTML = `<span class="label">Distance:</span><span class="value">${completedDistance}/${totalDistance}km</span>`;
    }
}

// Save progress to local storage
function saveProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progress = {};
    
    checkboxes.forEach(checkbox => {
        progress[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('marathonProgress', JSON.stringify(progress));
}

// Load progress from local storage
function loadProgress() {
    const savedProgress = localStorage.getItem('marathonProgress');
    
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        
        Object.keys(progress).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = progress[id];
                if (progress[id]) {
                    checkbox.closest('.day-card').classList.add('completed');
                }
                
                // Extract week number from the ID (format: weekX_dayY)
                const weekMatch = id.match(/week(\d+)_/);
                if (weekMatch && weekMatch[1]) {
                    const weekNum = parseInt(weekMatch[1]);
                    updateProgressBar(weekNum);
                }
            }
        });
    }
    
    // Initialize all progress bars for visible weeks
    for (let i = 1; i <= trainingPlan.length; i++) {
        updateProgressBar(i);
    }
}