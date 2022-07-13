import React from "react";
import {View} from "react-native";
import TabFirstContainer from "../../container/TabFirstContainer";

interface Props {
    navigation: any;
    route: any;
}

const TabFirstPage = ({navigation, route}: Props) => {
    return(
        <>
            <TabFirstContainer navigation={navigation} route={route}/>
        </>
    )
}

export default TabFirstPage;