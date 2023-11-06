import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, Avatar, Flex, Box, Button, Pressable } from 'native-base';
import Routes from '../navigation/routes';
import React from 'react';

const ProductActionView = ({ product, action, actionLabel }) => {
  const { id, name, photoPath, userName } = product;
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <Flex my='3'>
      <Flex direction='row' gap='6px' alignItems='center'>
        <Image
          mr='2'
          alt={`mini-photo-${name}`}
          height='60px'
          width='60px'
          bg='muted.200'
          borderRadius='xl'
          source={{ uri: photoPath }}
        />
        <Flex flexGrow={1}>
          <Text
            color='darkText'
            lineHeight='xs'
            fontWeight='bold'
            fontSize='lg'
            mt='1'
          >
            {name}
          </Text>
          <Flex direction='row' mt='2' alignItems='center'>
            <Avatar
              bg='#02463D'
              mr='2'
              size='xs'
              source={{
                uri: 'https://bit.ly/broken-link',
              }}
            >
              {userName.substring(0, 2).toUpperCase()}
            </Avatar>
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
        </Flex>
        <Button
          onPress={() => action(product)}
          size='md'
          height='10'
          width='20'
          borderRadius='xl'
          bg='#D94506'
        >
          {actionLabel}
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProductActionView;
