import React from "react";
import {View} from "react-native";
import TabFifth from '../../presentational/TabFifth';

interface Props {
    navigation: any;
}

const TabFifthContainer = ({navigation}: Props) => {
    return(
        <>
            <TabFifth/>
        </>
    )
}

export default TabFifthContainer;