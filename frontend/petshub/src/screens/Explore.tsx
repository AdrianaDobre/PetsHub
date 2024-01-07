import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Box, Heading, Flex, Input, Icon, IconButton } from 'native-base';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from '../navigation/routes';
import ProductList from '../components/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import ProductCategories from '../components/ProductCategories';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { isUserAuthenticatedSelector } from '../selectors/auth';
import { NETWORK_IP } from '../util/constant';




const exploreToys = () => {
  // fix me: request to backend
  return [
    {
      id: 1,
      name: 'Converse',
      userName: 'Alexandra Oros',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
      label: 'Imbracaminte',
      photoPath:
        'https://images1.vinted.net/t/02_01d23_hXtTo91is4WcEbVGaWMzPTCx/f800/1698486717.jpeg?s=3cfbf6aa191c25320c3fa24e250a8979f51ef3c9',
    },
    {
      id: 2,
      name: 'Converse 2',
      userName: 'Alexandra Oros',
      label: 'Imbracaminte',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
      photoPath:
        'https://images1.vinted.net/t/02_01d23_hXtTo91is4WcEbVGaWMzPTCx/f800/1698486717.jpeg?s=3cfbf6aa191c25320c3fa24e250a8979f51ef3c9',
    },
    {
      id: 3,
      name: 'Vesta',
      userName: 'Bianca Stan',
      label: 'Imbracaminte',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
      photoPath:
        'https://images1.vinted.net/t/01_02596_49ArQi8zkUuGRgwhY8TFgEVV/f800/1697986880.jpeg?s=56f565f0bf003353916ef27f2386f65c40859833',
    },
    {
      id: 4,
      name: 'Vesta 2',
      userName: 'Bianca Stan',
      label: 'Imbracaminte',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
      photoPath:
        'https://images1.vinted.net/t/01_02596_49ArQi8zkUuGRgwhY8TFgEVV/f800/1697986880.jpeg?s=56f565f0bf003353916ef27f2386f65c40859833',
    },
  ];
};

const Explore = () => {
  const navigation = useNavigation();
  const token = useSelector(isUserAuthenticatedSelector);
  const dispatch = useDispatch();
  const [foundToys, setFoundToys] = useState([]);
  const [actualToys, setActualToys] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(undefined);

  useEffect(() => {
    const getProducts = async () => {
      try {
        
          const response = await fetch(
              `http://${NETWORK_IP}:7262/Listing/listOffers`,
              {
                method: "GET",
                          headers: {
                              Authorization: `Bearer ${token}`,
                          },
              }
          );
          if(response.ok){
            const data = await response.json();
            console.log(data)
            setFoundToys(data);
            setActualToys(data);
         
         
          }
  
          
      } catch (error) {
      }
      
    };
    getProducts();

    
  }, []);

  const searchAndFilterProducts = ({
    search,
    filters,
    products,
  }: any) => {
    return products?.filter((p) => p.creatorName.toLowerCase().includes(search.toLowerCase()));
  }; 

  const handleSearch = (text) => {
    setSearchQuery(text);
    const searchToys =  searchAndFilterProducts({ search: text, filters: [], products: foundToys });
    setActualToys(
     searchToys
    );
  };

  const handleSelectTag = (tag) => {
    setSelectedTag(tag)
    if(tag == undefined){
      setActualToys(foundToys);
    }
    else{
      const toys = actualToys?.filter((p) => p.petType === tag.name);
      console.log(toys)
      setActualToys(toys);
    }
  }

  const mainTags = [
    { name: 'Dog', color: '#b7b5fe' },
    { name: 'Cat', color: '#9cd3a9' },
    { name: 'Parrot', color: 'yellow.400' },
    { name: 'Fish', color: 'blue.400' },
    { name: 'Hamster', color: 'green.400' },
    { name: 'Rabbit', color: 'purple.400' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView>
          <Flex direction='row' justifyContent='flex-start'></Flex>
          <Flex width='100%' justifyContent='center'>
            <Flex
              direction='row'
              width='100%'
              mt='6'
              mb='12'
              justifyContent='center'
            >
              <Heading textAlign='center'>Explore</Heading>
            </Flex>
            <Flex width='100%' gap='2' direction='row' justifyContent='center'>
              <Input
                borderRadius='xl'
                size='2xl'
                width='72'
                variant='filled'
                value={searchQuery}
                onChangeText={(text) => handleSearch(text)}
                placeholder='Search person...'
                InputLeftElement={
                  <Box ml='4'>
                    <Icon
                      as={
                        <AntDesign name='search1' size={28} color={'black'} />
                      }
                    />
                  </Box>
                }
              />
              <IconButton
                variant='solid'
                bg='#02463D'
                size='50px'
                borderRadius='xl'
                onPress={(e) => {}}
                _icon={{
                  as: <FontAwesome name='sliders' />,
                }}
              />
            </Flex>
            <Flex mb='10' ml='6' mt='8'>
              <ProductCategories tags={mainTags} handleSelectTag={handleSelectTag} selected={selectedTag}/>
            </Flex>
            {actualToys?.length && <ProductList products={actualToys} />}
          </Flex>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Explore;
