import React from "react";
import {View, StatusBar} from "react-native";
import TabFifth from '../../presentational/TabFifth';

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