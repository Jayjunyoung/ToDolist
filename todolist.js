const insert = document.querySelector('#inputstart');
const button = document.querySelector('.insert');
//selector는 해당하는 그 하나를 가져온다
const todo = document.querySelector('.todo-list');
const liElem = document.querySelectorAll('.todo-item');
const delbutton = document.querySelectorAll('.delBtn');

const checkbox = document.querySelector('.checkbox');
const todos = document.querySelector('.todo')

//addEventListener : 이벤트 등록 함수

//할 일 추가 로직  - 추가는되는데 css형식이 안따라오네
button.addEventListener('click', function() {
    const li = insert.value;
    addlist(li);
});

function addlist(li) {
    const newLi = document.createElement('li');
    newLi.className = 'todo-item';
    newLi.innerHTML = `<div class="checkbox"></div> 
    <div class="todo">${li}</div> <button class="delBtn">삭제</button>  <button class="change">수정</button>  <button class="complete">완료</button>` 
    todo.appendChild(newLi);
    insert.value = ''; //값을 추가하면 입력칸에는 값이 안뜨게 할거야
    const shows = todo.querySelectorAll('.delBtn'); //입력한 값에 대해서도 삭제 할수 있도록 했다!
    shows.forEach(show => {
        show.addEventListener('click', (e) => {
            let remove = e.target.parentNode;
            let parent = remove.parentNode;
            parent.removeChild(remove);
        })
    })
}


//하나만 삭제 로직
/*
    현재 클릭한 버튼의 부모 html태그를 remove에 할당(즉 li)
    li의 부모인 ul을 parent 변수에 할당
    parent에서 li를 리무브 차일드 해버리기!
*/  
delbutton.forEach(del => {
    del.addEventListener('click', function (e) {
        let remove = e.target.parentNode;
        let parent = remove.parentNode;
        parent.removeChild(remove);
    });
});


