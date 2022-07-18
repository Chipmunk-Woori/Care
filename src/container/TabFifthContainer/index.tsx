import React, { useEffect } from "react";
import {View, StatusBar} from "react-native";
import TabFifth from '../../presentational/TabFifth';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
    navigation: any;
}

const TabFifthContainer = ({navigation}: Props) => {





    return(
        <>
            <StatusBar barStyle={'light-content'} />
            <TabFifth/>
        </>
    )
}

export default TabFifthContainer;