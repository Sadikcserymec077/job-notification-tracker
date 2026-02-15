import React from 'react';

const PagePlaceholder = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <h1 className="text-4xl font-serif font-bold text-primary">{title}</h1>
            <p className="text-lg text-secondary opacity-70">
                This section will be built in the next step.
            </p>
        </div>
    );
};

export default PagePlaceholder;
