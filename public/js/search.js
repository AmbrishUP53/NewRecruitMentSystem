document.addEventListener('DOMContentLoaded', function () {
    const applyButtons = document.querySelectorAll('.btn');

    applyButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const jobId = button.getAttribute('data-job-id');

            // Create overlay and popup
            const popupBackground = document.createElement('div');
            popupBackground.classList.add('popup-background');

            const popup = document.createElement('div');
            popup.classList.add('popup');
            popup.innerHTML = `
                <p>Are you sure you want to apply for this job?</p>
                <button id="confirmApply">Yes, Apply</button>
                <button id="cancelApply">Cancel</button>
            `;

            document.body.appendChild(popupBackground);
            document.body.appendChild(popup);

            // Event: Cancel
            document.getElementById('cancelApply').addEventListener('click', () => {
                popup.remove();
                popupBackground.remove();
            });

            // Event: Confirm Apply
            document.getElementById('confirmApply').addEventListener('click', () => {
                // Immediately remove popup
                popup.remove();
                popupBackground.remove();

                // Disable the apply button and update text
                button.textContent = 'Applied';
                button.disabled = true;

                // Send apply request to server
                fetch(`/apply?jobId=${jobId}`, {
                    method: 'GET'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            console.log('Applied successfully');
                        } else {
                            alert('Failed to apply.');
                            // Re-enable if error
                            button.disabled = false;
                            button.textContent = 'Apply Now';
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        alert('Something went wrong!');
                        button.disabled = false;
                        button.textContent = 'Apply Now';
                    });
            });
        });
    });
});
