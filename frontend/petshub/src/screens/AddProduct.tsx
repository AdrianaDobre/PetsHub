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
// import { addToy, toysSlice } from '../features/toySlice';
// import { draft, toysSelector } from '../selectors/toy';
const categories = [
  { name: 'Electrocasnice', value: 'Electrocasnice' },
  { name: 'Imbracaminte', value: 'Imbracaminte' },
];

const states = [
  {
    name: 'Uzata',
    value: 'Uzata',
  },
  {
    name: 'Nou',
    value: 'Nou',
  },
];

const initialState = {
  name: '',
  description: '',
  label: categories[0],
  state: states[0],
  media: '',
};

const AddProduct = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  //   const { media } = useSelector(draft);
  //   const localDraft = useSelector(draft);
  const dispatch = useDispatch();
  //   const { status } = useSelector(toysSelector);
  const error = '';
  const [toyData, setToyData] = useState(initialState);
  //   if (localDraft === {}) {
  //     navigation.navigate(Routes.HOME);
  //   }
  useEffect(() => {
    setToyData({
      ...toyData,
      media: route.params?.media || '',
    });
    console.log('MED', route.params.media);
  }, []);
  const handleAddToy = () => {
    // dispatch(addToy({ ...toyData, photo: media }));
    setToyData(initialState);
    navigation.navigate(Routes.EXPLORE);
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
            <Heading textAlign='center'>Adaugă produs</Heading>
          </Flex>
        </Flex>
        <Flex flex={1} position='relative'>
          <ScrollView>
            <Flex mx='5' mt='6' gap='5' flex={1} mb='24'>
              <Flex gap='7'>
                <FormControl isRequired w='100%' isInvalid={error} gap='5'>
                  <Heading fontSize='lg'>Nume</Heading>
                  <Input
                    variant='filled'
                    borderRadius='xl'
                    size='lg'
                    value={toyData.name}
                    onChangeText={(name) => setToyData({ ...toyData, name })}
                    type='text'
                    placeholder='Nume'
                  />
                </FormControl>
                <FormControl isRequired w='100%' isInvalid={error} gap='5'>
                  <Heading fontSize='lg'>Descriere</Heading>
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
                    placeholder='Descriere'
                  />
                </FormControl>

                <Flex>
                  <Heading fontSize='lg'>Categorie</Heading>
                  <SelectInput
                    value={toyData.label}
                    options={categories}
                    onSelect={(option) =>
                      setToyData({ ...toyData, label: option })
                    }
                  />
                </Flex>
                <Flex>
                  <Heading fontSize='lg'>Stare</Heading>
                  <SelectInput
                    value={toyData.state}
                    options={states}
                    onSelect={(option) =>
                      setToyData({ ...toyData, state: option })
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
              Inapoi
            </Button>
            <Button
              onPress={handleAddToy}
              size='lg'
              width='20'
              borderRadius='xl'
              bg='#D94506'
            >
              Adauga
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
