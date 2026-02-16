import React from 'react';
import { NavLink } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-4 animate-fade-in">
            <div className="space-y-4 max-w-2xl px-4">
                <h1 className="text-4xl md:text-7xl font-serif font-bold text-primary tracking-tight leading-tight">
                    Stop Missing The<br />Right Jobs.
                </h1>
                <p className="text-xl text-secondary max-w-lg mx-auto leading-relaxed">
                    Precision-matched job discovery delivered daily at 9AM.
                </p>
            </div>

            <NavLink
                to="/settings"
                className="btn btn-primary text-lg px-8 py-3 h-auto transition-all"
            >
                Start Tracking
            </NavLink>
        </div>
    );
};

export default Landing;
