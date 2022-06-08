import React from "react";
import {StatusBar, View} from "react-native";
import TabSecond from '../../presentational/TabSecond';

interface Props {
    navigation: any;
}

const TabSecondContainer = ({navigation}: Props) => {
    return(
        <>
            <StatusBar barStyle={'light-content'} />
            <TabSecond/>
        </>
    )
}

export default TabSecondContainer;