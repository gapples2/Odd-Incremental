function increaseOddities(i){
    data.oddities = data.oddities.plus(i)
}
function increaseEP(i){
  data.ep=data.ep.add(i)
}
function mainLoop(){
    let diff = (Date.now()-data.time)/1000
    data.time = Date.now()
    updateTmp()
    data.oddityGain = tmp.derivs[0].pro
    data.epGain = data.ed[0].amt.times(edPower(0))
    increaseOddities(data.oddityGain.times(diff))
    increaseEP(data.epGain.times(diff))
    increaseDerivs(diff)
    calculateCosts()
    updateHTML()
}
window.setInterval(function(){
    mainLoop()
}, 50);
function changeTab(x){
  document.getElementById("tab"+data.currentTab).style.display="none"
  document.getElementById("tab"+x).style.display=""
  data.currentTab=x
}
function changeSubtab(x,p){
  document.getElementById("subtab"+data.subtabs[p]+p).style.display="none"
  document.getElementById("subtab"+x+p).style.display=""
  data.subtabs[p]=x
}

/*
  use: [Obj, Name, Decimal]
  currentcost: Decimal
  basecost: Decimal
  scaling: Decimal/Number
  toChange: Array
  toDecrease: Array (optional)
    toDecrease and toChange has to look something like this: [[obj,name]]
  acc: Number (optional)
*/
function buyMax(use,currentcost,basecost,scaling,toChange,toDecrease=[],acc=30){
    if(!(Array.isArray(use))||!(currentcost instanceof Decimal)||!(basecost instanceof Decimal)||(!(scaling instanceof Decimal)&&!((typeof scaling)=="number"))||!((typeof toChange)=="object"))return console.error("buy max failed because you forgot some parameter(s)")
    let add = use[2].gte(currentcost)?1:0
    let max = use[2].div(basecost).log(scaling).minus(toChange[0][0][toChange[0][1]]).floor().add(add).max(0)
    if(isNaN(max)||max.eq(0))return;
    let safe = max.minus(acc).max(0)
    let o = max
    max = new Decimal(0)
    let ocost = new Decimal(scaling).pow(toChange[0][0][toChange[0][1]].add(o).minus(1)).times(basecost)
    let cost = new Decimal(0)
    for(let i=acc-o.min(acc).toNumber();i<acc;i++){
      max=max.add(1)
      cost=cost.add(ocost.div(1.2**(acc-i-1)).floor())
      if(cost.gt(use[2])){
        max=max.minus(1)
        cost=cost.minus(ocost.div(1.2**(acc-i-1)))
        break;
      }
    }
    cost=cost.floor()
    max=max.add(safe)
    if(max.lte(0))return;
    use[0][use[1]]=use[2].minus(cost)
    for(let i=0;i<toDecrease.length;i++)toDecrease[i][0][toDecrease[i][1]]=toDecrease[i][0][toDecrease[i][1]].minus(cost)
    for(let i=0;i<toChange.length;i++)toChange[i][0][toChange[i][1]]=toChange[i][0][toChange[i][1]].add(max)
}