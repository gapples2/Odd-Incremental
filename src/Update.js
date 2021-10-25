function updateHTML(){
    document.getElementById("oddityDisplay").innerText = `${format(data.oddities)} Oddities (+${format(data.oddityGain)}/sec)`
    let derivNames = ['I','II','III','IV','V','VI','VII','VIII','IX']
    let derivTitles = ['Increase','Growth','Expansion','Peak']
    let edTitles = ['Exponentiation','Tetration','Pentation','idk']
    document.getElementById("derivI").innerHTML = `Cost: ${format(data.derivs[0].c)} Oddities<br>[${format(data.derivs[0].b)}] ${format(data.derivs[0].amt)} (+${format(tmp.derivs[1].pro)}/sec)<br>+${format(tmp.derivs[0].pow)} Oddit${tmp.exp.boost.eq(1)?"y":"ies"} [+${format(tmp.derivs[0].pro)}/sec]`
    for (let i=1; i<data.derivs.length; i++){
        document.getElementById(`deriv${derivNames[i]}`).innerHTML = !data.derivs[i].u ? 
          `<br><br>Requires ${format(unlockDerivCost[i-1])} Oddities` :
          `Cost: ${format(data.derivs[i].c)} bought D.${i}<br>[${format(data.derivs[i].b)}] ${format(data.derivs[i].amt)} (+${format(i==3?0:tmp.derivs[i+1].pro)}/sec)<br>+${format(tmp.derivs[i].pow)} D.${i} [+${format(tmp.derivs[i].pro)}/sec]`
    }
    for (let i=1; i<data.ed.length; i++){
        document.getElementById(`ed${derivNames[i]}`).innerHTML = !data.ed[i].u ? 
          `Unlock Exponent Derivative ${derivNames[i]}: [${edTitles[i]}]<br><br><br><br>Requires ${format(unlockEDCost[i])} High Exponents` :
          `Exponent Derivative ${derivNames[i]}: [${edTitles[i]}]<br>Cost: ${format(data.ed[i].c)} bought ED.${derivNames[i-1]}<br>Creates ${format(edPower(i))} ED.${derivNames[i-1]} every second.<br>Amount Bought: ${format(data.ed[i].b)}<br>Amount: ${format(data.ed[i].amt)}`
    }
    document.getElementById("edI").innerHTML = !data.ed[0].u ? 
      `Unlock Exponent Derivative I: [${edTitles[0]}]<br><br><br><br>Requires ${format(unlockEDCost[0])} High Exponents` :
      `Exponent Derivative I: [${edTitles[0]}]<br>Cost: ${format(data.ed[0].c)} exponents<br>Generates ${format(edPower(0))} EP every second.<br>Amount Bought: ${format(data.ed[0].b)}<br>Amount: ${format(data.ed[0].amt)}`
    document.getElementById("exponentReset").innerHTML = data.oddities.gte(1e10) ? 
      `Reset oddities and derivatives for:<br>${format(exponentGain())} exponents and ${format(highExponentGain())} high exponents.<br>Next at: ${format(exponentNextAt())} and ${heNextAt()} oddities.` :
      `Get 1e10 oddities to reset for exponents.<br><br>${format(new Decimal(1e10).minus(data.oddities))} more oddities required`
    document.getElementById("expTxt").innerHTML = `Your Exponents and High Exponents boost D.1 power. [${format(tmp.exp.boost)}x]<br>You have done ${format(data.expResetTimes)} exponent resets.`
    document.getElementById("epTxt").innerText = `You have ${format(data.ep)} exponent power (+${format(data.epGain)}/sec), boosting all derivatives by ${format(epBoost())}.`
    if(data.expResetTimes>0){
      document.getElementById("exponentDisplay").innerText = `${format(data.exp)} Exponents`
      document.getElementById("highExponentDisplay").innerText = `${format(data.highexp)} High Exponents`
    }
    showAndHideStuff()
}
function showAndHideStuff(){
  let derivNames = ['I','II','III','IV']
  for(let i=0;i<data.derivs.length;i++){
    document.getElementById(`deriv${derivNames[i]}button`).style.display = data.derivs[i-1]?.u||i==0||data.expResetTimes>0?"":"none"
  }
  for(let i=0;i<data.ed.length;i++){
    document.getElementById(`ed${derivNames[i]}`).style.display = data.ed[i-1]?.u||i==0?"":"none"
  }
  document.getElementById("tab2button").style.display = data.derivs[3].amt.gte(1)||data.expResetTimes>0?"":"none"
  document.getElementById("exponentPicsAndStuff").style.display = data.expResetTimes>0?"":"none"
  document.getElementById("subtab1expbutton").style.display = data.expResetTimes>=2?"":"none"
  document.getElementById("subtab2expbutton").style.display = data.expResetTimes>=2?"":"none"
}