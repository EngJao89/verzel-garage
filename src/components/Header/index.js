import React from 'react';

import { Feather } from '@expo/vector-icons';

import { Container, MenuButton, Tittle } from './styles';
import { useNavigation } from '@react-navigation/native';

function Header({ title }){

  const navigation = useNavigation();

  return (
    <Container>
      <MenuButton onPress={ () => navigation.openDrawer() } >
        <Feather name="menu" size={36} color="#FFF"/>
      </MenuButton>
      <Tittle>{title}</Tittle>

    </Container>
  )
}

export default Header;