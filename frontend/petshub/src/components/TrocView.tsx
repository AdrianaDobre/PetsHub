import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, Avatar, Flex, Box, Button, Pressable } from 'native-base';
import Routes from '../navigation/routes';
import React from 'react';
import { IconButton } from 'native-base';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const TrocView = ({ troc }) => {
  const { requestedProduct, tradedProducts, status } = troc;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const accept = () => {};
  const reject = () => {};
  return (
    <Flex
      my='1'
      mx='2'
      height='130px'
      bg='#F5F5F5'
      px='5'
      py='2'
      borderRadius={'xl'}
      direction='row'
      alignItems='center'
      justifyContent={'center'}
    >
      <Image
        mr='2'
        alt={`mini-photo`}
        height='60px'
        width='60px'
        bg='muted.200'
        borderRadius='xl'
        source={{ uri: requestedProduct.photoPath }}
      />
      <Flex flexGrow={1}>
        <Text
          textAlign='center'
          color='grey.500'
          lineHeight='xs'
          fontSize='md'
          mt='1'
        >
          Status:
        </Text>
        <Text
          textAlign='center'
          color='grey.500'
          lineHeight='xs'
          fontWeight='bold'
          fontSize='lg'
          mt='1'
        >
          {status === null ? 'In asteptare' : status ? 'Aprobat' : 'Refuzat'}
        </Text>
        {status === null ? (
          <Flex direction='row' gap='2' mt='2' justifyContent='center'>
            <IconButton
              colorScheme='muted'
              variant='solid'
              bg='#02463D'
              size='60'
              borderRadius='full'
              _icon={{
                as: <Feather name='check' />,
              }}
              onPress={() => accept()}
            />
            <IconButton
              colorScheme='muted'
              variant='solid'
              bg='#D94506'
              size='60'
              borderRadius='full'
              _icon={{
                as: <MaterialCommunityIcons name='cancel' />,
              }}
              onPress={() => reject()}
            />
          </Flex>
        ) : (
          <></>
        )}
      </Flex>
      <Image
        mr='2'
        alt={`mini-photo`}
        height='60px'
        width='60px'
        bg='muted.200'
        borderRadius='xl'
        source={{ uri: tradedProducts?.[0]?.photoPath }}
      />
    </Flex>
  );
};

export default TrocView;
