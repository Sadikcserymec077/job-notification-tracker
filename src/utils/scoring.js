/**
 * Calculate the match score for a job based on user preferences.
 * @param {Object} job - The job object.
 * @param {Object} preferences - The user preferences object.
 * @returns {number} The match score (0-100).
 */
export const calculateMatchScore = (job, preferences) => {
    if (!preferences || Object.keys(preferences).length === 0) return 0;

    let score = 0;
    const roleKeywords = (preferences.roleKeywords || '').toLowerCase().split(',').map(s => s.trim()).filter(s => s);
    const preferredLocations = (preferences.preferredLocations || '').toLowerCase().split(',').map(s => s.trim()).filter(s => s);
    const userSkills = (preferences.skills || '').toLowerCase().split(',').map(s => s.trim()).filter(s => s);
    const preferredModes = preferences.preferredMode || []; // Expecting array of strings ["Remote", "Hybrid"]

    // Rule 1: +25 if any roleKeyword appears in job.title (case-insensitive)
    const titleLower = (job.title || '').toLowerCase();
    const hasTitleMatch = roleKeywords.some(keyword => titleLower.includes(keyword));
    if (hasTitleMatch) score += 25;

    // Rule 2: +15 if any roleKeyword appears in job.description
    const descLower = (job.description || '').toLowerCase();
    const hasDescMatch = roleKeywords.some(keyword => descLower.includes(keyword));
    if (hasDescMatch) score += 15;

    // Rule 3: +15 if job.location matches preferredLocations
    const jobLocationLower = (job.location || '').toLowerCase();
    const hasLocationMatch = preferredLocations.some(loc => jobLocationLower.includes(loc));
    if (hasLocationMatch) score += 15;

    // Rule 4: +10 if job.mode matches preferredMode
    // job.mode is a string ("Remote", "Hybrid", "Onsite")
    // preferredMode is an array of checked strings
    if (preferences.preferredMode && preferences.preferredMode.includes(job.mode)) {
        score += 10;
    }

    // Rule 5: +10 if job.experience matches experienceLevel
    // Note: Simple string match for now as requested ("0-1 Years" vs "0-1 Years")
    if (preferences.experienceLevel && job.experience === preferences.experienceLevel) {
        score += 10;
    }

    // Rule 6: +15 if overlap between job.skills and user.skills (any match)
    const jobSkillsLower = (job.skills || []).map(s => s.toLowerCase());
    const hasSkillMatch = userSkills.some(skill => jobSkillsLower.includes(skill));
    if (hasSkillMatch) score += 15;

    // Rule 7: +5 if postedDaysAgo <= 2
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // Rule 8: +5 if source is LinkedIn
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    // Cap score at 100
    return Math.min(score, 100);
};

export const getScoreColorClass = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 60) return 'text-amber-600 bg-amber-100 border-amber-200'; // Amber/Yellow
    if (score >= 40) return 'text-gray-600 bg-gray-100 border-gray-200';   // Neutral
    return 'text-gray-400 bg-gray-50 border-gray-100';                      // Subtle Grey
};

export const parseSalary = (salaryString) => {
    // Simple check for "LPA" or "month" to standardize sorting roughly
    // Extract first number found
    const match = salaryString.match(/(\d+)/);
    if (!match) return 0;

    let val = parseInt(match[0], 10);

    // Normalize "15k" to 15 (if we treat LPA as unit of 1, 15k/month ~ 1.8 LPA -> 1.8)
    // But dataset has "3-5 LPA" (3) and "15k-40k/month" (15).
    // Let's just treat "k" as /100 if comparing to LPA? Or just keep it simple raw number?
    // "3" (LPA) vs "15" (k). 15 > 3. 
    // Ideally convert to LPA. 15k * 12 = 1.8L. 
    // If string contains "month", divide by ~8? (15/8 = 1.8).
    // Or roughly: if "k", divide by 10.

    if (salaryString.toLowerCase().includes('month')) {
        val = val / 10;
    }

    return val;
};
