import React from "react";
import {View} from "react-native";
import TerminatedContainer from "../../container/TerminatedContainer";

interface Props {
    navigation: any;
}

const TerminatedPage = ({navigation}: Props) => {
    return(
        <>
            <TerminatedContainer navigation={navigation}/>
        </>
    )
}

export default TerminatedPage;