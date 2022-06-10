import React from "react";
import {View} from "react-native";
import GroupContainer from "../../container/GroupContainer";

interface Props {
    navigation: any;
}

const GroupPage = ({navigation}: Props) => {
    return(
        <>
            <GroupContainer navigation={navigation}/>
        </>
    )
}

export default GroupPage;