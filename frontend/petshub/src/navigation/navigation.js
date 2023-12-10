import React from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { isUserAuthenticatedSelector } from '../selectors/auth.js';
import { Fab, IconButton } from 'native-base';
import { Box } from 'native-base';
import { Ionicons, AntDesign } from '@expo/vector-icons';

// Screens
import Map from '../screens/Map.tsx';
import Profile from '../screens/Profile.tsx';
import SignIn from '../screens/SignIn.tsx';
import SignUp from '../screens/SignUp.tsx';
import SplashScreen from '../screens/SplashScreen.tsx';
import Landing from '../screens/Landing.tsx';
import Notifications from '../screens/Notifications.tsx';
import Explore from '../screens/Explore.tsx';
import AddProduct from '../screens/AddProduct.tsx';
// import UserLocation from '../screens/Profile/UserLocation.tsx';
import Product from '../screens/Product.tsx';
import AddProductImage from '../screens/AddProductImage.tsx';
import Camera from '../screens/Camera.tsx';

// Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const MapStack = createStackNavigator();
const ProductAddStack = createStackNavigator();

function MapStackScreen() {
  return (
    <MapStack.Navigator initialRouteName='MapIndex'>
      <MapStack.Screen
        name='MapIndex'
        component={Map}
        options={{ headerShown: false }}
      />
    </MapStack.Navigator>
  );
}

function ProductAddStackScreen() {
  return (
    <ProductAddStack.Navigator initialRouteName='AddProductImage'>
      <ProductAddStack.Screen
        name='AddProductImage'
        component={AddProductImage}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      ></ProductAddStack.Screen>
      <ProductAddStack.Screen
        name='AddProduct'
        component={AddProduct}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      ></ProductAddStack.Screen>
      <ProductAddStack.Screen
        name='Camera'
        component={Camera}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      ></ProductAddStack.Screen>
    </ProductAddStack.Navigator>
  );
}
// function ProfileTopNav({ detailsData }) {
//   return (
//     <TopTab.Navigator
//       screenOptions={{
//         tabBarPressColor: 'transparent',
//         tabBarLabelStyle: {
//           fontSize: 12,
//           textTransform: 'capitalize',
//           fontWeight: 600,
//         },
//         tabBarIndicatorStyle: {
//           backgroundColor: '#F28B40',
//           height: 5,
//           borderRadius: 30,
//           width: '10%',
//           marginLeft: '9%',
//         },
//       }}
//     >
//       <TopTab.Screen
//         name='ProfileReviews'
//         component={ProfileReviews}
//         options={{ tabBarLabel: 'Reviews' }}
//       />
//       <TopTab.Screen
//         name='ProfileDetails'
//         children={() => <ProfileDetails data={detailsData} />}
//         options={{ tabBarLabel: 'Info' }}
//       />
//       <TopTab.Screen
//         name='Location'
//         component={UserLocation}
//         options={{ tabBarLabel: 'Map' }}
//       />
//     </TopTab.Navigator>
//   );
// }

function BottomNav({ navigation }) {
  return (
    <>
      <BottomTab.Navigator
        screenOptions={{
          tabBarStyle: { position: 'absolute' },
          title: '',
          tabBarActiveTintColor: '#F28B40',
        }}
        tabBarOptions={{
          showLabel: false,
        }}
      >
        <BottomTab.Screen
          name='Map'
          component={MapStackScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return <Feather name='map' size={26} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name='Explore'
          component={Explore}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return <AntDesign name='search1' size={28} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name='AddProductStack'
          component={ProductAddStackScreen}
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Box
                  mt='-10'
                  shadow='6'
                  p='3'
                  borderRadius='full'
                  style={{ backgroundColor: '#D94506' }}
                >
                  <Ionicons
                    name='add-outline'
                    size={28}
                    color='white'
                    style={{
                      fontWeight: 600,
                    }}
                  />
                </Box>
              );
            },
          }}
        />
        <BottomTab.Screen
          name='Notifications'
          component={Notifications}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name='notifications-outline'
                  size={30}
                  color={color}
                />
              );
            },
          }}
        />
        <BottomTab.Screen
          name='Profile'
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name='person-circle-outline'
                  size={34}
                  color={color}
                />
              );
            },
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}

const RootStack = createStackNavigator();

function RootNavigator() {
  return (
    <RootStack.Navigator initialRouteName='Landing'>
      <RootStack.Screen
        name='Landing'
        component={Landing}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name='SignIn'
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name='SignUp'
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
}

const MainNavigation = () => {
    // const authenticated = useSelector(isUserAuthenticatedSelector);
  //const authenticated = true;
  const authenticated = false;
  return (
    <NavigationContainer>
      {!authenticated ? (
        <RootNavigator />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name='MapBase'
            options={{ headerShown: false }}
            component={BottomNav}
          />
          <Stack.Screen
            name='SplashScreen'
            options={{ headerShown: false }}
            component={SplashScreen}
          />
          <Stack.Screen
            name='Product'
            component={Product}
            options={{
              headerShown: false,
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          {/* add your another screen here using -> Stack.Screen */}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    setToken: (email, token, expiration) => {
      dispatch(actionCreators.setToken(email, token, expiration));
    },
  };
};

export { MainNavigation };