// 存在local storage=================================================
let list = [];

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
  listState = loadState();
}

// todolist基本功能==================================================
function addItem() {
  const ul = document.getElementById("list");
  const input = document.getElementById("inputtxt");
  const text = input.value;
  if (text === "") {
    alert("請輸入內容");
    return;
  }

  const newItem = document.createElement("li");
  //   newItem.classList.add("item");
  newItem.innerText = text;

  newItem.onclick = checkItem;
  const deleteButton = document.createElement("span");
  deleteButton.classList.add("delete");
  deleteButton.onclick = deleteItem;
  newItem.appendChild(deleteButton);

  input.value = "";
  ul.appendChild(newItem);
}

function checkItem() {
  const item = this;
  item.classList.toggle("checked");
}

function deleteItem() {
  const item = this.parentNode;
  const parent = item.parentNode;
  parent.removeChild(item);
}

const addButton = document.getElementById("add");
addButton.addEventListener("click", addItem);

const form = document.getElementById("input_wrapper");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
