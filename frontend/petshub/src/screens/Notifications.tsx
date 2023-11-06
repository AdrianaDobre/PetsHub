import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flex, IconButton, Text, Heading } from 'native-base';
import { StyleSheet } from 'react-native';
import { FlatList } from 'native-base';
import TrocView from '../components/TrocView';

const products = [
  {
    id: 1,
    name: 'Converse',
    userName: 'Alexandra Oros',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
    label: 'Imbracaminte',
    photoPath:
      'https://images1.vinted.net/t/02_01d23_hXtTo91is4WcEbVGaWMzPTCx/f800/1698486717.jpeg?s=3cfbf6aa191c25320c3fa24e250a8979f51ef3c9',
  },
  {
    id: 4,
    name: 'Vesta 2',
    userName: 'Bianca Stan',
    label: 'Imbracaminte',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
    photoPath:
      'https://images1.vinted.net/t/01_02596_49ArQi8zkUuGRgwhY8TFgEVV/f800/1697986880.jpeg?s=56f565f0bf003353916ef27f2386f65c40859833',
  },
];

const myNotifications = [
  {
    id: 1,
    requestedProduct: products[0],
    tradedProducts: [products[1]],
    status: null,
  },
  {
    id: 1,
    requestedProduct: products[0],
    tradedProducts: [products[1]],
    status: true,
  },
];

const Notifications = () => {
  const renderItem = ({ item, index }) => {
    return <TrocView key={`troc-${index}`} troc={item} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Flex mt='3' mx='2'>
        <Heading mt='2' mb='8' flexGrow='1' textAlign='center'>
          Trocuri
        </Heading>
        <Flex mx='6' mb='1' direction='row' justifyContent={'space-between'}>
          <Text color='gray.400' fontSize='md'>
            Produsele mele
          </Text>
          <Text color='gray.400' fontSize='md'>
            Oferte
          </Text>
        </Flex>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={myNotifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </Flex>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
  },
});

export default Notifications;
