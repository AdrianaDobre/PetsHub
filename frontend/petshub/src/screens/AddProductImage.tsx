import { StyleSheet, Image, useWindowDimensions } from 'react-native';
import { Heading, View, Button, Text, Flex, IconButton } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { REMOVE_BG_KEY } from '../secrets';
import { useNavigation } from '@react-navigation/core';
import Routes from '../navigation/routes';
// import { draft } from '../selectors/toy';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
// import { updateDraft } from '../features/toySlice';
import { useDispatch } from 'react-redux';
import React from 'react';
import axios from 'axios';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { decode } from 'base-64';

if (typeof atob === 'undefined') {
  global.atob = decode;
}

global.Buffer = require('buffer').Buffer;

const uploadImgur = async (img) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Client-ID ${'ff4adbbb167144b'}`);

  var formdata = new FormData();
  formdata.append('image', img);
  formdata.append('type', 'base64');

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  const response = await fetch('https://api.imgur.com/3/image', requestOptions);
  const responseText = await response.text();
  return JSON.parse(responseText)?.data;
};

const AddProductImage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [media, setMedia] = useState('');
  let key = parseInt(Math.random() * 10000);
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64: true,
        aspect: [3, 3],
        quality: 0.3,
      });

      if (!result.canceled) {
        processImage(result.base64);
        key = parseInt(Math.random() * 10000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDismiss = () => {
    navigation.goBack();
  };

  const processImage = async (media) => {
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file_b64', media);
    const response = await axios({
      method: 'post',
      url: 'https://api.remove.bg/v1.0/removebg',
      data: formData,
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Api-Key': REMOVE_BG_KEY,
      },
      encoding: null,
    });

    const img = new Buffer.from(response.data).toString('base64');
    const { link } = (await uploadImgur(img)) || {};
    setMedia(link);
    console.log('LINK', link);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Flex ml='2' direction='row' justifyContent='flex-start'>
        <IconButton
          colorScheme={'black'}
          variant='ghost'
          borderRadius='full'
          onPress={(e) => navigation.goBack()}
          _icon={{
            as: <AntDesign name='close' />,
          }}
        />
      </Flex>
      <Flex
        mt='3'
        mb='9'
        mx='5'
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Flex direction='row'>
          <Heading textAlign='center'>Adaugă produs</Heading>
        </Flex>
      </Flex>
      <Flex flex={1} position='relative'>
        <Flex mx='5' gap='5' flex={1}>
          <Flex gap='6'>
            <Flex
              direction='row'
              gap='9'
              alignItems='center'
              justifyContent='center'
            >
              <Flex gap='2' alignItems='center'>
                <IconButton
                  colorScheme='muted'
                  variant='solid'
                  bg='#02463D'
                  size='60'
                  borderRadius='xl'
                  _icon={{
                    as: <Feather name='camera' />,
                  }}
                  onPress={() => navigation.navigate(Routes.CAMERA)}
                />
                <Text fontSize='md' color='darkText' textAlign='center'>
                  Fotografiaza
                </Text>
              </Flex>
              <Text fontSize='md' mt='-5' color='muted.400' textAlign='center'>
                sau
              </Text>
              <Flex gap='2' alignItems='center'>
                <IconButton
                  colorScheme='muted'
                  bg='#02463D'
                  variant='solid'
                  borderRadius='xl'
                  size='60'
                  onPress={pickImage}
                  _icon={{
                    as: <Ionicons name='cloud-upload-outline' />,
                  }}
                />
                <Text fontSize='md' color='darkText' textAlign='center'>
                  Incarca
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex mt='5' alignItems='center' gap='5'>
            {!media ? (
              <Flex
                height='96'
                borderRadius='xl'
                width='72'
                bg='#812A05'
                justifyContent='center'
                alignItems='center'
              >
                <Flex gap='1' alignItems='center'>
                  <Feather name='image' size={32} color='white' />,
                  <Text fontSize='md' color='lightText' textAlign='center'>
                    Nicio fotografie inca
                  </Text>
                </Flex>
              </Flex>
            ) : (
              <Flex
                height='96'
                borderRadius='xl'
                width='72'
                overflow='hidden'
                bg='gray.200'
                key={`image-preview-${key}`}
              >
                <Image
                  resizeMode='cover'
                  style={{ height: '100%', width: '100%' }}
                  source={{ uri: media }}
                />
              </Flex>
            )}
            <Text width='80' fontSize='xs' color='muted.400' textAlign='center'>
              Psst! Procesăm automat imaginea dvs. pentru a elimina fundalul și
              pentru a iti păstra produsul în lumina reflectoarelor!
            </Text>
          </Flex>
        </Flex>
        <Flex
          direction='row'
          width='100%'
          position='absolute'
          bottom='0'
          left='0'
          shadow='9'
          bgColor='white'
          alignItems='center'
          justifyContent='space-between'
          py='4'
          px='7'
        >
          <Button
            colorScheme='muted'
            size='lg'
            width='24'
            variant='ghost'
            borderRadius='xl'
            onPress={handleDismiss}
          >
            Anuleaza
          </Button>
          <Button
            // isDisabled={!media}
            onPress={() => navigation.navigate(Routes.ADD_PRODUCT, { media })}
            size='lg'
            width='20'
            borderRadius='xl'
            bg='#D94506'
          >
            Înainte
          </Button>
        </Flex>
      </Flex>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AddProductImage;
