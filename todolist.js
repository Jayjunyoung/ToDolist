const insert = document.querySelector('#inputstart');
const button = document.querySelector('.insert');
//selector는 해당하는 그 하나를 가져온다
const todo = document.querySelector('.todo-list');
const liElem = document.querySelectorAll('.todo-item');
const delbutton = document.querySelectorAll('.delBtn');
const change = document.querySelectorAll('.change');
const finish = document.querySelectorAll('.complete');

const checkbox = document.querySelectorAll('.checkbox');
const todos = document.querySelectorAll('.todo');

//addEventListener : 이벤트 등록 함수

button.addEventListener('click', function() {
    let li = insert.value;
    addlist(li);
});

function addlist(li) {
    if(li === '') {
        return //입력안하면 빠져나가도록 
    }
    const newLi = document.createElement('li');
    newLi.className = 'todo-item';
    newLi.innerHTML = `<div class="checkbox"></div> 
    <div class="todo">${li}</div> <button class="delBtn">삭제</button>  <button class="change">수정</button>  <button class="complete">완료</button>` 
    todo.appendChild(newLi); //ul에 새로만든 li를 집어넣는다
    insert.value = ''; //값을 추가하면 입력칸에는 값이 안뜨게 할거야
    const shows = todo.querySelectorAll('.delBtn'); //입력한 값에 대해서도 삭제 할수 있도록 했다!
    shows.forEach(show => {
        show.addEventListener('click', (e) => {
            let remove = e.target.parentNode;
            let parent = remove.parentNode;
            parent.removeChild(remove);
        })
    })
    const completeButtons = todo.querySelectorAll('.complete');
    completeButtons.forEach(complete => {
        complete.addEventListener('click', (e) => {
            let check = e.target.parentNode;
            check.style.color = 'darkgray';
        });
    });
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

//완료버튼 - 완료 버튼 누르면 회색으로 바뀌도록 했음
finish.forEach(fin => {
    fin.addEventListener('click', function(e) {
        let check = e.target.parentNode;
        check.style.color = 'darkgray';
    });
})


//수정하기 
//수정누르고 다시 값을 친다음 버튼 누르면 내용이 바껴야함
change.forEach(chabutton => {
    chabutton.addEventListener('click', function(e) {
        let upgrade = e.target.parentNode; //li가 담기겠지
        const result = upgrade.querySelector('.todo');
        insert.value = result.innerText; //.todo에 있는 글자를 가져오기 위해 이걸 썼다
        //수정버튼 누르면 이전값이 입력란에 떠
        //이걸 어케 기존값에 업데이트 할까
    });
})


