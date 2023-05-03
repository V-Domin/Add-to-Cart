import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: 'https://playground-862d4-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingLisyInDB = ref(database, "shoppingList")

const addBtn = document.getElementById('add-btn')
const inputEl = document.getElementById('input-el')
const shoppListEl = document.getElementById('shopping-list')

onValue(shoppingLisyInDB, function(snapshot){

    if (snapshot.exists()){
        let itemArray = Object.entries(snapshot.val())

        clearList()
    
        for (let i=0; i<itemArray.length; i++){
            let currentItem = itemArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
    
            appendShopItem(currentItem)
        }
    } else {
        shoppListEl.innerHTML = 'No items here...'
    }

})

addBtn.addEventListener('click', () => {
    let value = inputEl.value
    push(shoppingLisyInDB, value)

    clearInput()

})

function clearInput(){
    inputEl.value = ''
}

function clearList(){
    shoppListEl.innerHTML = ""
}

function appendShopItem(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement('li')
    newEl.textContent = itemValue

    newEl.addEventListener('click', () =>{
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppListEl.append(newEl)
}