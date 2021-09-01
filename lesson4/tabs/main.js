const tabs = document.getElementById('tabs');
const content = document.querySelectorAll('.content');

const changeClass = el => {
	for(i = 0; i < tabs.children.length; i++) {
		tabs.children[i].classList.remove('active');
	}
	el.classList.add('active');
}

tabs.addEventListener('click', e => {
	const currTab = e.target.dataset.btn;
	changeClass(e.target);
	for(i = 0; i < content.length; i++) {
		content[i].classList.remove('active');
		if(content[i].dataset.content === currTab) {
			content[i].classList.add('active');
		}
	}
})

const contentTabs = document.getElementById('content-tabs');

const changeTabClass = elem => {
	for(i = 0; i < contentTabs.children.length; i++) {
		contentTabs.children[i].classList.remove('active-tab');
	}
	elem.classList.add('active-tab');
}

contentTabs.addEventListener('click', e => {
	const currContentTab = e.target.dataset.more;
	changeTabClass(e.target);
})