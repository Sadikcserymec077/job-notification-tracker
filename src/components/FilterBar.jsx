import React from 'react';

const FilterBar = ({ onFilterChange }) => {
    return (
        <div className="bg-surface border-b sticky top-[64px] z-40 py-4 mb-8">
            <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row gap-4 items-center justify-between">

                {/* Search */}
                <div className="relative w-full md:w-1/4">
                    <input
                        type="text"
                        placeholder="Search role/company..."
                        className="input pl-10 h-10 text-sm"
                        onChange={(e) => onFilterChange('search', e.target.value)}
                    />
                    <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 items-center no-scrollbar">
                    <select
                        className="input w-auto h-10 text-sm py-0 pl-3 pr-8 min-w-[100px]"
                        onChange={(e) => onFilterChange('location', e.target.value)}
                    >
                        <option value="">Location</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Noida">Noida</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Remote">Remote</option>
                    </select>

                    <select
                        className="input w-auto h-10 text-sm py-0 pl-3 pr-8 min-w-[100px]"
                        onChange={(e) => onFilterChange('mode', e.target.value)}
                    >
                        <option value="">Mode</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Onsite">Onsite</option>
                    </select>

                    <select
                        className="input w-auto h-10 text-sm py-0 pl-3 pr-8 min-w-[100px]"
                        onChange={(e) => onFilterChange('experience', e.target.value)}
                    >
                        <option value="">Exp.</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1 Years">0-1 Years</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                    </select>

                    <select
                        className="input w-auto h-10 text-sm py-0 pl-3 pr-8 min-w-[100px]"
                        onChange={(e) => onFilterChange('source', e.target.value)}
                    >
                        <option value="">Source</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Naukri">Naukri</option>
                        <option value="Indeed">Indeed</option>
                    </select>

                    <select
                        className="input w-auto h-10 text-sm py-0 pl-3 pr-8 min-w-[100px]"
                        onChange={(e) => onFilterChange('status', e.target.value)}
                    >
                        <option value="">Status: All</option>
                        <option value="Not Applied">Not Applied</option>
                        <option value="Applied">Applied</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Selected">Selected</option>
                    </select>

                    {/* Sort Toggle */}
                    <div className="w-px h-6 bg-gray-300 mx-1 hidden md:block"></div>

                    <select
                        className="input w-auto h-10 text-sm py-0 pl-3 pr-8 min-w-[120px] font-medium text-primary border-accent/20 bg-accent/5 focus:border-accent"
                        onChange={(e) => onFilterChange('sort', e.target.value)}
                    >
                        <option value="latest">Sort: Latest</option>
                        <option value="match">Sort: Match Score</option>
                        <option value="salary">Sort: Salary</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
