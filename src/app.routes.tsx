import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import Home from './pages/Home';
import ChatRoom from './pages/ChatRoom';
import Introduction from './pages/Introduction';
import AppBuilder from './pages/AppBuilder';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';

export type RootStackPagesList = {
  Home: undefined;
  ChatRoom: {
    username: string;
  };
  Introduction: undefined;
  AppBuilder: undefined;
  Login: undefined;
  CreateAccount: undefined;
};

export const useRootStackNavigation: () => NativeStackNavigationProp<
  RootStackPagesList,
  keyof RootStackPagesList
> = () => {
  return useNavigation<NativeStackNavigationProp<RootStackPagesList>>();
};

const defaultRootStackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const {
  Navigator: RootStackNavigator,
  Screen: RootStackScreen,
  Group: RootStackGroup,
} = createNativeStackNavigator<RootStackPagesList>();

const AppNavigationContainer: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator screenOptions={defaultRootStackScreenOptions}>
        <RootStackGroup>
          <RootStackScreen name="AppBuilder" component={AppBuilder} />
          <RootStackScreen name="Introduction" component={Introduction} />
          <RootStackScreen name="Login" component={Login} />
          <RootStackScreen name="CreateAccount" component={CreateAccount} />
          <RootStackScreen name="Home" component={Home} />
          <RootStackScreen name="ChatRoom" component={ChatRoom} />
        </RootStackGroup>
      </RootStackNavigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
