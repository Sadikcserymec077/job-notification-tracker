import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/saved', label: 'Saved' },
        { path: '/digest', label: 'Digest' },
        { path: '/settings', label: 'Settings' },
        { path: '/jt/07-test', label: 'Test' },
        { path: '/proof', label: 'Proof' },
    ];

    const getLinkClasses = ({ isActive }) => {
        const baseClasses = "px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2";
        if (isActive) {
            return `${baseClasses} border-accent text-accent`;
        }
        return `${baseClasses} border-transparent text-secondary hover:text-primary hover:border-gray-300`;
    };

    const getMobileLinkClasses = ({ isActive }) => {
        const baseClasses = "block px-4 py-3 text-base font-medium transition-colors duration-200 border-l-4";
        if (isActive) {
            return `${baseClasses} border-accent text-accent bg-surface`;
        }
        return `${baseClasses} border-transparent text-secondary hover:text-primary hover:bg-gray-50`;
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-primary font-sans flex flex-col">
            {/* Navigation Bar */}
            <nav className="bg-surface border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">

                        {/* Logo */}
                        <div className="flex items-center">
                            <span className="text-xl font-serif font-bold text-accent tracking-tight">
                                Job Notification Tracker
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden sm:flex sm:items-center sm:space-x-8">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={getLinkClasses}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center sm:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                                aria-controls="mobile-menu"
                                aria-expanded={isMenuOpen}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="sm:hidden border-t" id="mobile-menu">
                        <div className="pt-2 pb-3 space-y-1 bg-surface shadow-lg">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={getMobileLinkClasses}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
