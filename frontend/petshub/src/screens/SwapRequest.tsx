import {
  Heading,
  Pressable,
  IconButton,
  Input,
  Box,
  View,
  Text,
} from 'native-base';
import React, { useState } from 'react';
import { useWindowDimensions, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import { AntDesign } from '@expo/vector-icons';
import { FlatList } from 'native-base';
import ProductActionView from '../components/ProductActionView';

const myProducts = [
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
    id: 2,
    name: 'Converse 2',
    userName: 'Alexandra Oros',
    label: 'Imbracaminte',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
    photoPath:
      'https://images1.vinted.net/t/02_01d23_hXtTo91is4WcEbVGaWMzPTCx/f800/1698486717.jpeg?s=3cfbf6aa191c25320c3fa24e250a8979f51ef3c9',
  },
];

const SwapRequestModal = ({ open, select, toggleOpen }: any) => {
  const { width, height } = useWindowDimensions();
  const renderItem = ({ item, index }) => {
    return (
      <ProductActionView
        key={`event-${index}`}
        product={item}
        actionLabel={'Swap'}
        action={select}
      />
    );
  };
  return (
    <Modal isVisible={open} style={styles.modal}>
      <View style={styles.modal}>
        <Box
          bg='white'
          width='100%'
          height={height}
          mt='1'
          style={styles.box}
          borderRadius='md'
          px='4'
          py='2'
        >
          <Box display='flex' justifyContent='center' mb='18'>
            <IconButton
              position={'absolute'}
              top='0'
              right='0'
              colorScheme={'black'}
              variant='ghost'
              borderRadius='full'
              onPress={(e) => toggleOpen()}
              _icon={{
                as: <AntDesign name='close' />,
              }}
            />
            <Heading my='5' marginRight='auto' marginLeft='auto' size='sm'>
              Choose which product to swap
            </Heading>
          </Box>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={myProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
  },
  box: {
    zIndex: 3,
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

export default SwapRequestModal;
