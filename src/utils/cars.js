
export function getListCars(size, cars){
  let popularCars = [];

  for(let i = 0, l = size; i < l; i++){
    popularCars.push(cars[i]);
  }
  return popularCars;
}

export function randomBanner(cars){
  return Math.floor(Math.random() * cars.length)
}