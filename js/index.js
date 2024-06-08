const secondSemester = ['webapp', 'hci', 'deep'];
const firstSemester = ['infosys', 'cogcomp', 'digital', 'machine', 'cyber', 'law'];

function generateSection(title, containerId, subjects)
{
    const content = document.getElementById('content');

    if (subjects.length > 0) 
    {
        const divider = document.createElement('div');
        divider.className = 'divider';
        content.appendChild(divider);

        const header = document.createElement('h2');
        header.textContent = title;
        content.appendChild(header);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.id = containerId;
        buttonsContainer.className = 'buttons-container';
        content.appendChild(buttonsContainer);

        subjects.forEach(subject => {
            const button = document.createElement('a');
            button.href = `quiz.html?page=${subject}`;
            button.className = 'button';
            button.textContent = `${pageTitles[subject]} Quiz`;
            buttonsContainer.appendChild(button);
        });
    }
}

generateSection('Second semester', 'second-semester', secondSemester);
generateSection('First semester', 'first-semester', firstSemester);

document.querySelectorAll('.buttons-container .button').forEach(button => 
{
	if (!button.classList.contains('no-event')) 
	{
		button.addEventListener('click', function(event) 
		{
			event.preventDefault(); // Prevent default link behavior

			// Get current URL
			let url = new URL(this.href);

			// Add parameters based on checkbox values
			if (document.getElementById('allQuestion').checked) {
				url.searchParams.append('allQuestion', document.getElementById('allQuestion').value);
			}
			if (document.getElementById('noShuffle').checked) {
				url.searchParams.append('noShuffle', document.getElementById('noShuffle').value);
			}

			// Redirect to the new URL
			window.location.href = url.toString();
		});
	}
});

