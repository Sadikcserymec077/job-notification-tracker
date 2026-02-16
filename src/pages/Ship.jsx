import React from 'react';
import { Navigate } from 'react-router-dom';

const Ship = () => {
    const checklist = JSON.parse(localStorage.getItem('jt_test_checklist') || '{}');
    const passedCount = Object.values(checklist).filter(Boolean).length;
    const allPassed = passedCount === 10;

    if (!allPassed) {
        return <Navigate to="/jt/07-test" replace />;
    }

    return (
        <div className="max-w-4xl mx-auto py-20 px-4 text-center animate-fade-in">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-4xl font-serif font-bold text-primary mb-4">Ready for Launch</h1>
            <p className="text-secondary text-xl mb-12 max-w-2xl mx-auto">
                All 10 quality checks have passed. Your Job Notification Tracker is battle-tested and ready for production.
            </p>

            <div className="card max-w-lg mx-auto p-12 bg-surface text-left border-t-4 border-accent">
                <h3 className="text-lg font-bold mb-6 text-primary flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Final Ship Checklist
                </h3>
                <ul className="space-y-4 text-sm text-secondary">
                    <li className="flex gap-2">
                        <span className="text-green-600">✓</span> Build optimized production bundle
                    </li>
                    <li className="flex gap-2">
                        <span className="text-green-600">✓</span> Verify environment variables
                    </li>
                    <li className="flex gap-2">
                        <span className="text-green-600">✓</span> Run final lighthouse performance audit
                    </li>
                    <li className="flex gap-2">
                        <span className="text-green-600">✓</span> Trigger deployment workflow
                    </li>
                </ul>

                <div className="mt-8 pt-8 border-t border-gray-100">
                    <button
                        onClick={() => window.print()}
                        className="btn btn-primary w-full h-12"
                    >
                        Generate Deployment Report
                    </button>
                    <p className="text-xs text-muted mt-3 text-center">
                        Authorized by KodNest Premium Build System
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Ship;
