import React, { useState, useEffect } from 'react';

const Proof = () => {
    const [links, setLinks] = useState(() => {
        const saved = localStorage.getItem('jt_proof_links');
        return saved ? JSON.parse(saved) : { lovable: '', github: '', deployed: '' };
    });

    const [checklist, setChecklist] = useState(() => {
        const saved = localStorage.getItem('jt_test_checklist');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('jt_proof_links', JSON.stringify(links));
    }, [links]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLinks(prev => ({ ...prev, [name]: value }));
    };

    const validateUrl = (url) => {
        try {
            return url.startsWith('http');
        } catch (e) {
            return false;
        }
    };

    // 8 steps status
    const steps = [
        { name: 'Application Skeleton', status: 'Completed' },
        { name: 'Realistic Data Generation', status: 'Completed' },
        { name: 'Dashboard Rendering', status: 'Completed' },
        { name: 'Intelligent Match Engine', status: 'Completed' },
        { name: 'Daily Digest System', status: 'Completed' },
        { name: 'Job Status Tracking', status: 'Completed' },
        { name: 'Advanced Filter Logic', status: 'Completed' },
        { name: 'Built-In Test Checklist', status: 'Completed' }
    ];

    const testsPassed = Object.values(checklist).filter(Boolean).length;
    const allTestsPassed = testsPassed === 10;
    const allLinksProvided = validateUrl(links.lovable) && validateUrl(links.github) && validateUrl(links.deployed);

    const isShipped = allTestsPassed && allLinksProvided;

    const copySubmission = () => {
        const text = `------------------------------------------
Job Notification Tracker — Final Submission

Lovable Project:
${links.lovable}

GitHub Repository:
${links.github}

Live Deployment:
${links.deployed}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
------------------------------------------`;

        navigator.clipboard.writeText(text);
        alert('Submission details copied to clipboard!');
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 animate-fade-in pb-24">
            <div className="border-b pb-6 mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-primary mb-2">Project 1 Proof</h1>
                    <p className="text-secondary text-lg">Artifact Collection — Job Notification Tracker</p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-3">
                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border
                        ${isShipped ? 'bg-green-50 text-green-700 border-green-200' :
                            (allLinksProvided || testsPassed > 0) ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                'bg-gray-50 text-gray-500 border-gray-200'}
                    `}>
                        {isShipped ? 'Shipped' : (allLinksProvided || testsPassed > 0) ? 'In Progress' : 'Not Started'}
                    </span>
                </div>
            </div>

            {isShipped && (
                <div className="mb-10 p-6 bg-green-50 border border-green-100 rounded-xl flex items-center gap-4 animate-fade-in shadow-sm">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-green-900">Project 1 Shipped Successfully.</h3>
                        <p className="text-green-800 text-sm">All artifacts verified and quality checks passed.</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* A) Step Completion Summary */}
                <div className="space-y-6">
                    <h2 className="text-xl font-serif font-bold text-primary">A) Step Completion Summary</h2>
                    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                        {steps.map((step, idx) => (
                            <div key={idx} className="px-6 py-4 border-b last:border-0 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                <span className="text-sm font-medium text-secondary">{idx + 1}. {step.name}</span>
                                <span className="text-[10px] font-bold uppercase text-green-600 bg-green-50 px-2 py-1 rounded">
                                    {step.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-surface p-6 rounded-xl border-none">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-primary">Test Checklist Progress</span>
                            <span className="text-xs text-secondary font-bold">{testsPassed} / 10</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-500 ${allTestsPassed ? 'bg-green-600' : 'bg-accent'}`}
                                style={{ width: `${(testsPassed / 10) * 100}%` }}
                            />
                        </div>
                        {!allTestsPassed && (
                            <p className="text-[10px] text-muted mt-2 italic">
                                * Required: 10/10 to ship.
                            </p>
                        )}
                    </div>
                </div>

                {/* B) Artifact Collection Inputs */}
                <div className="space-y-6">
                    <h2 className="text-xl font-serif font-bold text-primary">B) Artifact Collection</h2>

                    <div className="card space-y-6 p-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-secondary">Lovable Project Link</label>
                            <input
                                type="url"
                                name="lovable"
                                value={links.lovable}
                                onChange={handleInputChange}
                                placeholder="https://lovable.dev/projects/..."
                                className={`input w-full ${links.lovable && !validateUrl(links.lovable) ? 'border-red-300' : 'border-gray-200'}`}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-secondary">GitHub Repository Link</label>
                            <input
                                type="url"
                                name="github"
                                value={links.github}
                                onChange={handleInputChange}
                                placeholder="https://github.com/user/repo"
                                className={`input w-full ${links.github && !validateUrl(links.github) ? 'border-red-300' : 'border-gray-200'}`}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-secondary">Deployed URL</label>
                            <input
                                type="url"
                                name="deployed"
                                value={links.deployed}
                                onChange={handleInputChange}
                                placeholder="https://project.vercel.app"
                                className={`input w-full ${links.deployed && !validateUrl(links.deployed) ? 'border-red-300' : 'border-gray-200'}`}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={copySubmission}
                                disabled={!isShipped}
                                className={`btn w-full h-12 flex items-center justify-center gap-2 transition-all duration-300
                                    ${isShipped ? 'btn-primary' : 'bg-gray-100 text-gray-400 cursor-not-allowed border-none'}
                                `}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                                Copy Final Submission
                            </button>
                            {!isShipped && (
                                <p className="text-[10px] text-center text-muted mt-3">
                                    Copy unlocks only after all links are valid and tests are passed.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proof;
