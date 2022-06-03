import React from "react";
import {View, StatusBar} from "react-native";
import TabFirst from '../../presentational/TabFirst';
import StatusBarDefault from "../../component/StatusBarDefult";

interface Props {
    navigation: any;
}

const TabFirstContainer = ({navigation}: Props) => {
    return(
        <>
            <StatusBarDefault />
            <TabFirst />
        </>
    )
}

export default TabFirstContainer;