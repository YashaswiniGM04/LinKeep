let myLeads = []
const inputEl = document.getElementById("input-el")
const inputButton = document.querySelector("#input-btn")
const ulElement = document.getElementById("ul-el")

const delElement = document.getElementById("dlt-btn")

const leadsFromLocalstorage = JSON.parse(localStorage.getItem("myLeads"))

const saveTabBtn = document.getElementById("tab-btn")

saveTabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})


function render(leads) {
    let items = ""
    for (let i = 0; i < leads.length; i++) {

        items += `
    <li>
    <a href='${leads[i]}' target=_blank>
    ${leads[i]}
    </a>
    </li>`
    }
    ulElement.innerHTML = items
}


if (leadsFromLocalstorage != null) {
    myLeads = leadsFromLocalstorage
    render(myLeads)
}


inputButton.addEventListener("click", function () {

    myLeads.push(inputEl.value)
    inputEl.value = ""

    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads)
})


delElement.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    ulElement.innerHTML = null
})

