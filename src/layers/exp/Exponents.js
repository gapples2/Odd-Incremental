function doExponentReset(){
  data.oddities = new Decimal(2)
  data.oddityGain = new Decimal(0)
  for(let x=0;x<4;x++){
    data.derivs[x]={b:new Decimal(0),amt:new Decimal(0),c:new Decimal(2),u:x==0}
  }
  data.ep = new Decimal(0)
}
function exponentGain(){
  let gain = data.oddities.div(1e10).sqrt().floor().min(data.expResetTimes==0?2:1e309)
  
  return gain
}
function highExponentGain(){
  let gain = data.oddities.add(1).log10().add(1).log10().floor()
  
  return gain
}
function exponentNextAt(){
  let nextat = exponentGain().add(1).pow(2).times(1e10)
  if(data.expResetTimes==0&&nextat.gte(5e10))return new Decimal(Infinity)
  return nextat
}
function heNextAt(){
  return new Decimal(10).pow(new Decimal(10).pow(highExponentGain().add(1)))
}
function exponentReset(){
  if(data.oddities.gte(1e10)){
    data.exp = data.exp.add(exponentGain())
    data.highexp = data.highexp.add(highExponentGain())
    data.expResetTimes++
    doExponentReset()
  }
}
function exponentBoost(){
  return data.exp.add(1).log10().plus(data.highexp.sqrt()).plus(1)
}
function epBoost(){
  return data.ep.add(1).log10().add(1)
}
function edPower(x){
  return ((1-x*0.2)**2)/10
}
const unlockEDCost = [3,10,4.20e69,100]
function buyED(x){
  let i=x-1
  if(!data.ed[i].u){
    if(data.highexp.gte(unlockEDCost[i-1])){
      data.ed[i].u = true
    }
  }else{
    let cost = data.ed[i].c
    if (i==0&&data.exp.gte(cost)||i>0&&data.ed[i-1].b.gte(cost)){
      if(i==0)data.exp = data.exp.sub(data.ed[i].c)
      else{
        data.ed[i-1].b = data.ed[i-1].b.minus(cost)
        data.ed[i-1].amt = data.ed[i-1].amt.minus(cost)
      }
      data.ed[i].b = data.ed[i].b.plus(1)
      data.ed[i].amt = data.ed[i].amt.plus(1)
    }
  }
}