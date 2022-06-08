import React from "react";
import { View, Text } from "react-native";
import CommonSetting from "../../common/CommonSetting";

interface Props {
    children: any
}

const TitleText = ({children}: Props) => {
    return(
        <>
            <Text style={{fontSize: 17, color: 'white', fontWeight: '700'}}>
                {children}
            </Text>
        </>
    )
}


export default TitleText;