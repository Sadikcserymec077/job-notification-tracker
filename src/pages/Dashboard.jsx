import React, { useState, useEffect, useMemo } from 'react';
import jobsData from '../data/jobs';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import JobModal from '../components/JobModal';
import { calculateMatchScore, parseSalary } from '../utils/scoring';
import { getJobStatuses, updateJobStatus } from '../utils/status';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [preferences, setPreferences] = useState(null);
    const [statuses, setStatuses] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        status: '', // New filter
        sort: 'latest'
    });
    const [showOnlyMatches, setShowOnlyMatches] = useState(false);
    const [toast, setToast] = useState(null); // { message: string, visible: bool }

    // Load preferences and initial jobs
    useEffect(() => {
        const loadData = () => {
            setLoading(true);

            const savedPrefs = localStorage.getItem('jobTrackerPreferences');
            const prefs = savedPrefs ? JSON.parse(savedPrefs) : null;
            setPreferences(prefs);

            // Load Statuses
            setStatuses(getJobStatuses());

            setTimeout(() => {
                const jobsWithScores = jobsData.map(job => ({
                    ...job,
                    matchScore: prefs ? calculateMatchScore(job, prefs) : 0
                }));

                setJobs(jobsWithScores);
                setLoading(false);
            }, 600);
        };
        loadData();
    }, []);

    // Filter and Sort Logic
    const filteredJobs = useMemo(() => {
        let result = [...jobs];

        // 1. Basic Filters
        if (filters.search) {
            const q = filters.search.toLowerCase();
            result = result.filter(job =>
                job.title.toLowerCase().includes(q) ||
                job.company.toLowerCase().includes(q)
            );
        }
        if (filters.location) result = result.filter(job => job.location === filters.location);
        if (filters.mode) result = result.filter(job => job.mode === filters.mode);
        if (filters.experience) result = result.filter(job => job.experience === filters.experience);
        if (filters.source) result = result.filter(job => job.source === filters.source);

        // 2. Status Filter
        if (filters.status) {
            if (filters.status === 'Not Applied') {
                result = result.filter(job => !statuses[job.id] || statuses[job.id] === 'Not Applied');
            } else {
                result = result.filter(job => statuses[job.id] === filters.status);
            }
        }

        // 3. Preferences Match Toggle
        if (showOnlyMatches && preferences) {
            const threshold = preferences.minMatchScore || 40;
            result = result.filter(job => job.matchScore >= threshold);
        }

        // 4. Sorting
        switch (filters.sort) {
            case 'match':
                result.sort((a, b) => b.matchScore - a.matchScore);
                break;
            case 'salary':
                result.sort((a, b) => parseSalary(b.salaryRange) - parseSalary(a.salaryRange));
                break;
            case 'latest':
            default:
                result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
                break;
        }

        return result;
    }, [jobs, filters, showOnlyMatches, preferences, statuses]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleStatusChange = (jobId, newStatus) => {
        const job = jobs.find(j => j.id === jobId);
        if (!job) return;

        // Update utility function
        updateJobStatus(job, newStatus);

        // Update local state
        setStatuses(prev => ({ ...prev, [jobId]: newStatus }));

        // Show Toast
        setToast(`Status updated: ${newStatus}`);
        setTimeout(() => setToast(null), 3000);
    };

    const handleView = (job) => setSelectedJob(job);

    const handleSave = (job) => {
        const saved = JSON.parse(localStorage.getItem('savedJobs')) || [];
        if (!saved.some(j => j.id === job.id)) {
            localStorage.setItem('savedJobs', JSON.stringify([...saved, job]));
            alert(`Saved ${job.title}`);
        } else {
            alert('Already saved!');
        }
    };

    return (
        <div className="min-h-screen pb-12 relative">
            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in">
                    <span className="font-medium">{toast}</span>
                    <button onClick={() => setToast(null)} className="text-gray-400 hover:text-white">&times;</button>
                </div>
            )}

            {/* Header Section */}
            <div className="py-8 bg-[var(--color-bg)]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h1 className="text-4xl font-serif font-bold text-primary mb-2">Dashboard</h1>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <p className="text-secondary text-lg">Your personalized job feed.</p>

                        {/* Show Matches Toggle */}
                        {preferences && (
                            <label className="flex items-center gap-3 bg-surface px-4 py-2 rounded-lg border cursor-pointer hover:border-accent transition-colors">
                                <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                                    <input
                                        type="checkbox"
                                        checked={showOnlyMatches}
                                        onChange={(e) => setShowOnlyMatches(e.target.checked)}
                                        className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer translate-x-1 checked:translate-x-5 checked:bg-accent transition-transform duration-200 top-1"
                                        style={{ backgroundColor: showOnlyMatches ? 'var(--color-accent)' : '#ccc' }}
                                    />
                                </div>
                                <span className="font-medium text-primary text-sm">
                                    Show only matches &gt; {preferences.minMatchScore}%
                                </span>
                            </label>
                        )}
                    </div>
                </div>
            </div>

            {!preferences && !loading && (
                <div className="container mx-auto px-4 max-w-7xl mb-8">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
                        <div>
                            <h3 className="text-xl font-serif font-bold mb-1">Set your preferences</h3>
                            <p className="text-gray-300">Activate intelligent matching to find the perfect role matching your skills.</p>
                        </div>
                        <Link to="/settings" className="btn bg-white text-gray-900 hover:bg-gray-100 border-none font-bold px-6">
                            Configure Matching
                        </Link>
                    </div>
                </div>
            )}

            <FilterBar onFilterChange={handleFilterChange} />

            <div className="container mx-auto px-4 max-w-7xl">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <div key={n} className="h-64 bg-gray-200 rounded-lg"></div>
                        ))}
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-surface border rounded-xl border-dashed">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-serif text-primary font-bold mb-2">No matches found</h3>
                        <p className="text-secondary mb-6 text-center max-w-md">
                            We couldn't find any roles matching your current criteria. <br />Try adjusting your filters or lowering your match threshold.
                        </p>
                        <button
                            onClick={() => {
                                setFilters({ search: '', location: '', mode: '', experience: '', source: '', status: '', sort: 'latest' });
                                setShowOnlyMatches(false);
                            }}
                            className="btn btn-secondary"
                        >
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                        {filteredJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                matchScore={job.matchScore}
                                onView={handleView}
                                onSave={handleSave}
                                status={statuses[job.id]}
                                onStatusChange={handleStatusChange}
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
