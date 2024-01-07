import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { tokenActionCreators as actionCreators } from '../store/actions/actionCreator';
import { NETWORK_IP } from '../util/constant';
import GoogleIcon from '../../assets/google-icon';
import { AntDesign } from '@expo/vector-icons';
import Routes from '../navigation/routes';

WebBrowser.maybeCompleteAuthSession();

const SignIn = ({ navigation, setToken }: any) => {
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });
  const [isInvalid, setIsInvalid] = useState(false);
  const [show, setShow] = React.useState(false);

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
          email: user.email,
          photo: user?.picture,
        });
      } catch (error) {
        console.log(error);
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
      console.log(data.token);
      setToken(user.email, data.token, JSON.stringify(data.expiration));
      alert('You succesfully logged in');
      navigation.navigate('Upcoming-Trips', {
        forRefresh: new Date().toString(),
      });
      setLoginUser({ ...loginUser, email: '', password: '' });
      navigation.navigate('Upcoming-Trips', {
        forRefresh: new Date().toString(),
      });
    } else {
      setIsInvalid(true);
    }
  }

  async function signInHandler(email: string, password: string) {
    setIsInvalid(false);
    let user = {
      email: email,
      password: password,
    };
    
    const response = await fetch(`http://${NETWORK_IP}:7262/User/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (data.token) {
      setToken(
        email,
        data.token,
        JSON.stringify(data.expiration),
        data.name,
        data.phoneNumber
      );
      //alert('You succesfully logged in');
      // navigation.navigate(Routes.MAP, {
      //   forRefresh: new Date().toString(),
      // });
      setLoginUser({ ...loginUser, email: '', password: '' });
    } else {
      setIsInvalid(true);
    }
  }
  return (
    <Flex style={styles.container}>
      <ScrollView>
        <Flex mx='6' style={styles.card} mt={32}>
          <Flex alignItems='center'>
            <Heading fontSize={24} color={'rgba(79, 79, 79, 1)'}>
              Welcome back!
            </Heading>
            <Text
              mt='2'
              fontSize={16}
              color='rgba(151, 148, 148, 1)'
              textAlign='center'
              maxW={'250px'}
            >
              Please fill the form with your data account in order to connect.
            </Text>
          </Flex>
          <Flex alignItems='center' mt={100} gap='2'>
            <FormControl id='error-message' isInvalid={isInvalid}>
              <FormControl.ErrorMessage>
                Invalid Credentials
              </FormControl.ErrorMessage>
            </FormControl>
            <Input
              variant={'filled'}
              value={loginUser.email}
              onChangeText={(text) =>
                setLoginUser({ ...loginUser, email: text })
              }
              w={{
                base: '100%',
              }}
              bgColor={'rgba(245, 245, 245, 1)'}
              size={'xl'}
              rounded={'12'}
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

            <Input
              variant={'filled'}
              mt={'5'}
              value={loginUser.password}
              onChangeText={(text) =>
                setLoginUser({ ...loginUser, password: text })
              }
              w={{
                base: '100%',
              }}
              bgColor={'rgba(245, 245, 245, 1)'}
              size={'xl'}
              rounded={'12'}
              type={show ? 'text' : 'password'}
              InputLeftElement={
                <Icon
                  as={<AntDesign name='lock1' size={24} color='black' />}
                  size={5}
                  ml='2'
                  color='black'
                />
              }
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
              placeholder='Password'
            />
          </Flex>
          <Flex alignItems='center' mt={'50px'}>
            <Button
              size={'lg'}
              w='100%'
              bgColor='#D94506'
              rounded={'12'}
              onPress={() => {
                signInHandler(loginUser.email, loginUser.password);
              }}
              _pressed={{
                bgColor: '#812A05',
              }}
            >
              Connect
            </Button>
            <Text color='rgba(151, 148, 148, 1)' mt={'40px'} fontSize={16}>
              or continue with
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
        bgColor={'white'}
        bottom={5}
        direction={'row'}
        justifyContent={'center'}
        pt={2}
      >
        <Text color={'rgba(151, 148, 148, 1)'} fontSize={16}>
          You don't have an account?{' '}
        </Text>
        <Pressable onPress={() => navigation.navigate(Routes.SIGN_UP)}>
          {({ isPressed }) => {
            return (
              <Text
                color={'rgba(151, 148, 148, 1)'}
                fontSize={16}
                fontWeight='bold'
                underline={isPressed ? true : false}
              >
                Sign up
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
