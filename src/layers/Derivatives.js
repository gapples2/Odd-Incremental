function calculateCosts(){
    for (let i=0; i<4; i++){
        let derivCostBase = [new Decimal(2),new Decimal(20),new Decimal(5),new Decimal(4)]
        data.derivs[i].c = derivCostBase[i].times(new Decimal(1.2).pow(data.derivs[i].b)).floor()
      
        let EDCostBase = [new Decimal(3),new Decimal(20),new Decimal(5),new Decimal(4)]
        data.ed[i].c = EDCostBase[i].times(new Decimal(1.2).pow(data.ed[i].b)).floor()
    }
}
const unlockDerivCost = [100,2e4,2e7]
function buyDeriv(x){
    let i=x-1
    if(!data.derivs[i].u){
      if(data.oddities.gte(unlockDerivCost[i-1])){
        data.derivs[i].u = true
      }
    }else{
      let cost = data.derivs[i].c
      if (i==0&&data.oddities.gte(cost)||i>0&&data.derivs[i-1].b.gte(cost)){
          if(i==0)data.oddities = data.oddities.sub(data.derivs[i].c)
          else{
            data.derivs[i-1].b = data.derivs[i-1].b.minus(cost)
            data.derivs[i-1].amt = data.derivs[i-1].amt.minus(cost)
          }
          data.derivs[i].b = data.derivs[i].b.plus(1)
          data.derivs[i].amt = data.derivs[i].amt.plus(1)
      }
    }
}
function increaseDerivs(diff){
  for(let x=0;x<data.derivs.length-1;x++){
    data.derivs[x].amt = data.derivs[x].amt.plus(tmp.derivs[x+1].pro.times(diff)||0)
    data.ed[x].amt = data.ed[x].amt.plus(data.ed[x+1].amt.times(edPower(x+1)).times(diff))
  }
}
function buyMaxDeriv(){
  let derivCostBase = [new Decimal(2),new Decimal(20),new Decimal(5),new Decimal(4)]
  for(let x=0;x<data.derivs.length;x++){
    if(!data.derivs[x].u)continue;
    let use = (x==0?data.oddities:data.derivs[x-1].b)
    let add = data.oddities.gte(data.derivs[x].c)?1:0
    let max = use.div(derivCostBase[x]).log(1.2).minus(data.derivs[x].b).floor().add(add).max(0)
    if(isNaN(max)||max.eq(0))continue;
    let safe = max.minus(30).max(0)
    let o = max
    max = new Decimal(0)
    let ocost = new Decimal(1.2).pow(data.derivs[x].b.add(o).minus(1)).times(derivCostBase[x])
    let cost = new Decimal(0)
    for(let i=30-o.min(30).toNumber();i<30;i++){
      max=max.add(1)
      cost=cost.add(ocost.div(1.2**(29-i)).floor())
      if(cost.gt(use)){
        max=max.minus(1)
        cost=cost.minus(ocost.div(1.2**(29-i)))
        break;
      }
    }
    cost=cost.floor()
    max=max.add(safe)
    if(max.lte(0))continue;
    if(x==0)data.oddities=data.oddities.minus(cost)
    else{
      data.derivs[x-1].b = data.derivs[x-1].b.minus(cost)
      data.derivs[x-1].amt = data.derivs[x-1].amt.minus(cost)
    }
    data.derivs[x].b = data.derivs[x].b.plus(max)
    data.derivs[x].amt = data.derivs[x].amt.plus(max)
  }
}
function derivPower(x){
  let power = new Decimal(1-x*0.2)
  if(x==0)power=power.times(tmp.exp.boost)
  power=power.times(epBoost())
  return power
}