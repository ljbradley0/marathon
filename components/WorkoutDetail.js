import { useEffect } from 'react';
import WorkoutFeedback from '../js/workoutFeedback';

const WorkoutDetail = ({ workout }) => {
    useEffect(() => {
        // Initialize workout feedback
        const workoutFeedback = new WorkoutFeedback();
        workoutFeedback.initFeedbackForm(workout.id);
    }, [workout.id]); // Re-run when workout.id changes

    return (
        <div className="workout-detail">
            <div className="workout-container">
                <div className="workout-meta">
                    <div className="workout-date">{workout.date}</div>
                    <h1 className="workout-detail-title">{workout.title}</h1>
                    <div className="workout-meta-row">
                        <span className={`workout-type ${workout.type.toLowerCase()}`}>
                            {workout.type}
                        </span>
                        <span className="workout-time">{workout.time}</span>
                    </div>
                </div>

                {workout.structure && (
                    <div className="workout-structure">
                        <h2 className="section-title">Workout Structure</h2>
                        <ul className="structure-list">
                            {workout.structure.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {workout.notes && (
                    <div className="coaching-notes">
                        <h2 className="section-title">Coaching Notes</h2>
                        <p>{workout.notes}</p>
                    </div>
                )}

                <section className="workout-feedback">
                    <h2 className="section-title">Workout Feedback</h2>
                    <form id="workout-feedback-form">
                        <div className="feedback-field">
                            <label className="feedback-label" htmlFor="actual-distance">Actual Distance (km)</label>
                            <input 
                                type="number" 
                                id="actual-distance" 
                                name="actual-distance" 
                                className="feedback-input" 
                                step="0.01" 
                                min="0"
                                placeholder="Enter actual distance"
                            />
                        </div>

                        <div className="feedback-field">
                            <label className="feedback-label" htmlFor="feeling">How did the run feel?</label>
                            <select id="feeling" name="feeling" className="feedback-select">
                                <option value="">Select an option</option>
                                <option value="easy">Easy</option>
                                <option value="moderate">Moderate</option>
                                <option value="difficult">Difficult</option>
                            </select>
                        </div>

                        <div className="feedback-field">
                            <label className="feedback-label" htmlFor="motivation">How was your motivation?</label>
                            <select id="motivation" name="motivation" className="feedback-select">
                                <option value="">Select an option</option>
                                <option value="meh">Meh</option>
                                <option value="okay">Okay</option>
                                <option value="vibing">Vibing</option>
                            </select>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default WorkoutDetail; 