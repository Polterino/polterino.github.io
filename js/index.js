// function to generate buttons given a title and an array of objects (faculties)
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
			button.textContent = `${pageTitles[subject]}`;
			buttonsContainer.appendChild(button);
		});
	}
}

// change default list value if there's a cookie
const cookieSelectedFaculty = getCookie('selectedFaculty');
// Set the default selected option in the dropdown list
if (cookieSelectedFaculty)
{
    const facultySelect = document.getElementById('facultySelect');

    // remove selected attribute
    const options = facultySelect.querySelectorAll('option');
    options.forEach(option => {
        option.removeAttribute('selected');
    });

    const option = facultySelect.querySelector(`option[value="${cookieSelectedFaculty}"]`);
    if (option) {
        option.selected = true;
    }
}

// generate buttons on default selected value
faculty_selected = document.getElementById('facultySelect').value;
if (faculties[faculty_selected]) 
{
	if(faculties[faculty_selected].fourthSemester)
		generateSection('Fourth semester', 'fourth-semester', faculties[faculty_selected].fourthSemester);
	if(faculties[faculty_selected].thirdSemester)
		generateSection('Third semester', 'third-semester', faculties[faculty_selected].thirdSemester);
	if(faculties[faculty_selected].secondSemester)
		generateSection('Second semester', 'second-semester', faculties[faculty_selected].secondSemester);
	if(faculties[faculty_selected].firstSemester)
		generateSection('First semester', 'first-semester', faculties[faculty_selected].firstSemester);
}

// event listener to change homepage content based on the selected faculty
document.getElementById('facultySelect').addEventListener('change', function() 
{
	const selectedFaculty = this.value;
	const content = document.getElementById('content');
	content.innerHTML = ''; // Clear previous content

	if (faculties[selectedFaculty]) 
	{
		if(faculties[selectedFaculty].thirdSemester)
			generateSection('Third semester', 'third-semester', faculties[selectedFaculty].thirdSemester);
		if(faculties[selectedFaculty].secondSemester)
			generateSection('Second semester', 'second-semester', faculties[selectedFaculty].secondSemester);
		if(faculties[selectedFaculty].firstSemester)
			generateSection('First semester', 'first-semester', faculties[selectedFaculty].firstSemester);
	}

	setCookie('selectedFaculty', selectedFaculty, 365);

	// event listener to redirect adding a GET parameter
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
});

document.addEventListener("DOMContentLoaded", function ()
{
	// event listener to redirect adding a GET parameter
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
});