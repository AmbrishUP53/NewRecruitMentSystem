
document.addEventListener('DOMContentLoaded', function () {
    const appliedJobsSection = document.querySelector('.applied-jobs');

    // Fetch applied jobs if needed (you can use an API to fetch these, for now assuming they are already rendered in EJS)
    const appliedJobs = []; // This should be dynamically fetched or rendered

    if (appliedJobs.length > 0) {
        appliedJobsSection.innerHTML = '';
        appliedJobs.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.classList.add('job-item');
            jobElement.innerHTML = `
                <h3>${job.title}</h3>
                <p>${job.description}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
            `;
            appliedJobsSection.appendChild(jobElement);
        });
    } else {
        appliedJobsSection.innerHTML = '<p>No applied jobs yet.</p>';
    }
});
