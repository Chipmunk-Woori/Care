import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CommonSetting from './common/CommonSetting';

import TabFirstPage from '../src/page/TabFirstPage';
import TabSecondPage from './page/TabSecondPage';
import TabThirdPage from './page/TabThirdPage';
import TabFourthPage from './page/TabFourthPage';
import TabFifthPage from './page/TabFifthPage';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//1
const TabFirstStack = createNativeStackNavigator();

const TabFirstStackScreen = ({navigation}: any) => {
    return(
        <TabFirstStack.Navigator>
            <TabFirstStack.Screen
                name="TabFirst"
                component={TabFirstPage}
                options={{headerShown: false}}
            />
        </TabFirstStack.Navigator>
    )
}

//2
const TabSecondStack = createNativeStackNavigator();

const TabSecondStackScreen = ({navigation}: any) => {
    return(
        <TabSecondStack.Navigator>
            <TabSecondStack.Screen
                name="TabSecond"
                component={TabSecondPage}
                options={{headerShown: false}}
            />
        </TabSecondStack.Navigator>
    )
}

//3
const TabThirdStack = createNativeStackNavigator();

const TabThirdStackScreen = ({navigation}: any) => {
    return(
        <TabThirdStack.Navigator>
            <TabThirdStack.Screen 
                name="TabThird"
                component={TabThirdPage}
                options={{headerShown: false}}
            />
        </TabThirdStack.Navigator>
            
    )
}

//4
const TabFourthStack = createNativeStackNavigator();

const TabFourthStackScreen = ({navigation}: any) => {
    return(
        <TabFourthStack.Navigator>
            <TabFourthStack.Screen
                name="TabFourth"
                component={TabFourthPage}
                options={{headerShown: false}}
            />
        </TabFourthStack.Navigator>
    )
}

//5
const TabFifthStack = createNativeStackNavigator();

const TabFifthStackScreen = ({navigation}: any) => {
    return(
        <TabFifthStack.Navigator>
            <TabFifthStack.Screen
                name="TabFifth"
                component={TabFifthPage}
                options={{headerShown: false}}
            />
        </TabFifthStack.Navigator>
    )
}



const App = () => {
    return (
         <NavigationContainer>
            <Tab.Navigator
                initialRouteName='TabFirst'
                screenOptions={{
                    headerShown: false
                }}
            >
                <Tab.Screen 
                    name="TabFirstScreen"
                    component={TabFirstStackScreen} 
                    options={ ({route}: any) => ({
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: CommonSetting.color.bottomTab,
                            borderTopWidth: 0
                        },
                        tabBarIcon: ({focused}) => (
                            <Image
                                style={{width:21, height:21}}
                                source={focused ? require('../src/assets/TabFirst_sel.png') : require('../src/assets/TabFirst.png')}
                            />
                        )
                    })}
                />
                <Tab.Screen 
                    name="TabSecondScreen"
                    component={TabSecondStackScreen} 
                    options={ ({route}: any) => ({
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: CommonSetting.color.bottomTab,
                            borderTopWidth: 0
                        },
                        tabBarIcon: ({focused}) => (
                            <Image
                                style={{width:25, height:25}}
                                source={focused ? require('../src/assets/TabSecond_sel.png') : require('../src/assets/TabSecond.png')}
                            />
                        )
                    })}
                />
                <Tab.Screen 
                    name="TabThirdScreen"
                    component={TabThirdStackScreen} 
                    options={ ({route}: any) => ({
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: CommonSetting.color.bottomTab,
                            borderTopWidth: 0
                        },
                        tabBarIcon: ({focused}) => (
                            <Image
                            style={{width:25, height:25}}
                                source={focused ? require('../src/assets/TabThird_sel.png') : require('../src/assets/TabThird.png')}
                            />
                        )
                    })}
                />
                <Tab.Screen 
                    name="TabFourthScreen"
                    component={TabFourthStackScreen} 
                    options={ ({route}: any) => ({
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: CommonSetting.color.bottomTab,
                            borderTopWidth: 0
                        },
                        tabBarIcon: ({focused}) => (
                            <Image
                                style={{width:22, height:22}}
                                source={focused ? require('../src/assets/TabFourth_sel.png') : require('../src/assets/TabFourth.png')}
                            />
                        )
                    })}
                />
                <Tab.Screen 
                    name="TabFifthScreen"
                    component={TabFifthStackScreen} 
                    options={ ({route}: any) => ({
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: CommonSetting.color.bottomTab,
                            borderTopWidth: 0
                        },
                        tabBarIcon: ({focused}) => (
                            <Image
                            style={{width:23, height:23}}
                                source={focused ? require('../src/assets/TabFifth_sel.png') : require('../src/assets/TabFifth.png')}
                            />
                        )
                    })}
                />
            </Tab.Navigator>
        </NavigationContainer>  
    );
};

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 24,
    height: 24
  }
});

export default App;
