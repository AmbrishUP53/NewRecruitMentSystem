// postJob.js

document.addEventListener('DOMContentLoaded', function () {
    const postJobForm = document.querySelector('form');

    if (postJobForm) {
        postJobForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission for now

            const formData = new FormData(postJobForm);

            // Send a POST request to post a new job
            fetch('/post-job', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Job posted successfully!');
                    window.location.href = '/search-job'; // Redirect to the search jobs page after posting
                } else {
                    alert('Something went wrong. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error posting job:', error);
                alert('Error posting job. Please try again later.');
            });
        });
    }
});
