import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, View, Heading, Button, Center, Image } from 'native-base';
import Routes from '../navigation/routes';

const Landing = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container} bg='#812A05' pb={20}>
      <Center flex='1'>
        <Box
          mt='30%'
          flex='1'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Image
            alt='alt'
            height='450'
            width='400'
            source={require('../../assets/pet4.png')}
          />
        </Box>
        <Heading
          mt={6}
          mb={4}
          color='light.50'
          fontSize='49'
          fontWeight='bold'
          opacity='90'
          w='75%'
        >
          PetsHub
        </Heading>
        <Heading
          mb='34'
          color='light.50'
          fontSize='xl'
          fontWeight='light'
          opacity='90'
          w='75%'
        >
          Bringing tails and caregivers together, effortlessly.
        </Heading>
        <Button
          size='lg'
          borderRadius='xl'
          bg='#D94506'
          w='80%'
          _pressed={{
            bgColor: '#02463D',
          }}
          onPress={() => navigation.navigate(Routes.SIGN_IN)}
        >
          Start
        </Button>
      </Center>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Landing;
