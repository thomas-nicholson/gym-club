function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  
const number = getRandomNumberBetween(1, 60);

module.exports = number;

