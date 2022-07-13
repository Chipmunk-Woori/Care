import React, { useEffect } from "react";
import {View, StatusBar} from "react-native";
import TabFirst from '../../presentational/TabFirst';
import StatusBarDefault from "../../component/StatusBarDefult";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RecordBody from "../../common/RecordBody.json";
import {useIsFocused} from '@react-navigation/native';

interface Props {
    navigation: any;
    route: any;
}

const TabFirstContainer = ({navigation, route}: Props) => {

    //route
    //{"key": "TabFirst-Kd-0KzgxFEsNy2CKwRIVp", "name": "TabFirst", "params": undefined}

    const isFocused = useIsFocused();

    const moveTo = (screen: any) => {
        navigation.push(screen);
    }

    const goBack = () => {
        navigation.goBack();
    }

    return(
        <>
            <StatusBarDefault />
            <TabFirst 
                moveTo={moveTo}
                goBack={goBack}
                route={route}
            />
        </>
    )
}

export default TabFirstContainer;