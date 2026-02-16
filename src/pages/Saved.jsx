import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import { getJobStatuses, updateJobStatus } from '../utils/status';
import { calculateMatchScore } from '../utils/scoring';

const Saved = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [statuses, setStatuses] = useState({});
    const [selectedJob, setSelectedJob] = useState(null);
    const [preferences, setPreferences] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const jobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
        setSavedJobs(jobs);

        // Load Statuses
        setStatuses(getJobStatuses());

        // Load Preferences for match scores
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }
    }, []);

    const handleRemove = (jobId) => {
        const updated = savedJobs.filter(j => j.id !== jobId);
        setSavedJobs(updated);
        localStorage.setItem('savedJobs', JSON.stringify(updated));
    };

    const handleStatusChange = (jobId, newStatus) => {
        const job = savedJobs.find(j => j.id === jobId);
        if (!job) return;

        // Update utility function
        updateJobStatus(job, newStatus);

        // Update local state
        setStatuses(prev => ({ ...prev, [jobId]: newStatus }));

        // Show Toast
        setToast(`Status updated: ${newStatus}`);
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="container mx-auto px-4 max-w-7xl min-h-[80vh] py-12 relative">
            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white px-6 py-3 rounded border flex items-center gap-3 animate-fade-in">
                    <span className="font-medium">{toast}</span>
                    <button onClick={() => setToast(null)} className="text-gray-400 hover:text-white">&times;</button>
                </div>
            )}

            <div className="mb-10 text-center">
                <h1 className="text-4xl font-serif font-bold text-primary mb-3">Saved Jobs</h1>
                <p className="text-secondary text-lg">Your bookmarked opportunities.</p>
            </div>

            {savedJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 rounded">
                    <div className="w-24 h-24 mb-6 rounded-full bg-red-50 flex items-center justify-center">
                        <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-serif text-primary mb-2">No Saved Jobs Yet</h2>
                    <p className="text-secondary mb-6 max-w-md text-center">
                        Jobs you save from the dashboard will appear here for easy access.
                    </p>
                    <Link to="/dashboard" className="btn btn-primary px-8">
                        Browse Jobs
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                    {savedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            matchScore={preferences ? calculateMatchScore(job, preferences) : 0}
                            onView={setSelectedJob}
                            onSave={() => handleRemove(job.id)}
                            status={statuses[job.id]}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            )}

            {selectedJob && (
                <JobModal
                    job={selectedJob}
                    isOpen={!!selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
};

export default Saved;
