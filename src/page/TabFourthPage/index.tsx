import React from "react";
import {View} from "react-native";
import TabFourthContainer from "../../container/TabFourthContainer";

interface Props {
    navigation: any;
}

const TabFourthPage = ({navigation}: Props) => {
    return(
        <>
            <TabFourthContainer navigation={navigation}/>
        </>
    )
}

export default TabFourthPage;