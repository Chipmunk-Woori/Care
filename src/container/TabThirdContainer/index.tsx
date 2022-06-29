import React from "react";
import {View, Dimensions} from "react-native";
import TabThird from '../../presentational/TabThird';

interface Props {
    navigation: any;
}

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const TabThirdContainer = ({navigation}: Props) => {

    const moveTo = (screen: any) => {
        navigation.push(screen);
    }
    
    return(
        <>
            <TabThird />
        </>
    )
}

export default TabThirdContainer;