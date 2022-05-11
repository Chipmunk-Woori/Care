import React from "react";
import {View} from "react-native";
import TabFifthContainer from "../../container/TabFifthContainer";

interface Props {
    navigation: any;
}

const TabFifthPage = ({navigation}: Props) => {
    return(
        <>
            <TabFifthContainer navigation={navigation}/>
        </>
    )
}

export default TabFifthPage;