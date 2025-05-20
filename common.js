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

// Function to generate dates
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

// Format date as Day Month DD
function formatDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}`;
}

// Function to navigate to workout detail page
function navigateToWorkout(weekNum, dayIndex) {
    // Get the workout data
    const week = trainingPlan[weekNum - 1];
    const workout = week.workouts[dayIndex];
    
    // Get the date
    const startDate = new Date('2025-06-01');
    const workoutDate = new Date(startDate);
    workoutDate.setDate(workoutDate.getDate() + ((weekNum - 1) * 7) + dayIndex);
    
    // Store the current page as the referrer
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    sessionStorage.setItem('workoutReferrer', currentPage);
    
    // Store the workout data in sessionStorage to retrieve it on the detail page
    const workoutData = {
        weekNum: weekNum,
        date: formatDate(workoutDate),
        title: workout.title,
        type: workout.type,
        time: workout.time,
        structure: getWorkoutStructure(workout),
        coachingNotes: getCoachingNotes(workout)
    };
    
    sessionStorage.setItem('currentWorkout', JSON.stringify(workoutData));
    
    // Navigate to the detail page
    window.location.href = `workout-detail.html?week=${weekNum}&day=${dayIndex}`;
}

// Helper functions to get workout-specific content
function getWorkoutStructure(workout) {
    // Return array of steps for different workout types
    switch(workout.type) {
        case 'easy':
            return [
                "5 minutes dynamic stretching/walking warm-up",
                `${workout.distance}km at easy pace (6:30/km)`,
                "5 minutes walking cool down",
                "Light stretching"
            ];
        case 'tempo':
            return [
                "10 minutes easy jogging warm-up",
                `${Math.round(workout.distance * 0.2)}km at easy pace (6:30/km)`,
                `${Math.round(workout.distance * 0.6)}km at tempo pace (5:30/km)`,
                `${Math.round(workout.distance * 0.2)}km at easy pace (6:30/km)`,
                "5 minutes walking cool down"
            ];
        case 'long':
            return [
                "5 minutes easy walk/jog warm-up",
                `${workout.distance - 2}km at easy pace (6:30/km)`,
                "2km at moderate pace (6:00/km) for a strong finish",
                "5 minutes cool down walk"
            ];
        case 'interval':
            return [
                "10 minutes easy jogging warm-up",
                "6 x 800m intervals at 5:00/km pace with 200m recovery jogs",
                "10 minutes easy jogging cool down"
            ];
        case 'strength':
            return [
                "10 minutes warm-up",
                "3 rounds of: 10 squats, 10 lunges, 10 push-ups, 30 seconds plank",
                "3 rounds of: 10 deadlifts, 10 box jumps, 10 kettlebell swings",
                "10 minutes cool down and stretching"
            ];
        case 'rest':
            return [
                "Complete rest day",
                "Focus on quality sleep",
                "Stay hydrated",
                "Light stretching or yoga if desired"
            ];
        default:
            return ["Workout structure not specified"];
    }
}

function getCoachingNotes(workout) {
    // Return coaching notes specific to workout type
    switch(workout.type) {
        case 'easy':
            return "This is a recovery run. Keep the pace truly easy - you should be able to hold a conversation throughout. Focus on good form and enjoying the run. These easy runs build your aerobic base and allow your body to recover from harder efforts.";
        case 'tempo':
            return "Tempo runs increase your lactate threshold, helping you maintain faster paces for longer. The middle section should feel challenging but sustainable - about 80-85% of maximum effort. Your breathing will be more labored but not gasping. These runs are crucial for marathon performance.";
        case 'long':
            return "Your long run is the cornerstone of marathon training. Focus on time on feet rather than pace. Practice your fueling strategy - take water and consider energy gels every 45-60 minutes. The slight pace increase at the end trains your body to push when fatigued, crucial for marathon success.";
        case 'interval':
            return "Interval training improves your VO2 max and running economy. Push during the work intervals - these should be challenging. Focus on maintaining form even when tired. The recovery jogs are essential - don't cut them short. Quality over quantity is key for these sessions.";
        case 'strength':
            return "Cross-training with strength work prevents injuries and improves running economy. Focus on form over weight/reps. These sessions complement your running by strengthening supportive muscles and correcting imbalances that develop from running alone.";
        case 'rest':
            return "Rest days are when adaptation happens! Your body gets stronger during recovery, not during the workout itself. Avoid the temptation to add extra training - proper rest now means better performance later. Stay hydrated and get quality sleep to maximize recovery.";
        default:
            return "Focus on consistency in your training. Every workout serves a purpose in preparing you for your marathon goal.";
    }
}

// Helper function to get a user-friendly name for workout types
function getWorkoutTypeName(type) {
    const typeNames = {
        'easy': 'Easy Run',
        'tempo': 'Tempo Run',
        'long': 'Long Run',
        'interval': 'Interval Training',
        'strength': 'Strength Training',
        'rest': 'Rest Day'
    };
    
    return typeNames[type] || 'Workout';
}

// Generate HTML for all weeks
function generateWeeksHTML() {
    const startDate = new Date('2025-06-01');
    const dates = generateDates(startDate, trainingPlan.length);
    let html = '';

    dates.forEach((weekDates, weekIndex) => {
        const weekPlan = trainingPlan[weekIndex];
        const weekId = `week${weekIndex + 1}`;
        const firstDateOfWeek = formatDate(weekDates[0]);
        
        html += `
        <div class="week-container" id="${weekId}-container">
            <button class="week-header" onclick="toggleWeek(this)">
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
                <div class="day-card ${workout.type}" onclick="navigateToWorkout(${weekIndex + 1}, ${dayIndex})">
                    <div class="card-header">
                        <div class="date-container">
                            ${formatDate(date)}
                        </div>
                        <div class="checkbox-container" onclick="event.stopPropagation()">
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
    const checkboxContainer = checkbox.closest('.checkbox-container');
    
    if (checkbox.checked) {
        card.classList.add('completed');
        checkboxContainer.classList.add('checked');
    } else {
        card.classList.remove('completed');
        checkboxContainer.classList.remove('checked');
    }
    
    updateProgressBar(weekNum);
    saveProgress();
}

// Update progress bar for a specific week
function updateProgressBar(weekNum) {
    const weekId = `week${weekNum}`;
    console.log('Updating progress bar for week:', weekId);
    
    const checkboxes = document.querySelectorAll(`#${weekId}-container input[type="checkbox"]`);
    console.log('Found checkboxes:', checkboxes.length);
    
    const totalWorkouts = checkboxes.length;
    let completedWorkouts = 0;
    let completedDistance = 0;
    const weekPlan = trainingPlan[weekNum - 1];
    const totalDistance = calculateWeekDistance(weekPlan.workouts);
    
    // First count completed workouts and calculate distance
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            completedWorkouts++;
            completedDistance += weekPlan.workouts[index].distance;
        }
    });
    
    // Then update progress segments from left to right
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
        workoutsText.innerHTML = `<span class="label">Workouts:</span><span class="value">${completedWorkouts}/7</span>`;
        distanceText.innerHTML = `<span class="label">Distance:</span><span class="value">${completedDistance}/${totalDistance}km</span>`;
    }
}

// Save progress to local storage
function saveProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let progress = {};
    
    // Try to load existing progress first
    const existingProgress = localStorage.getItem('marathonProgress');
    if (existingProgress) {
        progress = JSON.parse(existingProgress);
    }
    
    // Update with current checkbox states
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
        
        // First, mark all checkboxes based on saved state
        Object.keys(progress).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = progress[id];
                if (progress[id]) {
                    const card = checkbox.closest('.day-card');
                    const checkboxContainer = checkbox.closest('.checkbox-container');
                    if (card) {
                        card.classList.add('completed');
                    }
                    if (checkboxContainer) {
                        checkboxContainer.classList.add('checked');
                    }
                }
            }
        });
        
        // Then update all progress bars
        const weekNums = new Set();
        Object.keys(progress).forEach(id => {
            const weekMatch = id.match(/week(\d+)_/);
            if (weekMatch && weekMatch[1]) {
                weekNums.add(parseInt(weekMatch[1]));
            }
        });
        
        weekNums.forEach(weekNum => {
            updateProgressBar(weekNum);
        });
    }
    
    // Initialize all progress bars
    for (let i = 1; i <= trainingPlan.length; i++) {
        updateProgressBar(i);
    }
}

// Initialize the proper page based on URL
document.addEventListener('DOMContentLoaded', () => {
    // Check which page we're on
    const isDetailPage = window.location.pathname.includes('workout-detail.html');
    
    if (isDetailPage) {
        // We're on the detail page, initialize it
        initializeWorkoutDetailPage();
    } else {
        // We're on the main page, initialize that
        initializeMainPage();
    }
});

function initializeMainPage() {
    // Your existing initialization code for the main page
    if (document.getElementById('weeks-container')) {
        document.getElementById('weeks-container').innerHTML = generateWeeksHTML();
    }
    loadProgress();
    
    // Get current date and expand current week
    const today = new Date();
    const weekHeaders = document.querySelectorAll('.week-header');
    
    weekHeaders.forEach((header, index) => {
        const weekStartDate = new Date('2025-06-01');
        weekStartDate.setDate(weekStartDate.getDate() + (index * 7));
        const weekEndDate = new Date(weekStartDate);
        weekEndDate.setDate(weekEndDate.getDate() + 6);
        
        if (today >= weekStartDate && today <= weekEndDate) {
            toggleWeek(header);
        }
    });
}

function initializeWorkoutDetailPage() {
    // Get workout data from sessionStorage
    const workoutData = JSON.parse(sessionStorage.getItem('currentWorkout'));
    
    if (!workoutData) {
        console.error('No workout data found');
        window.location.href = 'index.html';
        return;
    }
    
    // Get referring page, default to index.html if not found
    const referrer = sessionStorage.getItem('workoutReferrer') || 'index.html';
    
    // Update back button URL
    document.querySelector('.back-button').setAttribute('href', referrer);
    
    // Update the page with workout details
    document.querySelector('.back-button span').textContent = `Week ${workoutData.weekNum}`;
    document.querySelector('.workout-date').textContent = workoutData.date;
    document.querySelector('.workout-detail-title').textContent = workoutData.title;
    
    // Update workout type
    const workoutTypeElement = document.querySelector('.workout-type');
    workoutTypeElement.textContent = getWorkoutTypeName(workoutData.type);
    workoutTypeElement.className = `workout-type ${workoutData.type}`;
    
       // Update time without any prefix
    document.querySelector('.workout-time').textContent = workoutData.time;
    
    // Populate structure list
    const structureList = document.querySelector('.structure-list');
    structureList.innerHTML = '';
    workoutData.structure.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        structureList.appendChild(li);
    });
    
    // Populate coaching notes
    document.querySelector('.coaching-notes').innerHTML = `<p>${workoutData.coachingNotes}</p>`;
}