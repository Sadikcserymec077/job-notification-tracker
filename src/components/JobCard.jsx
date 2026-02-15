import React from 'react';

const JobCard = ({ job, onView, onSave }) => {
    return (
        <div className="card bg-surface border hover:border-accent transition-colors duration-200">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-serif font-bold text-primary">{job.title}</h3>
                    <p className="text-secondary font-medium">{job.company}</p>
                </div>
                <span className="badge badge-neutral text-xs">{job.source}</span>
            </div>

            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-secondary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location} • {job.mode}
                </div>

                <div className="flex items-center gap-2 text-sm text-secondary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {job.experience} • {job.salaryRange}
                </div>

                <div className="text-xs text-muted pt-1">
                    Posted {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => onView(job)}
                    className="btn btn-secondary flex-1 text-sm h-9"
                >
                    View Details
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onSave(job);
                    }}
                    className="btn btn-secondary w-10 px-0 flex items-center justify-center h-9 text-secondary hover:text-accent hover:border-accent"
                    title="Save Job"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </button>
                <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary flex-1 text-sm h-9 no-underline flex items-center justify-center"
                >
                    Apply
                </a>
            </div>
        </div>
    );
};

export default JobCard;
