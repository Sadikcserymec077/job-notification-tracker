import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';

const Saved = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const jobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
        setSavedJobs(jobs);
    }, []);

    const handleRemove = (jobId) => {
        const updated = savedJobs.filter(j => j.id !== jobId);
        setSavedJobs(updated);
        localStorage.setItem('savedJobs', JSON.stringify(updated));
    };

    return (
        <div className="container mx-auto px-4 max-w-7xl min-h-[80vh] py-12">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-serif font-bold text-primary mb-3">Saved Jobs</h1>
                <p className="text-secondary text-lg">Your bookmarked opportunities.</p>
            </div>

            {savedJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="w-24 h-24 mb-6 rounded-full bg-red-50 flex items-center justify-center animate-bounce">
                        <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-serif text-primary mb-2">No Saved Jobs Yet</h2>
                    <p className="text-secondary mb-6 max-w-md text-center">
                        Jobs you save from the dashboard will appear here for easy access.
                    </p>
                    <a href="#/dashboard" className="btn btn-primary px-8">
                        Browse Jobs
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                    {savedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onView={setSelectedJob}
                            onSave={() => handleRemove(job.id)} // Reuse save/remove logic or just alert
                        // Actually reusing JobCard for Saved context might need a different "Action" or just handle "Save" as "Unsave"
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
