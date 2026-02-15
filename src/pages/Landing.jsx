import React from 'react';
import { NavLink } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fade-in">
            <div className="space-y-4 max-w-2xl px-4">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary tracking-tight leading-tight">
                    Stop Missing The<br />Right Jobs.
                </h1>
                <p className="text-xl text-secondary font-light max-w-lg mx-auto leading-relaxed">
                    Precision-matched job discovery delivered daily at 9AM.
                </p>
            </div>

            <NavLink
                to="/settings"
                className="btn btn-primary text-lg px-8 py-4 h-auto rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
                Start Tracking
            </NavLink>
        </div>
    );
};

export default Landing;
