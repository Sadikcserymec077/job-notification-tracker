import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [preferences, setPreferences] = useState({
        roleKeywords: '',
        preferredLocations: '',
        preferredMode: {
            Remote: false,
            Hybrid: false,
            Onsite: false
        },
        experienceLevel: '',
        skills: '',
        minMatchScore: 40
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Ensure array for modes is converted back if needed or handled properly
                // Let's assume structure: { roleKeywords: string, ... preferredMode: { Remote: bool, ... } }
                // If stored as array of strings ["Remote"], convert back to object
                if (Array.isArray(parsed.preferredMode)) {
                    const modeObj = { Remote: false, Hybrid: false, Onsite: false };
                    parsed.preferredMode.forEach(m => { modeObj[m] = true; });
                    parsed.preferredMode = modeObj;
                }
                setPreferences(prev => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error("Failed to parse preferences", e);
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setPreferences(prev => ({
                ...prev,
                preferredMode: {
                    ...prev.preferredMode,
                    [name]: checked
                }
            }));
        } else {
            setPreferences(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSliderChange = (e) => {
        setPreferences(prev => ({ ...prev, minMatchScore: parseInt(e.target.value) }));
    };

    const handleSave = () => {
        // Convert preferredMode object back to array for easier consumption elsewhere
        const modeArray = Object.keys(preferences.preferredMode).filter(key => preferences.preferredMode[key]);

        const savePayload = {
            ...preferences,
            preferredMode: modeArray // Save as ["Remote", "Hybrid"]
        };

        localStorage.setItem('jobTrackerPreferences', JSON.stringify(savePayload));
        setMessage('Preferences saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    // Helper to keep form state consistent with storage format on save vs edit
    // Actually, let's keep it simple: storage has array, form has object.

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in p-4 pb-24">
            <div className="border-b pb-4 mb-8">
                <h1 className="text-4xl font-serif font-bold text-primary mb-2">Settings</h1>
                <p className="text-secondary text-lg">Define your job search parameters.</p>
            </div>

            {message && (
                <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                    {message}
                </div>
            )}

            <div className="card space-y-8 bg-surface p-8 rounded-xl border-none shadow-sm">

                {/* Role Keywords */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-primary">Role Keywords</label>
                    <input
                        type="text"
                        name="roleKeywords"
                        value={preferences.roleKeywords}
                        onChange={handleChange}
                        placeholder="e.g. Frontend, React, Product Designer"
                        className="input w-full p-4 text-lg border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
                    />
                    <p className="text-sm text-secondary">Separate multiple keywords with commas.</p>
                </div>

                {/* Locations */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-primary">Preferred Locations</label>
                    <input
                        type="text"
                        name="preferredLocations"
                        value={preferences.preferredLocations}
                        onChange={handleChange}
                        placeholder="e.g. Bangalore, Mumbai, Remote"
                        className="input w-full p-4 text-lg border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
                    />
                    <p className="text-sm text-secondary">Separate multiple locations with commas.</p>
                </div>

                {/* Work Mode */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-primary">Work Mode</label>
                    <div className="flex gap-4">
                        {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                            <label key={mode} className="cursor-pointer group flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name={mode}
                                    checked={preferences.preferredMode[mode]}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
                                />
                                <span className="text-secondary font-medium">{mode}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-primary">Experience Level</label>
                    <select
                        name="experienceLevel"
                        value={preferences.experienceLevel}
                        onChange={handleChange}
                        className="input w-full p-4 text-lg border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent bg-white"
                    >
                        <option value="">Select Level</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1 Years">0-1 Years</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                    </select>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-primary">Key Skills</label>
                    <input
                        type="text"
                        name="skills"
                        value={preferences.skills}
                        onChange={handleChange}
                        placeholder="e.g. Java, Python, AWS"
                        className="input w-full p-4 text-lg border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
                    />
                    <p className="text-sm text-secondary">Separate multiple skills with commas.</p>
                </div>

                {/* Min Match Score */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-primary">
                        Minimum Match Score: {preferences.minMatchScore}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={preferences.minMatchScore}
                        onChange={handleSliderChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
                    />
                    <div className="flex justify-between text-xs text-secondary">
                        <span>0 (Show All)</span>
                        <span>50 (Balanced)</span>
                        <span>100 (Strict)</span>
                    </div>
                </div>

                <div className="pt-8 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="btn btn-primary text-lg px-8 py-3 h-auto"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
