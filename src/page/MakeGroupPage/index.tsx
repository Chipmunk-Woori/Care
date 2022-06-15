import React from "react";
import {View} from "react-native";
import MakeGroupContainer from "../../container/MakeGroupContainer";

interface Props {
    navigation: any;
}

const MakeGroupPage = ({navigation}: Props) => {
    return(
        <>
            <MakeGroupContainer navigation={navigation}/>
        </>
    )
}

export default MakeGroupPage;