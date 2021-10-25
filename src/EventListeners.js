let derivBoxes = {}
function addEventListeners(){
  // tabs
  let tabs = document.getElementsByClassName("tab")
  for(let x=0;x<tabs.length;x++){
    if(tabs[x].id.slice(0,6)=="subtab")continue;
    tabs[x].addEventListener("click",()=>changeTab(tabs[x].id.slice(3,-6)))
  }
  let subtabs = document.getElementsByClassName("subtab")
  for(let x=0;x<subtabs.length;x++){
    subtabs[x].addEventListener("click",()=>changeSubtab(subtabs[x].id.charAt(6),subtabs[x].id.slice(7,-6)))
  }
  // derivs
  for(let x=0;x<4;x++){
    document.getElementById("tab1").appendChild(document.createElement("br"))
    let ele = document.createElement("button")
    let id = ["I","II","III","IV","V","VI","VII","VIII","IX"][x]
    ele.classList = "flexBox derivative"
    ele.id = "deriv"+id+"button"
    ele.addEventListener("click",()=>{buyDeriv(x+1)})
    document.getElementById("tab1").appendChild(ele)
    setTimeout(function(){
      let r = ele.getBoundingClientRect()
      let el = document.createElement("img")
      el.src = [
        "https://cdn.glitch.me/4501035e-9e22-4244-ae25-031d5eaf1347%2Fderiv1.png?v=1635110164486",
        "https://cdn.glitch.me/4501035e-9e22-4244-ae25-031d5eaf1347%2Fderiv2.png?v=1635121424939",
        "https://cdn.glitch.me/4501035e-9e22-4244-ae25-031d5eaf1347%2Fderiv3.png?v=1635121428368",
        "https://cdn.glitch.me/4501035e-9e22-4244-ae25-031d5eaf1347%2Fderiv4.png?v=1635121431713",
        "https://cdn.glitch.me/4501035e-9e22-4244-ae25-031d5eaf1347%2Fderiv5.png?v=1635157107499",
        "https://cdn.glitch.me/4501035e-9e22-4244-ae25-031d5eaf1347%2Fderiv6.png?v=1635158072682",
        "https://cdn.glitch.me/4501035e-9e22-4244-ae25-031d5eaf1347%2Fderiv7.png?v=1635158076776",
        "https://cdn.glitch.me/4501035e-9e22-4244-ae25-031d5eaf1347%2Fderiv8.png?v=1635158080808",
        "https://cdn.glitch.me/4501035e-9e22-4244-ae25-031d5eaf1347%2Fderiv9.png?v=1635158084172",
      ][x]
      el.style.position = "absolute"
      el.style.left = r.left+15+"px"
      el.style.bottom = innerHeight-r.bottom+6+"px"
      el.height = 45
      el.width = 45
      el.id = "deriv"+id+"pic"
      ele.innerHTML = "<b style='font-size:20px;height:42px;margin:0px'>Derivative "+id+": ["+['Increase','Growth','Expansion','Peak','idk','idk','idk','idk','idk'][x]+"]</b><div style='height:45px;text-align:right' id='deriv"+id+"'></div>"
      ele.appendChild(el)
    },100)
  }
  document.getElementById("buyMaxDeriv").addEventListener("click",()=>{buyMaxDeriv()})
  for(let x=0;x<4;x++){
    document.getElementById("ed").appendChild(document.createElement("br"))
    let ele = document.createElement("button")
    ele.id = "ed"+(["I","II","III","IV"][x])
    ele.classList = "flexBox exp"
    ele.addEventListener("click",()=>{buyED(x+1)})
    document.getElementById("ed").appendChild(ele)
  }
}