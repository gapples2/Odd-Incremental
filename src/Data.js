let gameIsLoaded = false
//create all the variables in a data object for saving
function getDefaultObject() {
    return {
        //oddities
        oddities: new Decimal(2),
        oddityGain: new Decimal(0),
        //derivatives
        derivs: [{b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:true}, {b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:false}, {b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:false}, {b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:false}],
        //exponents
        exp: new Decimal(0),
        highexp: new Decimal(0),
        expResetTimes: 0,
        ep: new Decimal(0),
        ed: [{b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:false}, {b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:false}, {b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:false}, {b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:false}],
        //shop
        upgs: [{amt:new Decimal(0),pow:new Decimal(1)}, {amt:new Decimal(0),pow:new Decimal(1)}, {amt:new Decimal(0),pow:new Decimal(1)}, {amt:new Decimal(0),pow:new Decimal(1)}],
        //misc
        currentTab: 1,
        updateIDs: [0, 0, 0],
        time: Date.now(),
        subtabs:{
          exp: 1
        }
    }
}
let data = getDefaultObject()
//saving and loading
function save(){
    window.localStorage.setItem('ucRemakeSave', JSON.stringify(data))
}
function load() {
    let savedata = JSON.parse(window.localStorage.getItem('ucRemakeSave'))
    if (savedata !== undefined) fixSave(data, savedata)
}
//fix saves
function fixSave(main=getDefaultObject(), data) {
    if ((typeof main) == "object"&&data!=null) {
        Object.keys(main).forEach(i => {
            if (main[i] instanceof Decimal) {
                main[i] = new Decimal(data[i]||main[i])
            } else if (typeof main[i]  == "object") {
                fixSave(main[i], data[i])
            } else {
                main[i] = data[i]
            }
        })
        return main
    }
    else return getDefaultObject()
}
function fixOldSaves(){
    //fix important things from old versions
}
function exportSave(){
    save()
    let exportedData = btoa(JSON.stringify(data));
    const exportedDataText = document.createElement("textarea");
    exportedDataText.value = exportedData;
    document.body.appendChild(exportedDataText);
    exportedDataText.select();
    exportedDataText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(exportedDataText);
}
function importSave(){
    let importedData = prompt("Paste your save data here!")
    data = Object.assign(getDefaultObject(), JSON.parse(atob(importedData)))
    save()
    location.reload()
}
window.setInterval(function(){
    if(gameIsLoaded)save()
}, 1000);
window.onload = function (){
    addEventListeners()
    load()
    fixOldSaves()
    gameIsLoaded = true
    changeTab(1)
    Object.keys(data.subtabs).forEach(k=>changeSubtab(data.subtabs[k],k))
    document.addEventListener("keydown",(key)=>{
      switch(key.code){
        case "KeyM":
          buyMaxDeriv()
          break;
        case "Digit1":
          buyDeriv(1)
          break;
        case "Digit2":
          buyDeriv(2)
          break;
        case "Digit3":
          buyDeriv(3)
          break;
        case "Digit4":
          buyDeriv(4)
          break;
      }
    })
}
//full reset
function fullReset(){
    if(!confirm("Are you sure you want to reset your save?"))return;
    window.localStorage.removeItem('ucRemakeSave')
    location.reload()
}

