// 先更新listState，之後再同步更新DOM
// 存在local storage=================================================
let listState = [];

const STATE_KEY = "todo-list";

// 第一步:先將之前有存在local storage的資料讀取出來
function loadState() {
  const listState = localStorage.getItem(STATE_KEY);
  if (listState !== null) {
    //如果local storage裡面有東西的話，用JSON.parse將字串轉成物件
    return JSON.parse(listState);
  }
  return []; //如果沒有東西的話就直接return[]
}

// 第二步:將有變動的todo-list存進local storage => 將Array轉成字串並存到local storag
function saveState(list) {
  localStorage.setItem(STATE_KEY, JSON.stringify(list));
}

// 第三步:除了將local storage的資料讀取出來之外，還要將資料rendom到畫面上
function initList() {
  // loadState
  listState = loadState(); //將local storage中原有的資料讀取出來且更新到listState
  // rendor list
  const ul = document.getElementById("list");
  // ==================================================把items寫入html===========================================================
  for (const item of listState) {
    const li = document.createElement("li");
    li.innerText = item.text;

    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete");
    deleteButton.onclick = deleteItem;
    li.appendChild(deleteButton);

    li.classList.add("item");
    if (item.checked) {
      li.classList.add("checked");
    }
    li.onclick = checkItem;

    ul.appendChild(li);
  }
  // ==================================================把items寫入html===========================================================
}

// todolist基本功能==================================================
function addItem() {
  const ul = document.getElementById("list");
  const input = document.getElementById("input");
  const text = input.value;
  if (text === "") {
    alert("請輸入內容");
    return;
  }

  const newItem = document.createElement("li");
  newItem.classList.add("item");
  newItem.innerText = text;

  newItem.onclick = checkItem;
  const deleteButton = document.createElement("span");
  deleteButton.classList.add("delete");
  deleteButton.onclick = deleteItem;
  newItem.appendChild(deleteButton);

  // 要在additem的時候將資料存入local storage
  // 利用物件來代表每一個todolist的item => 分成兩部分，一個是文字以及是否完成
  listState.push({
    text,
    checked: false,
  });
  saveState(listState); //更新完listState之後，同步將listState的值存進local storage

  input.value = "";
  ul.appendChild(newItem);
}

function checkItem() {
  const item = this;
  const parent = item.parentNode;
  //使用Array.from，把childNodes轉成Array  使用indexOf來找item的index
  const idx = Array.from(parent.childNodes).indexOf(item);

  // const items = Array.from(parent.children);
  // const idx = items.indexOf(item);

  // if (idx !== -1) {
  //更新該index的打勾狀態，驚嘆號代表相反的布林值
  listState[idx].checked = !listState[idx].checked;
  item.classList.toggle("checked");

  saveState(listState);
  // }
}

function deleteItem(e) {
  const item = this.parentNode;
  const parent = item.parentNode;
  const idx = Array.from(parent.childNodes).indexOf(item);
  // const items = Array.from(parent.children);
  // const idx = items.indexOf(item);
  // if (idx !== -1) {
  listState = listState.filter((_, i) => i !== idx); //把index以外的留著，如果等於index就要把它filter掉
  parent.removeChild(item);
  saveState(listState);
  e.stopPropagation();
  // }
}

initList(); //要在網頁讀取完成時，呼叫initList，才會執行

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", addItem);

const form = document.getElementById("input_wrapper");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
