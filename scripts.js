const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkFrom = document.getElementById('bookmark-from');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

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
