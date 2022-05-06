import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
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

import TabFirstPage from '../src/page/TabFirstPage';
import TabSecondPage from './page/TabSecondPage';
import TabThirdPage from './page/TabThirdPage';
import TabFourthPage from './page/TabFourthPage';
import TabFifthPage from './page/TabFifthPage';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

  const FirstTabStack = createNativeStackNavigator();

  const FirstTabStackScreen = () => {
    return(
      <FirstTabStack.Navigator>
        <FirstTabStack.Screen
            name="TabFirst"
            component={TabFirstPage}
            options={{headerShown: false}}
        />
      </FirstTabStack.Navigator>
    )
  }
  return (
    <>
      <NavigationContainer>
         

      </NavigationContainer>
    </>
   
    
  );
};

const styles = StyleSheet.create({

});

export default App;
