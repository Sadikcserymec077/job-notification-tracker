import React from 'react';

const Settings = () => {
    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="border-b pb-4 mb-8">
                <h1 className="text-4xl font-serif font-bold text-primary mb-2">Settings</h1>
                <p className="text-secondary text-lg">Define your job search parameters.</p>
            </div>

            <div className="card space-y-8 bg-surface p-8 rounded-xl border-none shadow-sm">
                {/* Role Keywords */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-primary">Role Keywords</label>
                    <input
                        type="text"
                        placeholder="e.g. Frontend Engineer, Product Designer"
                        className="input w-full p-4 text-lg border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
                    />
                    <p className="text-sm text-secondary">Separate multiple keywords with commas.</p>
                </div>

                {/* Locations */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-primary">Preferred Locations</label>
                    <input
                        type="text"
                        placeholder="e.g. San Francisco, London, Remote"
                        className="input w-full p-4 text-lg border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
                    />
                </div>

                {/* Work Mode */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-primary">Work Mode</label>
                    <div className="flex gap-4">
                        {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                            <label key={mode} className="cursor-pointer group">
                                <input type="radio" name="mode" className="peer sr-only" />
                                <div className="px-6 py-3 rounded-lg border border-gray-200 text-secondary bg-white peer-checked:bg-accent peer-checked:text-white peer-checked:border-accent transition-all duration-200 hover:border-accent hover:text-accent font-medium">
                                    {mode}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-primary">Experience Level</label>
                    <select className="input w-full p-4 text-lg border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent bg-white">
                        <option>Entry Level (0-2 years)</option>
                        <option>Mid Level (2-5 years)</option>
                        <option>Senior Level (5-8 years)</option>
                        <option>Staff / Principal (8+ years)</option>
                    </select>
                </div>

                <div className="pt-8 flex justify-end">
                    <button className="btn btn-primary text-lg px-8 py-3 h-auto">
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
