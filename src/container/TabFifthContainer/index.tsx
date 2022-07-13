import React, { useEffect } from "react";
import {View, StatusBar} from "react-native";
import TabFifth from '../../presentational/TabFifth';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
    navigation: any;
}

const TabFifthContainer = ({navigation}: Props) => {

    const isFocused = useIsFocused();

    const testFirstTab = async() => {
        let record = await AsyncStorage.getItem('MyRecord');

        if (record !== null) {
            let recordValue = JSON.parse(record);
            recordValue.map((item :any) => {
                console.log("확인 : " + item.date)
            })
        }
        
    }

    useEffect(() => {
        if (isFocused == true) {
            console.log('🔥 하단탭5')
            testFirstTab()
        }
    },[isFocused])


    return(
        <>
            <StatusBar barStyle={'light-content'} />
            <TabFifth/>
        </>
    )
}

export default TabFifthContainer;