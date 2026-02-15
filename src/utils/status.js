export const getJobStatuses = () => {
    try {
        const stored = localStorage.getItem('jobTrackerStatus');
        return stored ? JSON.parse(stored) : {};
    } catch (e) {
        return {};
    }
};

export const updateJobStatus = (job, newStatus) => {
    // 1. Update Status Map
    const statuses = getJobStatuses();
    statuses[job.id] = newStatus;
    localStorage.setItem('jobTrackerStatus', JSON.stringify(statuses));

    // 2. Log to History (for Digest)
    const logKey = 'jobTrackerStatusLog';
    const log = JSON.parse(localStorage.getItem(logKey) || '[]');

    const newLogEntry = {
        jobId: job.id,
        title: job.title,
        company: job.company,
        status: newStatus,
        date: new Date().toISOString()
    };

    // Prepend and limit to 50
    const updatedLog = [newLogEntry, ...log].slice(0, 50);
    localStorage.setItem(logKey, JSON.stringify(updatedLog));

    return statuses;
};

export const getStatusLog = () => {
    return JSON.parse(localStorage.getItem('jobTrackerStatusLog') || '[]');
};
