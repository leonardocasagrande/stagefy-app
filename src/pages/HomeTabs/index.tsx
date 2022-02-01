import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import Home from '../Home';
import Library from '../Library';
import Missions from '../Missions';
import Profile from '../Profile';
import styles from './styles';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcon
              name={focused ? 'home' : 'home-outline'}
              size={30}
              color={colors.primaryMain}
            />
          ),
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      />
      <Tab.Screen
        name="Missions"
        component={Missions}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcon
              name={focused ? 'medal' : 'medal-outline'}
              size={30}
              color={colors.primaryMain}
            />
          ),
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicon
              name={focused ? 'book' : 'book-outline'}
              size={30}
              color={colors.primaryMain}
            />
          ),
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              name={focused ? 'user' : 'user-o'}
              size={30}
              color={colors.primaryMain}
            />
          ),
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
