import React from "react";
import {View} from "react-native";
import TabFourth from '../../presentational/TabFourth';

interface Props {
    navigation: any;
}

const TabFourthContainer = ({navigation}: Props) => {
    return(
        <>
            <TabFourth />
        </>
    )
}

export default TabFourthContainer;