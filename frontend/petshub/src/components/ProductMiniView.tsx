import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, Flex, Pressable } from 'native-base';
import Routes from '../navigation/routes';
import React, { useState } from 'react';

const ProductMiniView = ({ product }) => {
  // const { productId, productName, photoPath, userName } = product;
  const { id, title, creatorName, petType, photoPath } = product;
 console.log(product)
  const { t } = useTranslation();
  const navigation = useNavigation();
  const expandView = () => {
    navigation.navigate(Routes.PRODUCT, { product });
  };
  let petImagePath = null;
  switch (petType.toLowerCase()) {
    case 'dog':
      petImagePath = require('../../assets/dog.jpg');
      break;
    case 'cat':
      petImagePath = require('../../assets/cat.jpg');
      break;
    // Add more cases for other pet types as needed
    default:
      // Default image if the pet type is not recognized
      petImagePath = require('../../assets/dog.jpg');
      break;
  }

  return (
    <Pressable onPress={expandView}>
      <Flex gap='6px'>
        <Image
          alt={`mini-photo-${title}`}
          height='207px'
          bg='muted.200'
          borderRadius='xl'
          width='167px'
          //source={{ uri: photoPath }}
          source={petImagePath}
        />
        <Text
          color='darkText'
          lineHeight='xs'
          fontWeight='bold'
          fontSize='lg'
          mt='1'
          numberOfLines={2}
        >
          {title.length > 18 ? `${title.substring(0, 18)}...` : title}
        </Text>
        <Text
          width='167px'
          overflow='hidden'
          lineHeight='14px'
          fontWeight='medium'
          fontSize='sm'
          color='muted.400'
        >
          {creatorName}
        </Text>
      </Flex>
    </Pressable>
  );
};

export default ProductMiniView;
