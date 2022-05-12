import React from "react";
import {View} from "react-native";
import TabFirst from '../../presentational/TabFirst';

interface Props {
    navigation: any;
}

const TabFirstContainer = ({navigation}: Props) => {
    return(
        <>
            <TabFirst />
        </>
    )
}

export default TabFirstContainer;