let tmp = {
  derivs:[],
  exp:{}
}
function updateTmpDerivs(){
  for(let x=0;x<4;x++){
    if(!tmp.derivs[x])tmp.derivs[x]={}
    tmp.derivs[x].pow = derivPower(x)
    tmp.derivs[x].pro = data.derivs[x].amt.times(tmp.derivs[x].pow)
  }
}
function updateTmpExp(){
  tmp.exp.boost = exponentBoost()
}
function updateTmp(){
  updateTmpDerivs()
  updateTmpExp()
}