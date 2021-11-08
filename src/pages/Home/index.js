import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';

import { 
  Container, 
  SearchContainer, 
  Input, 
  SearchButton, 
  Title, 
  BannerButton, 
  Banner, 
  SliderMovie } from './styles';
import { Feather } from '@expo/vector-icons';

import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

//import api, { key } from '../../services/api';
import { getListCars, randomBanner } from '../../utils/movies';

import { useNavigation } from '@react-navigation/native';

function Home(){

  const [nowCars, setNowCars] = useState([]);
  const [popularCars, setPopularCars] = useState([]);
  const [topCars, setTopCars] = useState([]);
  const [bannerCars, setBannerCars] = useState({});
  const [input, setInput] = useState('');

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getCars(){
      // const response = await api.get('/car/now_selling', {
      //   params:{
      //     api_key:key,
      //     language: 'pt-BR',
      //     page: 1,
      //   }
      // })

      const [nowData, popularData, topData] = await Promise.all([
        api.get('/car/now_selling', {
          params:{
            api_key: key,
            language: 'pt_BR',
            page: 1,
          }
        }),
        api.get('/car/popular', {
          params:{
            api_key: key,
            language: 'pt_BR',
            page: 1,
          }
        }),
        api.get('/car/top_car', {
          params:{
            api_key: key,
            language: 'pt_BR',
            page: 1,
          }
        }),
      ])
      if(isActive){
        const nowCars = getListCars(10, nowData.data.results);
        const popularCars = getListCars(5, popularData.data.results);
        const topCars = getListCars(5, topData.data.results);

        setBannerCars(nowData.data.results[randomBanner(nowData.data.results)])

        setNowCars(nowCars);
        setPopularCars(popularCars);
        setTopCars(topCars);
        setLoading(false);
      }
    }

    getCars();

    return () => {
      isActive = false;
      ac.abort();
    }

  }, [])

  function navigateDetailsPage(item){
    navigation.navigate('Detail', { id: item.id })
  }

  function handleSearchCar(){
    if(input === '') return;

    navigation.navigate('Search', { name: input})
    setInput('');
  }

  if(loading){
    return(
      <Container>
        <ActivityIndicator size="large" color="#FFF" />
      </Container>
    )
  }

  return(
    <Container>
      <Header title="Verzel Garage" />

      <SearchContainer>
        <Input 
          placeholder="Ex Ford Ranger" 
          placeholderTextColor="#ddd"
          value={input}
          onChangeText={ (text) => setInput(text) }
        />
        <SearchButton onPress={ handleSearchCar }>
          <Feather name="search" size={30} color="#fff"/>
        </SearchButton>
      </SearchContainer>

      <ScrollView>
        <Title>Em Foco</Title>
        <BannerButton activeOpacity={0.9} onPress={ () => navigateDetailsPage(bannerCars) }>
          <Banner 
            source = {{ uri: `http://api.fipeapi.com.br/v1/carros/${bannerCars.poster_path}` }}
          />
        </BannerButton>

        <SliderMovie 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowCars}
          renderItem={ ({ item }) => <SliderItem data={item} navigatePage={ () => navigateDetailsPage(item) } /> }
          keyExtractor={ (item) => String(item.id) }
        />

        <Title>Carros Populares</Title>

        <SliderMovie 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularCars}
          renderItem={ ({ item }) => <SliderItem data={item} navigatePage={ () => navigateDetailsPage(item) } /> }
          keyExtractor={ (item) => String(item.id) }
        />

        <Title>Mais Vendidos</Title>

        <SliderMovie 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topCars}
          renderItem={ ({ item }) => <SliderItem data={item} navigatePage={ () => navigateDetailsPage(item) } /> }
          keyExtractor={ (item) => String(item.id) }
        />

      </ScrollView>

    </Container>
  )
}

export default Home;