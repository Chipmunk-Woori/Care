import React from "react";
import {View} from "react-native";
import TabThirdContainer from "../../container/TabThirdContainer";

interface Props {
    navigation: any;
}

const TabThirdPage = ({navigation}: Props) => {
    return(
        <>
            <TabThirdContainer navigation={navigation}/>
        </>
    )
}

export default TabThirdPage;