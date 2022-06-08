import React from "react";
import { View, Text } from "react-native";
import CommonSetting from "../../common/CommonSetting";

interface Props {
    children: any
}

const BasicText = ({children}: Props) => {
    return(
        <>
            <Text style={{fontSize: 15, color: 'white', fontWeight: '600'}}>
                {children}
            </Text>
        </>
    )
}


export default BasicText;