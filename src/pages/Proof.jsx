import React from 'react';

const Proof = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="w-24 h-24 mb-6 rounded-full bg-green-50 flex items-center justify-center">
                <svg className="w-12 h-12 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <h2 className="text-3xl font-serif text-primary">Artifact Collection Pending</h2>
            <p className="text-lg text-secondary max-w-sm mx-auto">
                Verify your build artifacts here.
            </p>
        </div>
    );
};

export default Proof;
