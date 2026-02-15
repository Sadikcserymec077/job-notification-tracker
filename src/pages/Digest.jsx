import React from 'react';

const Digest = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="w-24 h-24 mb-6 rounded-full bg-blue-50 flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>

            <h2 className="text-3xl font-serif text-primary">Your daily digest</h2>
            <p className="text-lg text-secondary max-w-sm mx-auto">
                Your curated list will appear here at 9AM.
            </p>
        </div>
    );
};

export default Digest;
