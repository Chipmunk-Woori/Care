import React from "react";
import {View} from "react-native";
import TabSecond from '../../presentational/TabSecond';

interface Props {
    navigation: any;
}

const TabSecondContainer = ({navigation}: Props) => {
    return(
        <>
            <TabSecond/>
        </>
    )
}

export default TabSecondContainer;