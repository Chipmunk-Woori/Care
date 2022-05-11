import React from "react";
import {View} from "react-native";
import TabFirstContainer from "../../container/TabFirstContainer";

interface Props {
    navigation: any;
}

const TabFirstPage = ({navigation}: Props) => {
    return(
        <>
            <TabFirstContainer navigation={navigation}/>
        </>
    )
}

export default TabFirstPage;