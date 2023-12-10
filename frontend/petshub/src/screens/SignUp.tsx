import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import GoogleIcon from '../../assets/google-icon';
import { tokenActionCreators as actionCreators } from '../store/actions/actionCreator';
import { NETWORK_IP } from '../util/constant';
import Routes from '../navigation/routes';

WebBrowser.maybeCompleteAuthSession();

const SignUp = ({ navigation, setToken }: any) => {
  const emptyErrors = {
    Email: {
      state: false,
      message: '',
      propertyName: 'Email',
    },
    Username: {
      state: false,
      message: '',
      propertyName: 'Username',
    },
    PhoneNumber: {
      state: false,
      message: '',
      propertyName: 'PhoneNumber',
    },
    Password: {
      state: false,
      message: '',
      propertyName: 'Password',
    },
    ConfirmedPassword: {
      state: false,
      message: '',
      propertyName: 'ConfirmedPassword',
    },
  };

  const [show, setShow] = React.useState(false);

  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
    phoneNumber: '',
    confirmedPassword: '',
  });
  const [errors, setErrors] = useState(emptyErrors);
  const [isInvalid, setIsInvalid] = useState(false);

  const [token, setTokenState] = useState('');
  const [userInfo, setUserInfo] = useState<any>(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      '564938101615-pepnernlen0chrcqkinqv3aqfq7ou32p.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setTokenState(
        response.authentication ? response.authentication.accessToken : ''
      );
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    if (token !== '') {
      try {
        const response = await fetch(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const user = await response.json();

        await createAccountFromGoogleAndSignIn({
          googleId: user.id,
          username: user.name,
          phoneNumber: user.phoneNumber,
          email: user.email,
          photo: user?.picture,
        });
      } catch (error) {
        setIsInvalid(true);
      }
    }
  };

  async function createAccountFromGoogleAndSignIn(user: any) {
    const response = await fetch(
      `http://${NETWORK_IP}:7262/User/createAccountFromGoogle`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );

    const data = await response.json();

    if (data.token) {
      setToken(user.email, data.token, JSON.stringify(data.expiration));
      alert('You succesfully logged in');
      navigation.navigate('Upcoming-Trips', {
        forRefresh: new Date().toString(),
      });
    } else {
      setIsInvalid(true);
    }
  }
  async function registerHandler() {
    console.log(user);
    const response = await fetch(`http://${NETWORK_IP}:7262/User/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    let emptyUser = {
      email: '',
      name: '',
      phoneNumber: '',
      password: '',
      confirmedPassword: '',
    };

    if (response.ok) {
      setUser(emptyUser);
      navigation.navigate(Routes.SIGN_IN);
    } else if (response.status === 412) {
      const serverErrors = await response.json();
      console.log(serverErrors);

      let newErrors: any = emptyErrors;
      Array.from(serverErrors).forEach((serr: any) => {
        if (errors.hasOwnProperty(serr.propertyName)) {
          newErrors[serr.propertyName].state = true;
          newErrors[serr.propertyName].message = serr.errorMessage;
        }
      });
      setErrors({ ...newErrors });
    }
  }
  return (
    <Flex style={styles.container}>
      <ScrollView>
        <Flex mx='6' style={styles.card} mt='20'>
          <Flex alignItems='center'>
            <Heading color={'rgba(79, 79, 79, 1)'} fontSize={'24'}>
              Creează-ți contul
            </Heading>
            <Text
              w={'85%'}
              textAlign={'center'}
              mt={2}
              color='rgba(151, 148, 148, 1)'
              fontSize={16}
            >
              Ne bucuram ca ni te alături! Introduceți detaliile dvs. mai jos.
            </Text>
          </Flex>
          <Flex alignItems='center' mt={12}>
            <FormControl isRequired isInvalid={errors.Username.state}>
              <Input
                value={user.name}
                onChangeText={(text) => setUser({ ...user, name: text })}
                variant={'filled'}
                rounded={12}
                size={'xl'}
                InputLeftElement={
                  <Icon
                    as={<AntDesign name='user' size={24} color='black' />}
                    size={5}
                    ml='2'
                    color='black'
                  />
                }
                placeholder='Numele complet'
              />
              <FormControl isRequired isInvalid={errors.Email.state} mt={'5'}>
                <Input
                  value={user.email}
                  onChangeText={(text) => setUser({ ...user, email: text })}
                  w={{
                    base: '100%',
                  }}
                  variant={'filled'}
                  rounded={12}
                  size={'xl'}
                  InputLeftElement={
                    <Icon
                      as={<AntDesign name='mail' size={24} color='black' />}
                      size={5}
                      ml='2'
                      color='black'
                    />
                  }
                  placeholder='Email'
                />
                <FormControl.ErrorMessage>
                  {errors.Email.message}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl.ErrorMessage>
                {errors.Username.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={errors.PhoneNumber.state}
              mt={'5'}
            >
              <Input
                value={user.phoneNumber}
                onChangeText={(text) => setUser({ ...user, phoneNumber: text })}
                w={{
                  base: '100%',
                }}
                variant={'filled'}
                rounded={12}
                size={'xl'}
                InputLeftElement={
                  <Icon
                    as={<AntDesign name='phone' size={24} color='black' />}
                    size={5}
                    ml='2'
                    color='black'
                  />
                }
                placeholder='Număr de telefon'
              />
              <FormControl.ErrorMessage>
                {errors.PhoneNumber.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.Password.state} mt={5}>
              <Input
                value={user.password}
                onChangeText={(text) => setUser({ ...user, password: text })}
                variant={'filled'}
                rounded={12}
                size={'xl'}
                InputLeftElement={
                  <Icon
                    as={<AntDesign name='lock1' size={24} color='black' />}
                    size={5}
                    ml='2'
                    color='black'
                  />
                }
                type={show ? 'text' : 'password'}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? 'visibility' : 'visibility-off'}
                        />
                      }
                      size={5}
                      mr='2'
                      color='black'
                    />
                  </Pressable>
                }
                placeholder='Parola'
              />
              <FormControl.ErrorMessage>
                {errors.Password.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={errors.ConfirmedPassword.state}
              mt={5}
            >
              <Input
                value={user.confirmedPassword}
                onChangeText={(text) =>
                  setUser({ ...user, confirmedPassword: text })
                }
                variant={'filled'}
                rounded={12}
                size={'xl'}
                InputLeftElement={
                  <Icon
                    as={<AntDesign name='lock1' size={24} color='black' />}
                    size={5}
                    ml='2'
                    color='black'
                  />
                }
                type={'password'}
                placeholder='Confirmă parola'
              />
              <FormControl.ErrorMessage>
                {errors.ConfirmedPassword.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </Flex>
          <Flex alignItems='center' mt={8} mb={20}>
            <Button
              size={'lg'}
              w='100%'
              bgColor={'#D94506'}
              rounded={'12'}
              onPress={() => {
                setErrors({ ...emptyErrors });
                registerHandler();
              }}
              _pressed={{
                bgColor: '#812A05',
              }}
            >
              Inscrie-te
            </Button>
            <Text color='rgba(151, 148, 148, 1)' fontSize={16} mt={'35'}>
              sau continua cu
            </Text>
            <Flex direction='row' gap='8'>
              <Button
                mt={'20px'}
                w='15%'
                bgColor={'rgba(245, 245, 245, 1)'}
                rounded={'12'}
                p={4}
                disabled={!request}
                onPress={() => {
                  promptAsync();
                }}
                _pressed={{
                  bgColor: 'rgba(120, 120, 120, 0.5)',
                }}
              >
                <GoogleIcon />
              </Button>
              <Button
                mt={'20px'}
                w='15%'
                bgColor={'#0866FF'}
                rounded={'12'}
                p={4}
                disabled={!request}
                _pressed={{
                  bgColor: 'rgba(120, 120, 120, 0.5)',
                }}
              >
                <FontAwesome name='facebook-f' size={24} color='white' />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </ScrollView>
      <Flex
        bottom={5}
        direction={'row'}
        justifyContent={'center'}
        bgColor={'white'}
      >
        <Text color={'rgba(151, 148, 148, 1)'} fontSize={16}>
          Ai deja un cont?{' '}
        </Text>
        <Pressable onPress={() => navigation.navigate(Routes.SIGN_IN)}>
          {({ isPressed }) => {
            return (
              <Text
                color={'rgba(151, 148, 148, 1)'}
                fontSize={16}
                fontWeight='bold'
                underline={isPressed ? true : false}
              >
                Conectare
              </Text>
            );
          }}
        </Pressable>
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  card: {
    borderRadius: 5,
    height: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

const mapStateToProps = (state: any) => {
  return {
    /*email2: state.email*/
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    setToken: (email: string, token: string, expiration: any) => {
      dispatch(actionCreators.setToken(email, token, expiration));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
