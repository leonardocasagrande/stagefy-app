import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import AppBuilder from './pages/AppBuilder';
import ChatRoom from './pages/ChatRoom';
import CreateAccount from './pages/CreateAccount';
import HomeTabs from './pages/HomeTabs';
import Introduction from './pages/Introduction';
import Login from './pages/Login';
import StreamerHome from './pages/StreamerHome';
import StreamerSchedule from './pages/StreamerSchedule';

export type RootStackPagesList = {
  HomeTabs: undefined;
  ChatRoom: {};
  Introduction: undefined;
  AppBuilder: undefined;
  Login: undefined;
  CreateAccount: undefined;
  StreamerHome: undefined;
  StreamerSchedule: undefined;
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
          <RootStackScreen name="StreamerHome" component={StreamerHome} />
          <RootStackScreen
            name="StreamerSchedule"
            component={StreamerSchedule}
          />
          <RootStackScreen name="HomeTabs" component={HomeTabs} />
          <RootStackScreen name="ChatRoom" component={ChatRoom} />
        </RootStackGroup>
      </RootStackNavigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
