import React from "react";
import {View} from "react-native";
import TabSecondContainer from "../../container/TabSecondContainer";

interface Props {
    navigation: any;
}

const TabSecondPage = ({navigation}: Props) => {
    return(
        <>
            <TabSecondContainer navigation={navigation}/>
        </>
    )
}

export default TabSecondPage;