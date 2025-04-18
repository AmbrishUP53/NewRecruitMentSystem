// Function to show the popup
function showPopup(jobId) {
    document.getElementById('popup-' + jobId).style.display = 'block';
}

// Function to apply the job (disables the button and stores in DB)
function applyJob(jobId) {
    // Disable the Apply button and change its text to "Applied"
    document.getElementById('apply-btn-' + jobId).disabled = true;
    document.getElementById('apply-btn-' + jobId).innerText = 'Applied';

    // Send a POST request to the backend to apply for the job
    fetch('/apply/' + jobId, {
        method: 'POST',
    }).then(response => {
        if (response.ok) {
            // Redirect to dashboard after applying
            window.location.href = '/dashboard';
        }
    }).catch(error => {
        console.error('Error applying for job:', error);
    });
}
