import React, { useState, useEffect } from 'react';
import jobsData from '../data/jobs';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import JobModal from '../components/JobModal';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        mode: '',
        experience: '',
        source: ''
    });

    useEffect(() => {
        // Simulate loading a "fresh dataset"
        const loadJobs = () => {
            setLoading(true);
            setTimeout(() => {
                setJobs(jobsData);
                setFilteredJobs(jobsData);
                setLoading(false);
            }, 800); // 800ms loading simulation
        };
        loadJobs();
    }, []);

    useEffect(() => {
        let result = jobs;

        if (filters.search) {
            const q = filters.search.toLowerCase();
            result = result.filter(job =>
                job.title.toLowerCase().includes(q) ||
                job.company.toLowerCase().includes(q)
            );
        }

        if (filters.location) {
            result = result.filter(job => job.location === filters.location);
        }

        if (filters.mode) {
            result = result.filter(job => job.mode === filters.mode);
        }

        if (filters.experience) {
            result = result.filter(job => job.experience === filters.experience);
        }

        if (filters.source) {
            result = result.filter(job => job.source === filters.source);
        }

        setFilteredJobs(result);
    }, [filters, jobs]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleView = (job) => {
        setSelectedJob(job);
    };

    const handleSave = (job) => {
        const saved = JSON.parse(localStorage.getItem('savedJobs')) || [];
        if (!saved.some(j => j.id === job.id)) {
            localStorage.setItem('savedJobs', JSON.stringify([...saved, job]));
            alert(`Saved ${job.title} at ${job.company}`);
        } else {
            alert('Already saved!');
        }
    };

    return (
        <div className="min-h-screen pb-12">
            <div className="py-8 bg-[var(--color-bg)]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h1 className="text-4xl font-serif font-bold text-primary mb-2">Dashboard</h1>
                    <p className="text-secondary text-lg">Your personalized job feed.</p>
                </div>
            </div>

            <FilterBar onFilterChange={handleFilterChange} />

            <div className="container mx-auto px-4 max-w-7xl">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <div key={n} className="h-64 bg-gray-200 rounded-lg"></div>
                        ))}
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-serif text-secondary">No jobs match your filters.</h3>
                        <button
                            onClick={() => setFilters({ search: '', location: '', mode: '', experience: '', source: '' })}
                            className="btn btn-secondary mt-4"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                        {filteredJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onView={handleView}
                                onSave={handleSave}
                            />
                        ))}
                    </div>
                )}
            </div>

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

export default Dashboard;
