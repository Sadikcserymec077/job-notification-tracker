import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobsData from '../data/jobs';
import { calculateMatchScore } from '../utils/scoring';
import { getStatusLog } from '../utils/status';

const Digest = () => {
    const [digest, setDigest] = useState(null);
    const [statusLog, setStatusLog] = useState([]);
    const [hasPreferences, setHasPreferences] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load Status Log
        setStatusLog(getStatusLog());

        // Check preferences
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (!savedPrefs) {
            setHasPreferences(false);
            setLoading(false);
            return;
        }
        setHasPreferences(true);

        // Check for existing daily digest
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const storageKey = `jobTrackerDigest_${today}`;
        const savedDigest = localStorage.getItem(storageKey);

        if (savedDigest) {
            setDigest(JSON.parse(savedDigest));
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, []);

    const generateDigest = () => {
        setLoading(true);

        // 1. Get Preferences
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (!savedPrefs) return;
        const prefs = JSON.parse(savedPrefs);

        // 2. Score all jobs
        const scoredJobs = jobsData.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, prefs)
        }));

        // 3. Filter minimum threadhold
        const relevantJobs = scoredJobs.filter(j => j.matchScore > 0);

        // 4. Sort: Match Score DESC, then Date ASC
        relevantJobs.sort((a, b) => {
            if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
            return a.postedDaysAgo - b.postedDaysAgo;
        });

        // 5. Take top 10
        const top10 = relevantJobs.slice(0, 10);

        // 6. Store
        const today = new Date().toISOString().split('T')[0];
        const digestData = {
            date: today,
            jobs: top10,
            generatedAt: new Date().toISOString()
        };

        const storageKey = `jobTrackerDigest_${today}`;
        localStorage.setItem(storageKey, JSON.stringify(digestData));

        // Simulate processing delay
        setTimeout(() => {
            setDigest(digestData);
            setLoading(false);
        }, 800);
    };

    const copyDigestToClipboard = () => {
        if (!digest) return;

        const text = digest.jobs.map(j =>
            `${j.title} at ${j.company}\nLocation: ${j.location} (${j.mode})\nMatch: ${j.matchScore}%\nApply: ${j.applyUrl}\n`
        ).join('\n---\n\n');

        const header = `My 9AM Job Digest - ${digest.date}\n\n`;
        navigator.clipboard.writeText(header + text);
        alert('Digest copied to clipboard!');
    };

    const emailDigest = () => {
        if (!digest) return;
        const subject = encodeURIComponent(`My 9AM Job Digest - ${digest.date}`);

        const bodyText = digest.jobs.map(j =>
            `${j.title} at ${j.company}%0D%0ALocation: ${j.location} (${j.mode})%0D%0AMatch: ${j.matchScore}%%0D%0AApply: ${j.applyUrl}%0D%0A`
        ).join('%0D%0A---%0D%0A%0D%0A');

        const body = encodeURIComponent(`Here are my top 10 matched jobs for today:\n\n`) + bodyText;

        window.open(`mailto:?subject=${subject}&body=${body}`);
    };

    if (!hasPreferences) {
        return (
            <div className="container mx-auto px-4 max-w-2xl py-20 text-center animate-fade-in">
                <div className="bg-surface p-8 rounded-xl border border-dashed text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-primary mb-2">Setup Required</h2>
                    <p className="text-secondary mb-6">Define your preferences to generate a personalized daily digest.</p>
                    <Link to="/settings" className="btn btn-primary px-6">Go to Settings</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 max-w-3xl py-12 min-h-screen">

            {!digest && (
                <div className="text-center py-12 animate-fade-in">
                    <h1 className="text-4xl font-serif font-bold text-primary mb-4">Daily Digest</h1>
                    <p className="text-secondary text-lg mb-8">
                        Get your top 10 matched jobs delivered in a clean, distraction-free format.
                    </p>

                    <button
                        onClick={generateDigest}
                        disabled={loading}
                        className="btn btn-primary text-lg px-8 py-4 h-auto transition-all"
                    >
                        {loading ? 'Generating...' : "Generate Today's 9AM Digest (Simulated)"}
                    </button>

                    <p className="text-xs text-muted mt-4">
                        Demo Mode: Daily 9AM trigger simulated manually.
                    </p>
                </div>
            )}

            {/* Status History Section */}
            {statusLog.length > 0 && (
                <div className="mb-12 animate-fade-in">
                    <h3 className="text-lg font-serif font-bold text-primary mb-4 border-b pb-2">Recent Status Updates</h3>
                    <div className="bg-white rounded-lg border overflow-hidden">
                        {statusLog.map((log, index) => (
                            <div key={index} className="p-4 border-b last:border-0 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div>
                                    <h4 className="font-bold text-sm text-primary">{log.title}</h4>
                                    <p className="text-xs text-secondary">{log.company}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block text-xs font-bold px-2 py-1 rounded 
                                        ${log.status === 'Applied' ? 'bg-blue-100 text-blue-800' : ''}
                                        ${log.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}
                                        ${log.status === 'Selected' ? 'bg-green-100 text-green-800' : ''}
                                        ${log.status === 'Not Applied' ? 'bg-gray-100 text-gray-800' : ''}
                                    `}>
                                        {log.status}
                                    </span>
                                    <p className="text-[10px] text-gray-400 mt-1">
                                        {new Date(log.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Digest View */}
            {digest && (
                <div className="animate-fade-in">
                    {/* Controls */}
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={() => setDigest(null)} className="text-sm text-secondary hover:text-primary">
                            &larr; Back
                        </button>
                        <div className="flex gap-3">
                            <button onClick={copyDigestToClipboard} className="btn btn-copy text-sm">
                                Copy to Clipboard
                            </button>
                            <button onClick={emailDigest} className="btn btn-secondary text-sm">
                                Email Draft
                            </button>
                        </div>
                    </div>

                    {/* Email Card Container */}
                    <div className="bg-white border text-primary rounded-none shadow-sm max-w-2xl mx-auto overflow-hidden">

                        {/* Header */}
                        <div className="bg-gray-50 p-8 border-b text-center">
                            <h2 className="text-2xl font-serif font-bold text-primary mb-1">Top 10 Jobs For You</h2>
                            <p className="text-secondary uppercase tracking-wider text-xs font-bold">
                                9AM Digest • {digest.date}
                            </p>
                        </div>

                        {/* Body */}
                        <div className="p-8 space-y-8">
                            {digest.jobs.length === 0 ? (
                                <div className="text-center py-8 text-secondary">
                                    No matching roles found today. check back tomorrow!
                                </div>
                            ) : (
                                digest.jobs.map((job, idx) => (
                                    <div key={job.id} className="pb-6 border-b last:border-0 last:pb-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-primary leading-tight">
                                                    {idx + 1}. {job.title}
                                                </h3>
                                                <div className="text-secondary text-sm mt-1">
                                                    {job.company} • {job.location}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold">
                                                    {job.matchScore}% Match
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center mt-3">
                                            <span className="text-xs text-muted">
                                                {job.experience} • {job.salaryRange}
                                            </span>
                                            <a
                                                href={job.applyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-accent text-sm font-bold hover:underline"
                                            >
                                                Apply Now &rarr;
                                            </a>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 p-6 border-t text-center">
                            <p className="text-xs text-muted">
                                This digest was generated based on your preferences.<br />
                                Job Notification Tracker • {digest.date}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Digest;
