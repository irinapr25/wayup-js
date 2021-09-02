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

const tabsDop = document.getElementById('tabs-dop');
const contentDop = document.querySelectorAll('.content-dop');

const changeClassDop = el => {
	for(i = 0; i < contentDop.length; i++) {
		tabsDop.children[i].classList.remove('active');
	}
	el.classList.add('active');
}

tabsDop.addEventListener('click', e => {
	const currTabDop = e.target.dataset.btndop;
	changeClassDop(e.target);
	for(i = 0; i < contentDop.length; i++) {
		contentDop[i].classList.remove('active');
		if(contentDop[i].dataset.contentdop === currTabDop) {
			contentDop[i].classList.add('active');
		}
	}
})
