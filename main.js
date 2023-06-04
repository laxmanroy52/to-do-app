'use strict';


//declare all important variable
let header = document.querySelector('header');
let task = document.getElementsByClassName('task')[0];
let logo = document.querySelector('.logo');
let todo = document.getElementById('todo');
let getText = document.getElementsByTagName('input')[0];
let getDate = document.getElementsByTagName('input')[1];
let create = document.getElementById('button');
let main = document.getElementsByTagName('main')[0];
let list = document.getElementsByClassName('list');
let rem = document.querySelector('.rem');
let notice = document.querySelector('.notice');
let startX, startY, offsetX = 0, offsetY = 0;
let date, time, second;
let count = 0;
let select;


//set initial time
getDate.value = new Date().toLocaleTimeString().slice(0, -3);
//double text not allowed
let doubleText = function() {
  let x = 0;
  let val = getText.value.trim().replace((/\s+/gm), ' ');
  let num, con;
  num = list.length;
  num = (num == 0) ? 1 : num;
  setDone: while (x < num) {
    if (list[x]) {
    con = list[x].firstElementChild.innerText.trim().replace((/\s+/gm), ' ') != val;
      if (!con) {
        break setDone;
      }
    } else {
      con = true;
    }
    x++;
  }
  return con;
  }
//new task
function button(e) {
  //blank text or white space disallowed
 if (getText.value.trim().replace(/\s+/gm, '') != '' && doubleText()) {
  count++;
  todo.parentNode.style.height = '80px';
  //create new task
  let taskElement = document.createElement('div');
  taskElement.classList.add('list');
  taskElement.innerHTML = `
      <div class="text" onclick="see(this)">${getText.value}</div>
      <div class="date">${getDate.value}</div>
      <div class="done" onclick="done(this)">√</div>
      <div class="delete" onclick="del(this)">×</div>
    `;
  main.appendChild(taskElement);

  task.innerText = 'Task: ' + count;
  task.style.fontSize = '100%';
  //set header when first task create
  header.style = 'height: 50px; border-bottom-width: 2px; justify-content: space-around';
  logo.style.fontSize = '100%';
  getText.value = null;
  // Wait for the next frame to apply the transition
  taskElement.style.animation = 'expandTask 0.2s forwards';
  //set button animation
  e.style.scale = '.9';
  setTimeout(function(){
    e.style.scale = '1';
  },200);
  
  select = document.querySelectorAll('.date');
  }
}
// ellipsis text view as notice
function see(e) {
  let text = e.parentNode.parentNode.children[0].lastElementChild.children[2];
    e.parentNode.parentNode.firstElementChild.style = `top: ${e.parentNode.offsetTop + e.parentNode.offsetHeight + 15}px`;
     text.innerText = e.innerText;
     if (text.offsetHeight <= 30) {
     text.style.lineHeight = '30px';
     } else {
       text.style.lineHeight = '20px';
     }
}

// done task 
function done(e) {
  e.style.backgroundColor = 'white';
  e.style.color = 'green';
  e.parentNode.firstElementChild.style.textDecoration = 'line-through';
  navigator.vibrate(300);
}
// delete task
function del(e) {
  //task count minus
  count--;
  //add task count
  task.innerText = 'Task: ' + count;
  let item = e.parentNode.parentNode.firstElementChild;
  //add remove animation
  e.parentNode.style.zIndex = '2';
  e.parentNode.style.animation = 'removeTask .2s ease-out';
  e.parentNode.style.marginTop = '-42px';

  //when selected up task delete
  if (item.offsetTop > e.parentNode.offsetTop) {
  item.style = `top: ${item.offsetTop - (e.parentNode.offsetHeight + 5)}px`;
  } else {
    item.style = `top: ${item.offsetTop}px`;
  }
  //when selected task delete notice will be removed
  if (item.lastElementChild.children[2].innerText != e.parentNode.firstElementChild.innerText) {
    setTimeout(function(){
      e.parentNode.remove();
    }, 200);
    
  } else {
    setTimeout(function() {
      e.parentNode.remove();
    }, 200);
    item.style = `top: -${item.offsetHeight+15}px`;
  }
  //when delete last task it get default
  if (count == 0) {
    header.style = 'height: 100vh; font-size: 200%;';
    todo.parentNode.style.height = 0;
    task.innerText = '';
    item.style.top = `-${item.offsetHeight+15}px`;
  }
}

//remove ellipsis text notice bar
function cross(e) {
  e.parentNode.parentNode.style.top = -(e.parentNode.parentNode.offsetHeight + 15) + 'px';
}
//when time come task done and vibrate
setInterval(function(){
  date = new Date();
  second = date.getSeconds();
  time = date.toLocaleTimeString().slice(0, -3);
  for (let x = 0; x < count; x++) {
    if (time == select[x].innerText && (second == 0)) {
  select[x].parentNode.children[2].style.backgroundColor = 'white';
  select[x].parentNode.children[2].style.color = 'green';
  select[x].parentNode.firstElementChild.style.textDecoration = 'line-through';
  navigator.vibrate(300);
}
}
}, 1000);

setInterval(function(){
  if (getText.value.trim().replace(/\s+/gm, ' ').length > 0 && doubleText()) {
    create.style.color = 'white';
  } else {
    create.style.color = 'rgba(0,0,0,.4)';
  }
}, 50);