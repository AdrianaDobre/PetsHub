import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, Flex, Pressable } from 'native-base';
import Routes from '../navigation/routes';
import React from 'react';

const ProductMiniView = ({ product }) => {
  const { productId, productName, photoPath, userName } = product;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const expandView = () => {
    navigation.navigate(Routes.PRODUCT, { product });
  };
  return (
    <Pressable onPress={expandView}>
      <Flex gap='6px'>
        <Image
          alt={`mini-photo-${productName}`}
          height='207px'
          bg='muted.200'
          borderRadius='xl'
          width='167px'
          source={{ uri: photoPath }}
        />
        <Text
          color='darkText'
          lineHeight='xs'
          fontWeight='bold'
          fontSize='lg'
          mt='1'
        >
          {productName}
        </Text>
        <Text
          width='167px'
          overflow='hidden'
          lineHeight='14px'
          fontWeight='medium'
          fontSize='sm'
          color='muted.400'
        >
          {userName}
        </Text>
      </Flex>
    </Pressable>
  );
};

export default ProductMiniView;
