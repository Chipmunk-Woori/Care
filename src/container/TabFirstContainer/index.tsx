import React, { useEffect } from "react";
import {View, StatusBar} from "react-native";
import TabFirst from '../../presentational/TabFirst';
import StatusBarDefault from "../../component/StatusBarDefult";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RecordBody from "../../common/RecordBody.json";
import {useIsFocused} from '@react-navigation/native';

interface Props {
    navigation: any;
}

const TabFirstContainer = ({navigation}: Props) => {

    const isFocused = useIsFocused();

    const moveTo = (screen: any) => {
        navigation.push(screen);
    }

    return(
        <>
            <StatusBarDefault />
            <TabFirst 
                moveTo={moveTo}
            />
        </>
    )
}

export default TabFirstContainer;