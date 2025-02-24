const pageTitles = {
	'digital': 'Digital Forensic and Biometrics',
	'cogcomp': 'Cognition and Computation',
	'machine': 'Machine Learning',
	'cyber': 'Cybersecurity',
	'webapp': 'Web Applications',
	'law': 'Law and Data',
	'hci': 'Human Computer interaction',
	'infosys': 'Fundamentals of information systems',
	'ethical': 'Ethical Hacking',
	'deep': 'Deep learning',
	'cyberphysicaliot': 'Cyber physical systems and IOT security',
	'mobile': 'Mobile Security'
};

const faculties = {
	cybersex: {
		thirdSemester: ['ethical', 'cyberphysicaliot', 'mobile'],
		secondSemester: ['webapp', 'hci', 'deep'],
		firstSemester: ['cogcomp', 'digital', 'machine', 'cyber', 'law']
	},
	compfin: {
		thirdSemester: ['law'],
		firstSemester: ['infosys']
	}
};

// To make PWA work
if ("serviceWorker" in navigator)
{
	navigator.serviceWorker.register("/js/service-worker.js")
		.then(() => console.log("Service Worker registered"))
		.catch(err => console.error("Failed to register Service Worker", err));
}


function setCookie(name, value, days) 
{
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) 
{
	const cookieString = document.cookie;
	const cookies = cookieString.split('; ');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split('=');
		if (cookie[0] === name) {
			return cookie[1];
		}
	}
	return null;
}

// Returns whether the app is visited through a browser or it's installed as a PWA
function isPWAInstalled()
{
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
}