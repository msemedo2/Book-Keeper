const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkFrom = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// Show Modal, Focus on Input
function showModal() {
	modal.classList.add('show-modal');
	websiteNameEl.focus();
}

// Hide Modal
function hideModal() {
	modal.classList.remove('show-modal');
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', hideModal);
document.addEventListener('click', (e) => {
	e.target === modal ? hideModal() : false;
});

// Validate Form
function validate(nameValue, urlValue) {
	const expression =
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
	let regex = new RegExp(expression);
	if (!nameValue || !urlValue) {
		alert('Please submit values for both fields.');
		return false;
	}
	if (!urlValue.match(regex)) {
		alert('Please provide a valid web adress');
		return false;
	}
	// Valid
	return true;
}

// Build Bookmarks DOM
function buildBookmarks() {
	// Build Items
	bookmarks.forEach((bookmark) => {
		const { name, url } = bookmark;
		// Item
		const item = document.createElement('div');
		item.classList.add('item');
		// Close Icon
		const closeIcon = document.createElement('i');
		closeIcon.classList.add('fas', 'fa-times');
		closeIcon.setAttribute('title', 'Delete Bookmark');
		closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
		// Favicon / Link Container
		const linkInfo = document.createElement('div');
		linkInfo.classList.add('name');
		// Favicon
		const favicon = document.createElement('img');
		favicon.setAttribute(
			'src',
			`https://www.google.com/s2/u/0/favicons?domain=${url}`
		);
		favicon.setAttribute('alt', 'Favicon');
		// Link
		const link = document.createElement('a');
		link.setAttribute('href', `${url}`);
		link.setAttribute('target', '_blank');
		link.textContent = name;
		// Append to bookmarks container
		linkInfo.append(favicon, link);
		item.append(closeIcon, linkInfo);
		bookmarksContainer.appendChild(item);
	});
}

// Fetch Bookmarks
function fetchBookmarks() {
	// Get bookmarks from localStorage if available
	if (localStorage.getItem('bookmarks')) {
		bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	} else {
		// Create Bookmarks array in localStorage
		bookmarks = [
			{
				name: 'Miguel Semedo',
				url: 'http://miguelsemedo.com',
			},
		];
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	buildBookmarks();
}

// Handle Data from Form
function storeBookmark(e) {
	e.preventDefault();
	const nameValue = websiteNameEl.value;
	let urlValue = websiteUrlEl.value;

	if (!urlValue.includes('http://', 'https://')) {
		urlValue = `https://${urlValue}`;
	}
	console.log(nameValue, urlValue);
	if (!validate(nameValue, urlValue)) {
		return false;
	}

	const bookmark = {
		name: nameValue,
		url: urlValue,
	};
	bookmarks.push(bookmark);
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmarks();
	bookmarkFrom.reset();
	websiteNameEl.focus();
}

// Event Listener
bookmarkFrom.addEventListener('submit', storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();
