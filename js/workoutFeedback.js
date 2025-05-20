// Workout feedback storage and retrieval
export default class WorkoutFeedback {
    constructor() {
        this.storageKey = 'workout_feedback';
    }

    // Save feedback for a specific workout
    saveFeedback(workoutId, feedback) {
        const allFeedback = this.getAllFeedback();
        allFeedback[workoutId] = {
            ...feedback,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(allFeedback));
    }

    // Get feedback for a specific workout
    getFeedback(workoutId) {
        const allFeedback = this.getAllFeedback();
        return allFeedback[workoutId] || null;
    }

    // Get all feedback
    getAllFeedback() {
        const feedback = localStorage.getItem(this.storageKey);
        return feedback ? JSON.parse(feedback) : {};
    }

    // Initialize feedback form
    initFeedbackForm(workoutId) {
        const form = document.getElementById('workout-feedback-form');
        if (!form) return;

        // Load existing feedback
        const existingFeedback = this.getFeedback(workoutId);
        if (existingFeedback) {
            form.elements['actual-distance'].value = existingFeedback.actualDistance || '';
            form.elements['feeling'].value = existingFeedback.feeling || '';
            form.elements['motivation'].value = existingFeedback.motivation || '';
        }

        // Add form submit handler
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const feedback = {
                actualDistance: form.elements['actual-distance'].value,
                feeling: form.elements['feeling'].value,
                motivation: form.elements['motivation'].value
            };
            this.saveFeedback(workoutId, feedback);
        });

        // Auto-save on input change
        form.addEventListener('change', (e) => {
            const feedback = {
                actualDistance: form.elements['actual-distance'].value,
                feeling: form.elements['feeling'].value,
                motivation: form.elements['motivation'].value
            };
            this.saveFeedback(workoutId, feedback);
        });
    }
} 