const indianCompanies = [
    "Infosys", "TCS", "Wipro", "Accenture", "Capgemini", "Cognizant",
    "IBM", "Oracle", "SAP", "Dell",
    "Amazon", "Flipkart", "Swiggy", "Razorpay", "PhonePe", "Paytm",
    "Zoho", "Freshworks", "Juspay", "CRED"
];

const roles = [
    "SDE Intern", "Graduate Engineer Trainee", "Junior Backend Developer",
    "Frontend Intern", "QA Intern", "Data Analyst Intern",
    "Java Developer", "Python Developer", "React Developer",
    "Full Stack Developer", "Cloud Engineer"
];

const locations = ["Bangalore", "Hyderabad", "Pune", "Chennai", "Gurgaon", "Noida", "Mumbai", "Remote"];
const modes = ["Remote", "Hybrid", "Onsite"];
const experienceLevels = ["Fresher", "0-1 Years", "1-3 Years", "3-5 Years"];
const sources = ["LinkedIn", "Naukri", "Indeed", "Instahyre"];
const salaryRanges = ["3-5 LPA", "6-10 LPA", "10-18 LPA", "₹15k-₹40k/month Internship", "20-30 LPA"];

const skillsMap = {
    "SDE Intern": ["Java", "DSA", "Problem Solving"],
    "Graduate Engineer Trainee": ["C++", "Python", "SQL"],
    "Junior Backend Developer": ["Node.js", "Express", "MongoDB"],
    "Frontend Intern": ["React", "HTML/CSS", "JavaScript"],
    "QA Intern": ["Selenium", "Java", "Manual Testing"],
    "Data Analyst Intern": ["Python", "SQL", "Excel"],
    "Java Developer": ["Java", "Spring Boot", "Microservices"],
    "Python Developer": ["Python", "Django", "Flask"],
    "React Developer": ["React", "Redux", "TypeScript"],
    "Full Stack Developer": ["React", "Node.js", "AWS"],
    "Cloud Engineer": ["AWS", "Azure", "Docker"]
};

// Helper to generate a consistent hash-based random number
const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const generateJob = (id) => {
    const seed = id * 12345; // Deterministic seed

    const company = indianCompanies[Math.floor(seededRandom(seed) * indianCompanies.length)];
    const role = roles[Math.floor(seededRandom(seed + 1) * roles.length)];
    const location = locations[Math.floor(seededRandom(seed + 2) * locations.length)];
    const mode = modes[Math.floor(seededRandom(seed + 3) * modes.length)];
    const experience = experienceLevels[Math.floor(seededRandom(seed + 4) * experienceLevels.length)];
    const source = sources[Math.floor(seededRandom(seed + 5) * sources.length)];
    const salary = salaryRanges[Math.floor(seededRandom(seed + 6) * salaryRanges.length)];
    const postedDaysAgo = Math.floor(seededRandom(seed + 7) * 11); // 0-10 days

    // Construct a description based on role
    const descTemplate = `We are looking for a talented ${role} to join our Engineering team at ${company}. You will be responsible for developing scalable applications and working closely with cross-functional teams. This is a ${mode} opportunity based in ${location}. Ideally, you should have strong problem-solving skills and experience with modern technologies. Knowledge of agile methodologies is a plus. Apply now to kickstart your career with us!`;

    // Default skills if exact match not found
    const skills = skillsMap[role] || ["Java", "Python", "JavaScript"];

    return {
        id: `job_${id}`,
        title: role,
        company: company,
        location: location,
        mode: mode,
        experience: experience,
        skills: skills,
        source: source,
        postedDaysAgo: postedDaysAgo,
        salaryRange: salary,
        applyUrl: "https://www.linkedin.com/jobs", // Placeholder
        description: descTemplate
    };
};

const jobs = Array.from({ length: 60 }, (_, i) => generateJob(i + 1));

export default jobs;
