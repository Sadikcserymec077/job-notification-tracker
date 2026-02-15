import React from 'react';

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="w-24 h-24 mb-6 rounded-full bg-orange-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <h2 className="text-3xl font-serif text-primary">No jobs yet</h2>
            <p className="text-lg text-secondary max-w-sm mx-auto">
                In the next step, you will load a realistic dataset.
            </p>
        </div>
    );
};

export default Dashboard;
