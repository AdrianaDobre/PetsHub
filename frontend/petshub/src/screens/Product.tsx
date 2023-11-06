import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  Badge,
  Avatar,
  Heading,
  Button,
  Text,
  Box,
  IconButton,
  Icon,
  Flex,
  Pressable,
} from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { capitalize } from '../components/ProductCategories';
import { StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Routes from '../navigation/routes';
import * as Linking from 'expo-linking';
import SwapRequestModal from './SwapRequest';
import { useState } from 'react';

const Product = ({ route }: any) => {
  const { id, productName, photoPath, description, label, userName, phoneNumber } =
    route.params.product;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const navigation = useNavigation();
  const onSwapConfirm = (chosenProduct) => {
    // make request to swap chosenProduct with route.params.product
    setOpen(!open);
  };
  return (
    <SafeAreaView style={styles.container}>
      <SwapRequestModal
        toggleOpen={() => setOpen(!open)}
        open={open}
        select={onSwapConfirm}
      />
      <Flex direction='row' w='100%' mt='12' mx='2' position='relative'>
        <IconButton
          position={'absolute'}
          top='0'
          left='0'
          colorScheme={'black'}
          variant='ghost'
          borderRadius='full'
          onPress={(e) => navigation.navigate(Routes.EXPLORE)}
          _icon={{
            as: <AntDesign name='close' />,
          }}
        />
        <Heading mt='2' mb='2' flexGrow='1' textAlign='center'>
          Detalii produs
        </Heading>
      </Flex>
      <Flex direction='row' justifyContent={'center'} my='2'>
        <Image
          alt={`mini-photo-${productName}`}
          height='207px'
          bg='muted.200'
          borderRadius='xl'
          width='167px'
          source={{ uri: photoPath }}
        />
      </Flex>
      <Flex
        px='8'
        mt='4'
        bg='#F5F5F5'
        borderTopLeftRadius={'3xl'}
        borderTopRightRadius={'3xl'}
        py='3'
        flex='1'
      >
        <Text
          color='darkText'
          lineHeight='xs'
          fontWeight='bold'
          fontSize='2xl'
          mt='1'
        >
          {productName}
        </Text>
        <Box mt='3' alignSelf={'flex-start'}>
          <Badge
            bg={'#F5DAAB'}
            _text={{ color: 'lightText', fontSize: 'md' }}
            borderRadius='2xl'
          >
            {capitalize(label)}
          </Badge>
        </Box>

        <Flex my='2' mt='4' direction='row' gap='2' alignItems='center'>
          <Avatar
            bg='#02463D'
            mr='1'
            size='sm'
            source={{
              uri: 'https://bit.ly/broken-link',
            }}
          >
            RS
          </Avatar>
          <Text
            width='167px'
            overflow='hidden'
            fontWeight='medium'
            fontSize='sm'
            color='muted.400'
          >
            {userName}
          </Text>
        </Flex>

        <Heading mt='4' mb='2' fontSize={'lg'}>
          Informatii produs
        </Heading>
        <Text mt='2' color='darkText' fontSize='lg' lineHeight='sm' mt='1'>
          {description}
        </Text>
        <Flex mt='12' direction='row' gap='3'>
          <Button
            size='lg'
            borderRadius='xl'
            bg='#D94506'
            width='45%'
            _pressed={{
              bgColor: '#02463D',
            }}
            onPress={() => setOpen(!open)}
          >
            Troc
          </Button>
          <Button
            size='lg'
            borderRadius='xl'
            bg='#00a884'
            width='45%'
            leftIcon={<Icon as={FontAwesome} name='whatsapp' size='sm' />}
            _pressed={{
              bgColor: '#017561',
            }}
            onPress={() => {
              Linking.openURL(`whatsapp://send?text=Buna! Sunt interesat de produsul ${productName} listat pe platforma Troc. M-ai putea ajuta cu mai multe detalii te rog?&phone=${phoneNumber}`)
            }}
          >
            Discutați
          </Button>
        </Flex>
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

export default Product;
