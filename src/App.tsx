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
import { NavigationContainer, useNavigationBuilder } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CommonSetting from './common/CommonSetting';

import TabFirstPage from '../src/page/TabFirstPage';
import TabSecondPage from './page/TabSecondPage';
import TabThirdPage from './page/TabThirdPage';
import TabFourthPage from './page/TabFourthPage';
import TabFifthPage from './page/TabFifthPage';

import MakeGroupPage from './page/MakeGroupPage';
import GroupPage from './page/GroupPage';
import TerminatedPage from './page/TerminatedPage';
import SurvivalPage from './page/SurvivalPage';

import ImageUpload from './presentational/ImageUpload';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//1
const TabFirstStack = createNativeStackNavigator();

const TabFirstStackScreen = ({navigation, route}: any) => {
    return(
        <TabFirstStack.Navigator>
            <TabFirstStack.Screen
                name="TabFirst"
                component={TabFirstPage}
                options={{headerShown: false}}
            />
            <TabFirstStack.Screen
                name="ImageUpload0"
                component={ImageUpload}
                options={{
                    headerShown: false,
                    presentation: "transparentModal"
                }}
            />
        </TabFirstStack.Navigator>
    )
}

//2
const TabSecondStack = createNativeStackNavigator();

const TabSecondStackScreen = ({navigation, route}: any) => {
    return(
        <TabSecondStack.Navigator>
            <TabSecondStack.Screen
                name="TabSecond"
                component={TabSecondPage}
                options={{headerShown: false}}
            />
            <TabSecondStack.Screen
                name="Group"
                component={GroupPage}
                options={{headerShown: false}}
            />
            <TabSecondStack.Screen
                name="Terminated"
                component={TerminatedPage}
                options={{headerShown: false}}
            />
            <TabSecondStack.Screen
                name="Survival"
               component={SurvivalPage}
                options={{headerShown: false}}
            /> 
            <TabSecondStack.Screen
                name="MakeGroup"
               component={MakeGroupPage}
                options={{headerShown: false}}
            /> 
            <TabSecondStack.Screen
                name="ImageUpload1"
                component={ImageUpload}
                options={{
                    headerShown: false,
                    presentation: "transparentModal"
                }}
            /> 
        </TabSecondStack.Navigator>
    )
}

//3
const TabThirdStack = createNativeStackNavigator();

const TabThirdStackScreen = ({navigation, route}: any) => {
    return(
        <TabThirdStack.Navigator>
            <TabThirdStack.Screen 
                name="TabThird"
                component={TabThirdPage}
                options={{
                    headerShown: false,
                    presentation: "transparentModal"
                }}
            />
            <TabThirdStack.Screen 
                name="ImageUpload2"
                component={ImageUpload}
                options={{
                    headerShown: false,
                    presentation: "transparentModal"
                }}
            />
        </TabThirdStack.Navigator>
            
    )
}

//4
const TabFourthStack = createNativeStackNavigator();

const TabFourthStackScreen = ({navigation, route}: any) => {
    return(
        <TabFourthStack.Navigator>
            <TabFourthStack.Screen
                name="TabFourth"
                component={TabFourthPage}
                options={{headerShown: false}}
            />
            <TabFourthStack.Screen
                name="ImageUpload3"
                component={ImageUpload}
                options={{
                    headerShown: false,
                    presentation: "transparentModal"
                }}
            />
        </TabFourthStack.Navigator>
    )
}

//5
const TabFifthStack = createNativeStackNavigator();

const TabFifthStackScreen = ({navigation, route}: any) => {
    return(
        <TabFifthStack.Navigator>
            <TabFifthStack.Screen
                name="TabFifth"
                component={TabFifthPage}
                options={{headerShown: false}}
            />
            <TabFifthStack.Screen
                name="ImageUpload4"
                component={ImageUpload}
                options={{
                    headerShown: false,
                    presentation: "transparentModal"
                }}
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
                    listeners={({navigation}) => ({
                        tabPress: (e) => {
                            e.preventDefault() //탭을 누르면 발생하는 이벤트(화면 이동)를 막겠다
                            navigation.navigate(`ImageUpload${navigation.getState().index}`)
                        }
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
