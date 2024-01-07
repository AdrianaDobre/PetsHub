import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, Avatar, Flex, Box, Button, Pressable, Icon } from 'native-base';
import Routes from '../navigation/routes';
import React, { useState } from 'react';
import { IconButton } from 'native-base';
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { NETWORK_IP } from '../util/constant';
import { useSelector } from 'react-redux';
import { isUserAuthenticatedSelector } from '../selectors/auth';
import * as Linking from 'expo-linking';
import { Entypo } from '@expo/vector-icons';

const TrocView = ({ troc }) => {
  const { id, photoPath, time, price, acceptedUserName, petType, status, phoneNumber } = troc;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const token = useSelector(isUserAuthenticatedSelector);

  const accept = async () => {
    const response = await fetch(
      `http://${NETWORK_IP}:7262/Listing/acceptOrRejectRequest?listingId=${id}&accepted=${true}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    );

    if (response.ok) {
      setStatus(2)
    }
  };

  const reject = async () => {
    const response = await fetch(
      `http://${NETWORK_IP}:7262/Listing/acceptOrRejectRequest?listingId=${id}&accepted=${false}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    );

    if (response.ok) {
      setStatus(3)
    }
  };
  let petImagePath = null;
  switch (photoPath) {
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
        source={petImagePath}
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
              {status === 1 ? 'Waiting' : status == 2 ? 'Approved' : 'Rejected'}
            </Text>
            {status === 1 ? (
              <Flex direction='row' gap='2' mt='2' justifyContent='center'>
                <IconButton
                  colorScheme='muted'
                  variant='solid'
                  bg='#02463D'
                  size='50'
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
                  size='50'
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
      <Flex gap={1} justifyContent='center' alignItems={'center'}>
        
        <Flex direction="row" alignItems={'center'} gap={2}>
          <Icon as={FontAwesome} name='money' size='sm' />
          <Text color='grey.500' fontSize={'sm'}>{`${price} RON`}</Text>
        </Flex>
        <Flex direction={'row'} alignItems={'center'} gap={2}>
          <Icon as={Entypo} name='time-slot' size='sm' />
          <Text color='grey.500'  fontSize={'sm'}>{`${time} hours`}</Text>
        </Flex>
        <Button
          size='sm'
          borderRadius='xl'
          bg='#00a884'
          //width='45%'
          leftIcon={<Icon as={FontAwesome} name='whatsapp' size='sm' />}
          _pressed={{
            bgColor: '#017561',
          }}
          onPress={() => {
            Linking.openURL(`whatsapp://send?text=Hello! I can see tahtyou are interested in letting your ${petType.toLowerCase()} at my place. Can you give more details please?&phone=${phoneNumber}`)
          }}
        >
          Discuss
        </Button>
      </Flex>
    </Flex>
  );
};

export default TrocView;
