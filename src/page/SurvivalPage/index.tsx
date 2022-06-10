import React from "react";
import {View} from "react-native";
import SurvivalContainer from "../../container/SurvivalContainer";

interface Props {
    navigation: any;
}

const SurvivalPage = ({navigation}: Props) => {
    return(
        <>
            <SurvivalContainer navigation={navigation}/>
        </>
    )
}

export default SurvivalPage;