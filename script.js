// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * 15);
      let strandBase = this.dna[randomIndex];
      let changebase;
      do {
        changeBase = returnRandBase()
        this.dna[randomIndex] = changeBase;
      } while (strandBase === changeBase);
      return this.dna
    },
    compareDNA(pAequorObj) {
      let similarBase = 0;
      for (base in this.dna) {
        if(this.dna[base] === pAequorObj.dna[base]){
          similarBase++
        }
      }
      console.log(`speciimen ${this.specimenNum} and ${pAequorObj.specimenNum} have ${(similarBase / 15) * 100}% DNA in common`)
    },
    willLikelySurvive() {
      let requiredStrands = 0;
      for (base of this.dna){
        switch(base){
          case 'C':
          requiredStrands++;
          break;
          case 'G':
          requiredStrands++;
          default:
          break;
        }
      }
      if((requiredStrands / 15) * 100 >= 60) {
        return true
      } else {
        return false
      }
    }
  }
}

let firstSpecimen = pAequorFactory(1, mockUpStrand())
let secondSpecimen = pAequorFactory(2, mockUpStrand())

const healthySpecimens = [];
let specimenCount = 1;

while(healthySpecimens.length < 30){
  let currentSpecimen = pAequorFactory(specimenCount, mockUpStrand())
  if(currentSpecimen.willLikelySurvive()){
    healthySpecimens.push(currentSpecimen)
  }
  specimenCount++
  
}

console.log(healthySpecimens)
