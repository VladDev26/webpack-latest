import './styles/index.scss';
import './index.html';


const postsUrl = 'http://localhost:3000/posts';

document.addEventListener("DOMContentLoaded", () => {

let limit = 3;

const add = document.getElementById('add');
add.addEventListener('click', addPost);
const list = document.getElementById('list');



function rerenderList(){
	getPosts().then(posts => {
		renderList(posts);
	});
}
rerenderList();


function removePost(postID){
	fetch(postsUrl + '/' + postID, {
		method: 'delete'
	})
	.then(() => { rerenderList() });
}


function showMore(){
	const button = document.createElement('a');
	button.classList = 'list-group-item list-group-item-action list-group-item-warning text-center d-block';
	button.setAttribute('href', '#');
	button.setAttribute('id', 'showMore');
	button.addEventListener('click', e => {
		e.preventDefault();
		limit += 1;
		rerenderList();
	});
	button.innerText = 'show more';
	return button;
}


function renderList(arr){
	list.innerHTML = '';
	if(!arr.length) return;
	
	if(limit >= arr.length){
		limit = arr.length;
		generate();
	}else{
		generate();
		list.appendChild(showMore());
	}
	function generate(){
		for(let i = 0; i < limit; i++){
			genPost(arr[i], list); 
		}
	}
	
	console.log('length: ', arr.length);
	console.log('limit: ', limit);
}


function genPost(post, container){
	let li = document.createElement('li');
	let closeBtn = document.createElement('button');
	closeBtn.setAttribute('class', 'close');
	closeBtn.setAttribute('type', 'button');
	closeBtn.setAttribute('aria-label', 'Close');
	closeBtn.innerHTML = '<span aria-hidden="true">&times;</span>';
	closeBtn.addEventListener('click', () => {removePost(post.id)});
		
	li.classList = 'list-group-item text-muted justify-content-between';
	li.innerHTML = `
		<div>
			<span class="badge badge-default badge-pill">${post.id}</span>
			${post.author}
		</div>
	`;
	li.appendChild(closeBtn);
	container.appendChild(li);
}


function getPosts(){
	return fetch(postsUrl).then(a => a.json());
}


function addPost(){
	limit += 1;

	const body = JSON.stringify({ author: "gook", title: 'superGook' });

	fetch(postsUrl, {
		method: 'post',
		headers: {  "Content-type": "application/json; charset=UTF-8"  },  
	    body
	})
	.then(() => { rerenderList() });
}




});

