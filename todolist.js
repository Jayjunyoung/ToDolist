const insert = document.querySelector('#inputstart');
const button = document.querySelector('.insert');
const newbutton = document.querySelector('.newinsert');
//selector는 해당하는 그 하나를 가져온다
const todo = document.querySelector('.todo-list');
const liElem = document.querySelectorAll('.todo-item');//모든 li 배열


const change = document.querySelectorAll('.change');//수정버튼
const finish = document.querySelectorAll('.complete');//완료버튼

const checkbox = document.querySelectorAll('.checkbox');
const todos = document.querySelectorAll('.todo');
let modifyTarget; //모디파이 타겟을 전역으로 만듬

//addEventListener : 이벤트 등록 함수


const TODOLIST = "TODOLIST";



let wholetodos = [];//저장되는걸 담을 배열 공간


function loadtodo() { //자동으로 화면에 로컬스토리지의 값이 나오도록 하는 함수
    const todolist = localStorage.getItem(TODOLIST);
    if(todolist !== null) {
        const parsedtodos = JSON.parse(todolist);

        parsedtodos.forEach(function (todo) {  
            addlist(todo.text);
        });
    }

}



const init = () => {
    insert.addEventListener('keypress', function(e) {
        if( e.key === 'Enter') {
            addlist(insert.value);
        }
    })
    loadtodo();
}

init(); //엔터키를 누르면 적용되는 함수


button.addEventListener('click', function() {
    let li = insert.value;
    addlist(li);
});



function addlist(text) {
    if(text === '') {
        return //입력안하면 빠져나가도록 
    }
    const id = '' + (wholetodos.length + 1);
    const newLi = document.createElement('li');
    newLi.id = id;
    newLi.className = 'todo-item';
    newLi.innerHTML = `<div class="checkbox"></div> 
    <div class="todo">${text}</div> <button class="delBtn">삭제</button>  <button class="change">수정</button>  <button class="complete">완료</button>` 
    todo.appendChild(newLi); //ul에 새로만든 li를 집어넣는다
    insert.value = ''; //값을 추가하면 입력칸에는 값이 안뜨게 할거야

    //새로 입력한 값에 대해서도 삭제 할수 있도록 하기
    /*
    const shows = todo.querySelectorAll('.delBtn'); //입력한 값에 대해서도 삭제 할수 있도록 했다!
    shows.forEach(show => {
        show.addEventListener('click', (e) => {
            
        let li = e.target.parentNode;
        li.remove();
        
        deletetodo(li);
        });
    });
    */

    const todoObj = {
        text: text,
        id: id


    };
    
    
    wholetodos.push(todoObj); 
    const local = localStorage.getItem(TODOLIST);
    for(i = 0; i < local.length; i++) {
        if(todoObj.id === local[i].id) {
            const todoObj2 = {
                text: text,
                id: id + "1"
            };
            wholetodos.push(todoObj2);
            savelist();
        }
    }
    savelist();

    delbutton = newLi.querySelector('.delBtn');
    delbutton.addEventListener('click', deletetodo);

    //새로 입력한 값에 대해서도 완료 버튼 눌렀을시 적용 될 수 있도록 하기
    const completeButtons = todo.querySelectorAll('.complete');//입력한 값에 대해서 완료 할수 있도록
    completeButtons.forEach(complete => {
        complete.addEventListener('click', (e) => {
            let check = e.target.parentNode;
            const checkbox = check.querySelector('.checkbox');
            check.style.color = 'darkgray';
            checkbox.innerText = '✔';
        });
    });
    //새로 입력한 값에 대해서도 수정 버튼 눌렀을시 적용 될 수 있도록
    const updateButtons = todo.querySelectorAll('.change');
    updateButtons.forEach(update => {
        update.addEventListener('click', (e) => {
            let upgrade = e.target.parentNode; //현재 클릭한 버튼의 li가 담기겠지
            modifyTarget = upgrade.querySelector('.todo');
            insert.value = modifyTarget.innerText; //이전 값이 인풋란에 뜸 
        })
    })
    newbutton.addEventListener('click', function() {
        const insert = document.querySelector('#inputstart');
        let li = insert.value;
        update(li);
    })


    
}


//하나만 삭제 로직
/*
    현재 클릭한 버튼의 부모 html태그를 remove에 할당(즉 li)
    li의 부모인 ul을 parent 변수에 할당
    parent에서 li를 리무브 차일드 해버리기!
*/  
/*delbutton.forEach(del => {
    del.addEventListener('click', function (e) {
        let remove = e.target.parentNode;//li
        let parent = remove.parentNode;//ul
        parent.removeChild(remove);
    });
});
*/


function deletetodo(event) { 
    event.preventDefault();
    const li = event.target.parentNode;

    todo.removeChild(li);

    //왜 filter에서 새로운 배열로 만들어지지않을까? -> li의 id를 못가져옴
    const deleteTodos = wholetodos.filter(function(todo) {
        return todo.id !== li.id;
    });

    console.log(deleteTodos); //여기서 작동이 안됌
    wholetodos = deleteTodos;

    savelist();

}



//완료버튼 - 완료 버튼 누르면 회색으로 바뀌고 V체크 되도록
finish.forEach(fin => {
    fin.addEventListener('click', function(e) {
        let check = e.target.parentNode;
        const checkbox = check.querySelector('.checkbox');
        check.style.color = 'darkgray';
        checkbox.innerText = '✔';
    });
})

//수정하기 
//수정누르고 다시 값을 친다음 버튼 누르면 내용이 바껴야함
change.forEach(chabutton => {
    chabutton.addEventListener('click', function(e) {
        let upgrade = e.target.parentNode; //현재 클릭한 버튼의 li가 담기겠지
        modifyTarget = upgrade.querySelector('.todo');//그 li의 todo가 담겨
        insert.value = modifyTarget.innerText; //그 todo의 이너텍스트를 입력란에 뜨도록
    });
});

//수정 누르고 적용하는 새로운 버튼 (V)
/*
newbutton.addEventListener('click', function () {
    const insert = document.querySelector('#inputstart');
    let li = insert.value; //입력란에 있는 값
    update(li); // 입력란에 있는 값 넘김
});
*/
/*
알고리즘: 
수정버튼 눌러 -> 이전 값이 떠 -> 수정 후 V체크 선택 
-> modifiyTarget에는 선택한 버튼의 부모노드 li가 담기고
그 li의 .todo를 담아와 -> 담아온 .todo의 innerText에 입력한 값 대입 
 */
function update(text) { //매개변수엔 전에 입력한 값이 들어가있음
    modifyTarget.innerText = text;//입력란에 넣은 값을 그 li todo값에 대입
    let li = modifyTarget.parentNode;
    let local = localStorage.getItem(TODOLIST);
    if(li.id === local.id) {
        local.text = li.text;
    }
    
    savelist();

}

function savelist() {
    localStorage.setItem(TODOLIST, JSON.stringify(wholetodos));
}