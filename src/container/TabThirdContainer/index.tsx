import React from "react";
import {View} from "react-native";
import TabThird from '../../presentational/TabThird';

interface Props {
    navigation: any;
}

const TabThirdContainer = ({navigation}: Props) => {
    return(
        <>
            <TabThird />
        </>
    )
}

export default TabThirdContainer;