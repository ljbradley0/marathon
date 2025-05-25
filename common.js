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
    easy: 6.5,      // 6:30 min/km
    tempo: 5.5,     // 5:30 min/km
    long: 6.5,      // Using easy pace for long runs
    intervals: 5.0, // 5:00 min/km for interval segments
    hills: 6.0,     // Variable pace for hill training
    strength: 45,   // Fixed 45m for Crossfit
    rest: 0         // No time for rest days
};

// Define the training plan with weekly distances calculated dynamically
const trainingPlan = [
    // PHASE 1: Base Building (Weeks 1-4)
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 5km", distance: 5, type: "easy", time: formatTime(calculateRunTime(5, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 6km", distance: 6, type: "easy", time: formatTime(calculateRunTime(6, PACES.easy)) },
            { title: "Crossfit + Easy run 3km", distance: 3, type: "easy", time: formatTime(calculateRunTime(3, PACES.easy) + 30) },
            { title: "Long run 12km", distance: 12, type: "long", time: formatTime(calculateRunTime(12, PACES.long)) }
        ]
    },
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 6km", distance: 6, type: "easy", time: formatTime(calculateRunTime(6, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 7km", distance: 7, type: "easy", time: formatTime(calculateRunTime(7, PACES.easy)) },
            { title: "Crossfit + Easy run 4km", distance: 4, type: "easy", time: formatTime(calculateRunTime(4, PACES.easy) + 30) },
            { title: "Long run 14km", distance: 14, type: "long", time: formatTime(calculateRunTime(14, PACES.long)) }
        ]
    },
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 7km", distance: 7, type: "easy", time: formatTime(calculateRunTime(7, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Tempo run 6km", distance: 6, type: "tempo", time: formatTime(calculateRunTime(6, PACES.tempo)) },
            { title: "Crossfit + Easy run 4km", distance: 4, type: "easy", time: formatTime(calculateRunTime(4, PACES.easy) + 30) },
            { title: "Long run 16km", distance: 16, type: "long", time: formatTime(calculateRunTime(16, PACES.long)) }
        ]
    },
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 5km", distance: 5, type: "easy", time: formatTime(calculateRunTime(5, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 6km", distance: 6, type: "easy", time: formatTime(calculateRunTime(6, PACES.easy)) },
            { title: "Crossfit + Easy run 3km", distance: 3, type: "easy", time: formatTime(calculateRunTime(3, PACES.easy) + 30) },
            { title: "Long run 12km", distance: 12, type: "long", time: formatTime(calculateRunTime(12, PACES.long)) }
        ]
    },

    // PHASE 2: Strength Development (Weeks 5-8)
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 8km", distance: 8, type: "easy", time: formatTime(calculateRunTime(8, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Tempo run 7km", distance: 7, type: "tempo", time: formatTime(calculateRunTime(7, PACES.tempo)) },
            { title: "Crossfit + Easy run 5km", distance: 5, type: "easy", time: formatTime(calculateRunTime(5, PACES.easy) + 30) },
            { title: "Long run 18km", distance: 18, type: "long", time: formatTime(calculateRunTime(18, PACES.long)) }
        ]
    },
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 9km", distance: 9, type: "easy", time: formatTime(calculateRunTime(9, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Hill repeats 8km", distance: 8, type: "hills", time: formatTime(calculateRunTime(8, PACES.hills)) },
            { title: "Crossfit + Easy run 5km", distance: 5, type: "easy", time: formatTime(calculateRunTime(5, PACES.easy) + 30) },
            { title: "Long run 20km", distance: 20, type: "long", time: formatTime(calculateRunTime(20, PACES.long)) }
        ]
    },
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 10km", distance: 10, type: "easy", time: formatTime(calculateRunTime(10, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Intervals 8km", distance: 8, type: "intervals", time: formatTime(calculateRunTime(8, PACES.intervals)) },
            { title: "Crossfit + Easy run 6km", distance: 6, type: "easy", time: formatTime(calculateRunTime(6, PACES.easy) + 30) },
            { title: "Long run 22km", distance: 22, type: "long", time: formatTime(calculateRunTime(22, PACES.long)) }
        ]
    },
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 7km", distance: 7, type: "easy", time: formatTime(calculateRunTime(7, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 8km", distance: 8, type: "easy", time: formatTime(calculateRunTime(8, PACES.easy)) },
            { title: "Crossfit + Easy run 4km", distance: 4, type: "easy", time: formatTime(calculateRunTime(4, PACES.easy) + 30) },
            { title: "Long run 16km", distance: 16, type: "long", time: formatTime(calculateRunTime(16, PACES.long)) }
        ]
    },

    // PHASE 3: Endurance Building (Weeks 9-12)
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 11km", distance: 11, type: "easy", time: formatTime(calculateRunTime(11, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Intervals 9km", distance: 9, type: "intervals", time: formatTime(calculateRunTime(9, PACES.intervals)) },
            { title: "Crossfit + Easy run 6km", distance: 6, type: "easy", time: formatTime(calculateRunTime(6, PACES.easy) + 30) },
            { title: "Long run 24km", distance: 24, type: "long", time: formatTime(calculateRunTime(24, PACES.long)) }
        ]
    },
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 12km", distance: 12, type: "easy", time: formatTime(calculateRunTime(12, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Tempo run 10km", distance: 10, type: "tempo", time: formatTime(calculateRunTime(10, PACES.tempo)) },
            { title: "Crossfit + Easy run 7km", distance: 7, type: "easy", time: formatTime(calculateRunTime(7, PACES.easy) + 30) },
            { title: "Long run 26km", distance: 26, type: "long", time: formatTime(calculateRunTime(26, PACES.long)) }
        ]
    },
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 13km", distance: 13, type: "easy", time: formatTime(calculateRunTime(13, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Hill repeats 10km", distance: 10, type: "hills", time: formatTime(calculateRunTime(10, PACES.hills)) },
            { title: "Crossfit + Easy run 7km", distance: 7, type: "easy", time: formatTime(calculateRunTime(7, PACES.easy) + 30) },
            { title: "Long run 28km", distance: 28, type: "long", time: formatTime(calculateRunTime(28, PACES.long)) }
        ]
    },
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 9km", distance: 9, type: "easy", time: formatTime(calculateRunTime(9, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 10km", distance: 10, type: "easy", time: formatTime(calculateRunTime(10, PACES.easy)) },
            { title: "Crossfit + Easy run 5km", distance: 5, type: "easy", time: formatTime(calculateRunTime(5, PACES.easy) + 30) },
            { title: "Long run 20km", distance: 20, type: "long", time: formatTime(calculateRunTime(20, PACES.long)) }
        ]
    },

    // PHASE 4: Marathon Specific (Weeks 13-16)
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 14km", distance: 14, type: "easy", time: formatTime(calculateRunTime(14, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Tempo run 12km", distance: 12, type: "tempo", time: formatTime(calculateRunTime(12, PACES.tempo)) },
            { title: "Crossfit + Easy run 8km", distance: 8, type: "easy", time: formatTime(calculateRunTime(8, PACES.easy) + 30) },
            { title: "Long run 30km", distance: 30, type: "long", time: formatTime(calculateRunTime(30, PACES.long)) }
        ]
    },
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 15km", distance: 15, type: "easy", time: formatTime(calculateRunTime(15, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Intervals 12km", distance: 12, type: "intervals", time: formatTime(calculateRunTime(12, PACES.intervals)) },
            { title: "Crossfit + Easy run 8km", distance: 8, type: "easy", time: formatTime(calculateRunTime(8, PACES.easy) + 30) },
            { title: "Long run 32km", distance: 32, type: "long", time: formatTime(calculateRunTime(32, PACES.long)) }
        ]
    },
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 13km", distance: 13, type: "easy", time: formatTime(calculateRunTime(13, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Hill repeats 10km", distance: 10, type: "hills", time: formatTime(calculateRunTime(10, PACES.hills)) },
            { title: "Crossfit + Easy run 7km", distance: 7, type: "easy", time: formatTime(calculateRunTime(7, PACES.easy) + 30) },
            { title: "Long run 28km", distance: 28, type: "long", time: formatTime(calculateRunTime(28, PACES.long)) }
        ]
    },
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 10km", distance: 10, type: "easy", time: formatTime(calculateRunTime(10, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Tempo run 8km", distance: 8, type: "tempo", time: formatTime(calculateRunTime(8, PACES.tempo)) },
            { title: "Crossfit + Easy run 5km", distance: 5, type: "easy", time: formatTime(calculateRunTime(5, PACES.easy) + 30) },
            { title: "Long run 21km", distance: 21, type: "long", time: formatTime(calculateRunTime(21, PACES.long)) }
        ]
    },

    // PHASE 5: Taper (Weeks 17-18)
    { 
        workouts: [
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Easy run 8km", distance: 8, type: "easy", time: formatTime(calculateRunTime(8, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Crossfit", distance: 0, type: "strength", time: formatTime(PACES.strength) },
            { title: "Intervals 6km", distance: 6, type: "intervals", time: formatTime(calculateRunTime(6, PACES.intervals)) },
            { title: "Crossfit + Easy run 4km", distance: 4, type: "easy", time: formatTime(calculateRunTime(4, PACES.easy) + 30) },
            { title: "Long run 16km", distance: 16, type: "long", time: formatTime(calculateRunTime(16, PACES.long)) }
        ]
    },
    { 
        workouts: [
            { title: "Light Crossfit", distance: 0, type: "strength", time: formatTime(30) },
            { title: "Easy run 5km", distance: 5, type: "easy", time: formatTime(calculateRunTime(5, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "Easy run 3km", distance: 3, type: "easy", time: formatTime(calculateRunTime(3, PACES.easy)) },
            { title: "Easy run 3km", distance: 3, type: "easy", time: formatTime(calculateRunTime(3, PACES.easy)) },
            { title: "Rest", distance: 0, type: "rest", time: formatTime(PACES.rest) },
            { title: "MARATHON 42.2km", distance: 42.2, type: "race", time: "Race Day!" }
        ]
    }
];

// Calculate weekDistance dynamically for each week
trainingPlan.forEach((week, index) => {
    const totalDistance = calculateWeekDistance(week.workouts);
    week.weekDistance = `${totalDistance}km`;
    week.phase = getPhaseForWeek(index + 1);
});

function getPhaseForWeek(weekNumber) {
    if (weekNumber <= 4) return "Base Building";
    if (weekNumber <= 8) return "Strength Development";
    if (weekNumber <= 12) return "Endurance Building";
    if (weekNumber <= 16) return "Marathon Specific";
    return "Taper";
}

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
    
    console.log('Navigating to workout:', { weekNum, dayIndex, workout });
    
    // Get the date
    const startDate = new Date('2025-05-26');
    const workoutDate = new Date(startDate);
    workoutDate.setDate(workoutDate.getDate() + ((weekNum - 1) * 7) + dayIndex);
    
    // Store the current page as the referrer
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    sessionStorage.setItem('workoutReferrer', currentPage);
    
    // Store the workout data in sessionStorage to retrieve it on the detail page
    const workoutData = {
        weekNum: weekNum,
        dayIndex: dayIndex,
        date: formatDate(workoutDate),
        title: workout.title,
        type: workout.type,
        time: workout.time,
        structure: getWorkoutStructure(workout),
        coachingNotes: getCoachingNotes(workout)
    };
    
    console.log('Storing workout data:', workoutData);
    sessionStorage.setItem('currentWorkout', JSON.stringify(workoutData));
    
    // Navigate to the detail page with week and day parameters
    window.location.href = `workout-detail.html?week=${weekNum}&day=${dayIndex}`;
}

// Updated getWorkoutStructure function with specific run type instructions
function getWorkoutStructure(workout) {
    switch(workout.type) {
        case 'easy':
            return [
                "10 minutes dynamic warm-up (leg swings, high knees, butt kicks)",
                `${workout.distance}km at easy pace (6:30/km) - conversational pace`,
                "Focus on relaxed breathing and smooth cadence (~180 steps/min)",
                "5-10 minutes walking cool down with light stretching"
            ];
        case 'tempo':
            return [
                "15 minutes easy warm-up jog",
                "5 minutes building to tempo pace gradually",
                `${Math.round(workout.distance * 0.6)}km at tempo pace (5:30/km) - comfortably hard effort`,
                `${Math.round(workout.distance * 0.2)}km easy cool down`,
                "Focus on maintaining steady, controlled breathing"
            ];
        case 'intervals':
            const intervalDistance = workout.distance;
            if (intervalDistance <= 6) {
                return [
                    "15 minutes easy warm-up with 4x100m strides",
                    "6 x 400m at 5:00/km pace with 200m easy recovery jogs",
                    "Focus on smooth acceleration and maintaining form",
                    "10 minutes easy cool down jog"
                ];
            } else if (intervalDistance <= 9) {
                return [
                    "15 minutes easy warm-up with 4x100m strides",
                    "5 x 800m at 5:00/km pace with 400m easy recovery jogs",
                    "Alternative: 8 x 600m with 300m recovery",
                    "10 minutes easy cool down jog"
                ];
            } else {
                return [
                    "15 minutes easy warm-up with 4x100m strides",
                    "4 x 1km at 5:00/km pace with 500m easy recovery jogs",
                    "Alternative: 6 x 800m with 400m recovery",
                    "15 minutes easy cool down jog"
                ];
            }
        case 'hills':
            return [
                "15 minutes easy warm-up on flat terrain",
                "Find a hill with 6-8% gradient, 200-400m long",
                "8-12 x hill repeats: run up strong (not sprinting), jog down easy",
                "Focus on short, quick steps and forward lean",
                "10 minutes easy cool down on flat terrain"
            ];
        case 'long':
            return [
                "Start with 10 minutes very easy pace to warm up",
                `First ${Math.round(workout.distance * 0.7)}km at easy pace (6:30/km)`,
                `Final ${Math.round(workout.distance * 0.3)}km pick up to moderate pace (6:00/km)`,
                "Practice marathon fueling: water every 15-20 mins, energy every 45-60 mins",
                "Cool down with 5-10 minutes walking"
            ];
        case 'strength':
            return [
                "10 minutes dynamic warm-up",
                "3 rounds of: 10 squats, 10 lunges, 10 push-ups, 30 seconds plank",
                "3 rounds of: 10 deadlifts, 10 box jumps, 10 kettlebell swings",
                "10 minutes cool down and stretching focusing on hips and glutes"
            ];
        case 'rest':
            return [
                "Complete rest day - no running or intense exercise",
                "Focus on quality sleep (8+ hours)",
                "Stay hydrated throughout the day",
                "Light stretching or gentle yoga if desired",
                "Consider foam rolling or massage"
            ];
        case 'race':
            return [
                "MARATHON DAY! You've trained for this moment",
                "Start 10-15 seconds per km slower than goal pace",
                "Fuel every 45-60 minutes starting at 1 hour",
                "Take fluids at every aid station",
                "Break race into 5km segments mentally"
            ];
        default:
            return ["Workout structure not specified"];
    }
}

// Updated getCoachingNotes function with specific advice for each run type
function getCoachingNotes(workout) {
    switch(workout.type) {
        case 'easy':
            return "Easy runs are the foundation of marathon training. You should be able to hold a full conversation throughout. If you can't talk in complete sentences, slow down! These runs improve your aerobic capacity, promote recovery, and build the capillary networks needed for endurance. Aim for 70-80% of your weekly mileage at this effort.";
        case 'tempo':
            return "Tempo runs train your lactate threshold - the fastest pace you can sustain for about an hour. This should feel 'comfortably hard' - you can speak in short phrases but not hold a conversation. Your breathing will be noticeably elevated but controlled. This pace is crucial for marathon performance as it's close to your sustainable race pace.";
        case 'intervals':
            return "Interval training improves your VO2 max and running economy. These are high-quality efforts that should feel challenging but controlled. Focus on maintaining good form even when tired. The recovery periods are crucial - don't cut them short. These sessions teach your body to clear lactate efficiently and improve your speed endurance.";
        case 'hills':
            return "Hill training builds leg strength, improves running economy, and develops power. Run the uphills with effort but not all-out sprinting. Focus on maintaining your cadence with shorter strides. Pump your arms and lean slightly forward from your ankles. The downhill recovery teaches efficient descent technique. Hills are nature's gym for runners!";
        case 'long':
            return "Long runs are the cornerstone of marathon training. Start conservatively and gradually build confidence in your ability to cover distance. Practice your race-day nutrition and hydration strategies. The final portion at moderate pace teaches your body to run efficiently when fatigued - exactly what you'll need in the marathon's final stages.";
        case 'strength':
            return "Cross-training with strength work prevents injuries and improves running economy. Focus on functional movements that support running: glutes, core, and single-leg stability. These sessions complement your running by strengthening supportive muscles and correcting imbalances that develop from repetitive running motion.";
        case 'rest':
            return "Rest days are when adaptation happens! Your body gets stronger during recovery, not during the workout itself. Resist the urge to add extra training. Proper rest now means better performance later. Stay hydrated, eat well, and prioritize sleep. Your next workout will be better because you rested today.";
        case 'race':
            return "This is race day! Trust your training and remember all the preparation you've done. Start conservatively - you can always pick up the pace later. Stick to your planned fueling strategy and stay mentally positive. When it gets tough (and it will), remember why you started this journey. You're stronger than you know!";
        default:
            return "Focus on consistency in your training. Every workout serves a purpose in preparing you for your marathon goal.";
    }
}

// Updated getWorkoutTypeName function
function getWorkoutTypeName(type) {
    const typeNames = {
        'easy': 'Easy Run',
        'tempo': 'Tempo Run',
        'long': 'Long Run',
        'intervals': 'Interval Training',
        'hills': 'Hill Repeats',
        'strength': 'Strength Training',
        'rest': 'Rest Day',
        'race': 'RACE DAY!'
    };
    
    return typeNames[type] || 'Workout';
}

// Generate HTML for all weeks
function generateWeeksHTML() {
    const startDate = new Date('2025-05-26');
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
                            <ion-icon name="checkmark-circle-outline"></ion-icon>
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
    const id = checkbox.id;
    const container = checkbox.closest('.checkbox-container');
    
    // Toggle the checked class on the container
    container.classList.toggle('checked');
    
    // Update the icon based on checked state
    const icon = container.querySelector('ion-icon');
    if (checkbox.checked) {
        icon.setAttribute('name', 'checkmark-circle');
    } else {
        icon.setAttribute('name', 'checkmark-circle-outline');
    }
    
    // Save to localStorage
    const savedProgress = JSON.parse(localStorage.getItem('marathonProgress') || '{}');
    savedProgress[id] = checkbox.checked;
    localStorage.setItem('marathonProgress', JSON.stringify(savedProgress));
    
    // Update progress bar for this week only
    updateProgressBar(weekNum);
    
    // Dispatch a custom event that can be listened to by other pages
    window.dispatchEvent(new CustomEvent('workoutProgressUpdated', {
        detail: { workoutId: id, isCompleted: checkbox.checked }
    }));
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
    
    const workoutsText = document.querySelector(`#${weekId}-container .workouts-count .value`);
    const distanceText = document.querySelector(`#${weekId}-container .distance-count .value`);
    
    if (workoutsText) workoutsText.textContent = `${completedWorkouts}/7`;
    if (distanceText) distanceText.textContent = `${completedDistance}/${totalDistance}km`;
}

// Load progress from local storage
function loadProgress() {
    const savedProgress = JSON.parse(localStorage.getItem('marathonProgress') || '{}');
    
    // First, mark all checkboxes based on saved state
    Object.keys(savedProgress).forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.checked = savedProgress[id];
            const container = checkbox.closest('.checkbox-container');
            if (container) {
                if (savedProgress[id]) {
                    container.classList.add('checked');
                    const icon = container.querySelector('ion-icon');
                    if (icon) {
                        icon.setAttribute('name', 'checkmark-circle');
                    }
                } else {
                    container.classList.remove('checked');
                    const icon = container.querySelector('ion-icon');
                    if (icon) {
                        icon.setAttribute('name', 'checkmark-circle-outline');
                    }
                }
            }
        }
    });
    
    // Then update all progress bars
    const weekNums = new Set();
    Object.keys(savedProgress).forEach(id => {
        const weekMatch = id.match(/week(\d+)_/);
        if (weekMatch && weekMatch[1]) {
            weekNums.add(parseInt(weekMatch[1]));
        }
    });
    
    weekNums.forEach(weekNum => {
        updateProgressBar(weekNum);
    });
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
        const weekStartDate = new Date('2025-05-26');
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
    document.querySelector('.detail-date').textContent = workoutData.date;
    document.querySelector('.detail-title').textContent = workoutData.title;
    document.querySelector('.detail-meta').textContent = workoutData.time;
    
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