import React from 'react';

const Saved = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="w-24 h-24 mb-6 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            </div>

            <h2 className="text-3xl font-serif text-primary">No saved jobs yet</h2>
            <p className="text-lg text-secondary max-w-sm mx-auto">
                Bookmark interesting opportunities to review later.
            </p>
        </div>
    );
};

export default Saved;
