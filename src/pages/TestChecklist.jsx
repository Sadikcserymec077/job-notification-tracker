import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const testItems = [
    { id: 'prefs', label: 'Preferences persist after refresh', how: 'Set preferences in Settings, refresh, and check if they are still there.' },
    { id: 'score', label: 'Match score calculates correctly', how: 'Verify match score badge on Dashboard matches expectations.' },
    { id: 'toggle', label: '"Show only matches" toggle works', how: 'Toggle the switch on Dashboard and verify filtering.' },
    { id: 'save', label: 'Save job persists after refresh', how: 'Save a job, refresh /saved page, and verify it remains.' },
    { id: 'apply', label: 'Apply opens in new tab', how: 'Click Apply and verify it opens a new browser tab.' },
    { id: 'statusPersist', label: 'Status update persists after refresh', how: 'Change status, refresh, and verify it stays.' },
    { id: 'statusFilter', label: 'Status filter works correctly', how: 'Filter by Applied/Rejected and verify results.' },
    { id: 'digestScore', label: 'Digest generates top 10 by score', how: 'Generate digest and verify jobs are ranked by match score.' },
    { id: 'digestPersist', label: 'Digest persists for the day', how: 'Generate digest, refresh, and verify it persists.' },
    { id: 'console', label: 'No console errors on main pages', how: 'Open browser DevTools and verify no red errors.' },
];

const TestChecklist = () => {
    const [checklist, setChecklist] = useState(() => {
        const saved = localStorage.getItem('jt_test_checklist');
        return saved ? JSON.parse(saved) : {};
    });

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('jt_test_checklist', JSON.stringify(checklist));
    }, [checklist]);

    const handleToggle = (id) => {
        setChecklist(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const passedCount = Object.values(checklist).filter(Boolean).length;
    const allPassed = passedCount === testItems.length;

    const resetStatus = () => {
        if (window.confirm('Reset all test statuses?')) {
            setChecklist({});
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 animate-fade-in">
            <div className="border-b pb-6 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-primary mb-2">Test Checklist</h1>
                    <p className="text-secondary text-lg">Validate every core feature before final deployment.</p>
                </div>
                <button
                    onClick={resetStatus}
                    className="text-xs text-muted hover:text-accent underline uppercase tracking-widest font-bold"
                >
                    Reset Test Status
                </button>
            </div>

            {/* Result Summary */}
            <div className={`p-8 rounded-xl mb-12 border transition-all duration-300 ${allPassed ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-serif font-bold text-primary">
                        Tests Passed: {passedCount} / {testItems.length}
                    </span>
                    {allPassed ? (
                        <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Ready to Ship</span>
                    ) : (
                        <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">In Progress</span>
                    )}
                </div>

                {!allPassed && (
                    <p className="text-amber-800 font-medium">
                        Resolve all issues before shipping.
                    </p>
                )}
                {allPassed && (
                    <p className="text-green-800 font-medium">
                        All checks complete. Proceed to the ship section.
                    </p>
                )}

                <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${allPassed ? 'bg-green-600' : 'bg-accent'}`}
                        style={{ width: `${(passedCount / testItems.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Checklist List */}
            <div className="card space-y-4">
                {testItems.map((item) => (
                    <div
                        key={item.id}
                        className={`group flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${checklist[item.id] ? 'bg-white border-green-200 shadow-sm' : 'bg-gray-50 border-transparent hover:border-gray-300'}`}
                        onClick={() => handleToggle(item.id)}
                    >
                        <div className={`mt-1 w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${checklist[item.id] ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-gray-300 group-hover:border-accent'}`}>
                            {checklist[item.id] && (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className={`font-bold transition-colors ${checklist[item.id] ? 'text-primary' : 'text-secondary'}`}>
                                {item.label}
                            </h3>
                            <div className="relative mt-1 inline-block">
                                <span className="text-xs text-muted cursor-help border-b border-dotted border-gray-400">
                                    How to test?
                                </span>
                                <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-gray-900 text-white text-[11px] rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 leading-relaxed">
                                    {item.how}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Ship Trigger */}
            <div className="mt-12 flex justify-center">
                <button
                    disabled={!allPassed}
                    onClick={() => navigate('/jt/08-ship')}
                    className={`btn px-12 py-4 h-auto text-lg shadow-lg transition-all duration-300 ${allPassed ? 'btn-primary' : 'bg-gray-200 text-gray-400 cursor-not-allowed border-none'}`}
                >
                    {allPassed ? 'Proceed to Shipping →' : 'Unlock Ship Section (10/10)'}
                </button>
            </div>
        </div>
    );
};

export default TestChecklist;
