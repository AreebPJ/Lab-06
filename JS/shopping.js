const listElement = document.getElementById("shopping");
const newItem = document.getElementById("newItem");
const addBtn =document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");

//create a function to add an item
function addItem(item){
  const itemElement = document.createElement("li");
  //.textcontent places text into the element
  itemElement.textContent = item;
  const deleteButton = document.createElement("button");
  deleteButton.textContent= "x";
  itemElement.appendChild(deleteButton);
  deleteButton.addEventListener("click", ev => {
    listElement.removeChild(itemElement);
  });
  //append child adds an element at the very bottom of the list
  listElement.appendChild(itemElement);
};
//add multiple items to the shopping list
const list = ["rice", "pasta","coffee"];
list.forEach(item => {
  addItem(item);
}
);
//function to clear the list
function clearList(){
  while(listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }
}
//we use this later to load data from local storage
function renderList(list){
  list.forEach(item => {
    addItem(item);

  })
}
//connecting the add button to add item function
addBtn.addEventListener("click", ev => {
  if (newItem.value) {
  addItem(newItem.value);
  newItem.value = null;
  }
});
//connecting clearlist function to add button
clearBtn.addEventListener("click", ev=>{
  clearList();
});

window.addEventListener("beforeunload", ev =>{
  const items = [...listElement.childNodes];
  if (items.length) {
    const list = items.map(item =>{
      return item.textContent.slice(0,1);
    });
    localStorage.setItem("shopping-list",list);

  }else {
    localStorage.removeItem("shopping-list");
  }
});
window.addEventListener("DOMContentLoaded", ev =>{
  const shoppingList = localStorage.getItem("shoppingList");
  if (shoppingList) {
    renderList(shopping.split(','));
      }
});
//this code allows you to click enter on the keyboard to activate the add button
newItem.addEventListener("keyup", ev =>{
  if (ev.key === "Enter"){
    addBtn.click();
  }
  });
