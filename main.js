'use strict';

let header = document.querySelector('header');
let task = document.getElementsByClassName('task')[0];
let logo = document.querySelector('.logo');
let todo = document.getElementById('todo');
let getText = document.getElementsByTagName('input')[0];
let getDate = document.getElementsByTagName('input')[1];
let create = document.getElementById('button');
let main = document.getElementsByTagName('main')[0];
let rem = document.querySelector('.rem');
let notice = document.querySelector('.notice');
let startX, startY, offsetX = 0, offsetY = 0;
let date, time, second;
let count = 0;
let select;

create.addEventListener('click', function() {
  count++;
  todo.parentNode.style.height = '80px';
  main.innerHTML += `<div id="list"><div class="text" onclick="see(this)">${getText.value}</div><div class="date">${getDate.value}</div><div class="done" onclick="done(this)">√</div><div class="delete" onclick="del(this)">×</div></div>`;
  task.innerText = 'Task: ' + count;
  task.style.fontSize = '100%';
  header.style = 'height: 50px; border-bottom-width: 2px; justify-content: space-around';
  logo.style.fontSize = '100%';
  getText.value = null;
  getDate.value = '12:00';
  select = document.querySelectorAll('.date');
})

function see(e) {
    e.parentNode.parentNode.firstElementChild.style = `left: 50%; top: ${e.parentNode.offsetTop + e.parentNode.offsetHeight + 15}px`;
     e.parentNode.parentNode.children[0].lastElementChild.children[2].innerText = e.innerText;
}
function done(e) {
  e.style.opacity = '.5';
  e.parentNode.firstElementChild.style.textDecoration = 'line-through';
  navigator.vibrate(300);
}
function del(e) {
  count--;
  task.innerText = 'Task: ' + count;
  let item = e.parentNode.parentNode.firstElementChild;
  if (item.offsetTop > e.parentNode.offsetTop) {
  item.style = `left: 50%; top: ${item.offsetTop - e.parentNode.offsetHeight - 5}px`;
  } else {
    item.style = `left: 50%; top: ${item.offsetTop}px`;
  }
  if (item.lastElementChild.children[2].innerText != e.parentNode.firstElementChild.innerText) {
    e.parentNode.remove();
  } else {
    e.parentNode.remove();
    item.style = 'left: -50%; top: -50%';
  }
  
  if (count == 0) {
    header.style = 'height: 100vh; font-size: 200%;';
    todo.parentNode.style.height = 0;
    task.innerText = '';
    item.style.top = '-50%';
  }
}
function cross(e) {
  e.parentNode.parentNode.style.top = '-50%';
  
}
setInterval(function(){
  date = new Date();
  second = date.getSeconds();
  time = date.toLocaleTimeString().slice(0, -3);
  for (let x = 0; x < count; x++) {
    if (time == select[x].innerText && second == 0) {
      select[x].parentNode.children[2].style.opacity = '.5';
      select[x].parentNode.firstElementChild.style.textDecoration = 'line-through';
      navigator.vibrate(300);
    }
  }
  con
}, 1000);

