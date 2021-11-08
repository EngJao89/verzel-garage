
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getCarsSave(key){
  const myCars = await AsyncStorage.getItem(key)

  let carsSave = JSON.parse(myCars) || [];
  return carsSave;
}

export async function saveCar(key, newCar){
  let carsStored = await getCarsSave(key);

  const hasCars = carsStored.some( item => item.id === newCar.id);

  if(hasCars){
    console.log("Esse carro já existe na sua lista");
    return;
  }

  carsStored.push(newCar);

  await AsyncStorage.setItem(key, JSON.stringify(carsStored));
  console.log("Carro salvo com sucesso!!");
}

export async function deleteCar(id){
  let carsStored = await getCarsSave('@verzelgarage');

  let myCars = carsStored.filter( item => {
    return (item.id !== id)
  })

  await AsyncStorage.setItem('@verzelgarage', JSON.stringify(myCars));
  console.log("Carro deletado com sucesso!");

  return myCars;
}

export async function hasMovie(car){
  let carsStored = await getCarsSave('@verzelgarage');

  const hasCars = carsStored.find( item => item.id === car.id );

  if(hasCars){
    return true;
  }

  return false;
}