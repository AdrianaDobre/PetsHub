import { StyleSheet } from 'react-native';
import {
  Heading,
  Input,
  FormControl,
  Button,
  Text,
  TextArea,
  Flex,
  IconButton,
} from 'native-base';
import React from 'react';
import SelectInput from '../components/SelectInput';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import Routes from '../navigation/routes';
// import TagPicker from '../common/components/TagPicker';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { NETWORK_IP } from '../util/constant';
import { isUserAuthenticatedSelector } from '../selectors/auth';
// import { addToy, toysSlice } from '../features/toySlice';
// import { draft, toysSelector } from '../selectors/toy';
const pets = [
  { name: 'Dog', value: '1' },
  { name: 'Cat', value: '2' },
  { name: 'Parrot', value: '3' },
  { name: 'Rabbit', value: '4' },
  { name: 'Fish', value: '5' },
  { name: 'Hamster', value: '6' },
];


const initialState = {
  title: '',
  description: '',
  petId: pets[0],
  price: 0,
  time: 0,
};

const AddProduct = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  //   const { media } = useSelector(draft);
  //   const localDraft = useSelector(draft);
  const token = useSelector(isUserAuthenticatedSelector);
  //   const { status } = useSelector(toysSelector);
  const error = '';
  const [toyData, setToyData] = useState(initialState);
  //   if (localDraft === {}) {
  //     navigation.navigate(Routes.HOME);
  //   }

  const handleAddToy = async () => {
    const model = {...toyData, petId: toyData.petId["value"]}
    console.log(model)
    console.log(token)
    try{

      const response = await fetch(`http://${NETWORK_IP}:7262/Listing/addPlace`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(model),
      });
      
      if(response.ok){
        navigation.navigate(Routes.EXPLORE);
      }
      else {
        // Handle unsuccessful response
        //debugger
        
        console.error('Error:', response.statusText);
      }

    }
    catch (error) {
      console.error('Fetch Error:', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Flex ml='2' direction='row' justifyContent='flex-start'>
          <IconButton
            colorScheme={'black'}
            variant='ghost'
            borderRadius='full'
            onPress={(e) => navigation.navigate(Routes.EXPLORE)}
            _icon={{
              as: <AntDesign name='close' />,
            }}
          />
        </Flex>
        <Flex
          mt='3'
          mb='3'
          mx='5'
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Flex direction='row' w='100%'>
            <Heading textAlign='center'>Add a place</Heading>
          </Flex>
        </Flex>
        <Flex flex={1} position='relative'>
          <ScrollView>
            <Flex mx='5' mt='6' gap='5' flex={1} mb='24'>
              <Flex gap='7'>
                <FormControl isRequired w='100%' isInvalid={error} gap='5'>
                  <Heading fontSize='lg'>Title</Heading>
                  <Input
                    variant='filled'
                    borderRadius='xl'
                    size='lg'
                    value={toyData.title}
                    onChangeText={(title) => setToyData({ ...toyData, title })}
                    type='text'
                    placeholder='Title'
                  />
                </FormControl>
                <FormControl isRequired w='100%' isInvalid={error} gap='5'>
                  <Heading fontSize='lg'>Description</Heading>
                  <TextArea
                    bgColor='muted.100'
                    borderColor='transparent'
                    borderRadius='xl'
                    size='lg'
                    h='20'
                    value={toyData.description}
                    onChangeText={(description) =>
                      setToyData({ ...toyData, description })
                    }
                    placeholder='Description'
                  />
                </FormControl>
                <FormControl isRequired w='100%' isInvalid={error} gap='5'>
                  <Heading fontSize='lg'>Price (RON)</Heading>
                  <Input
                    variant='filled'
                    borderRadius='xl'
                    size='lg'
                    keyboardType='numeric'
                    value={toyData.price}
                    onChangeText={(price) => setToyData({ ...toyData, price })}
                    type='text'
                    placeholder='Price (RON)'
                  />
                </FormControl>
                <FormControl isRequired w='100%' isInvalid={error} gap='5'>
                  <Heading fontSize='lg'>Time (hours)</Heading>
                  <Input
                    variant='filled'
                    borderRadius='xl'
                    size='lg'
                    keyboardType='numeric'
                    value={toyData.time}
                    onChangeText={(time) => setToyData({ ...toyData, time })}
                    type='text'
                    placeholder='Time (hours)'
                  />
                </FormControl>
                <Flex>
                  <Heading fontSize='lg'>Pet</Heading>
                  <SelectInput
                    value={toyData.petId}
                    options={pets}
                    onSelect={(option) =>
                      setToyData({ ...toyData, petId: option })
                    }
                  />
                </Flex>
              </Flex>
            </Flex>
          </ScrollView>
          <Flex
            direction='row'
            width='100%'
            position='absolute'
            bottom='0'
            shadow='9'
            left='0'
            bgColor='white'
            alignItems='center'
            justifyContent='space-between'
            py='4'
            px='7'
          >
            <Button
              colorScheme='muted'
              size='lg'
              width='20'
              variant='ghost'
              borderRadius='xl'
              onPress={(e) => navigation.goBack()}
            >
              Back
            </Button>
            <Button
              onPress={handleAddToy}
              size='lg'
              width='20'
              borderRadius='xl'
              bg='#D94506'
            >
              Add
            </Button>
          </Flex>
        </Flex>
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

export default AddProduct;
