import React from "react";
import { View, Text } from "react-native";
import CommonSetting from "../../common/CommonSetting";

interface Props {
    children: any,
    marginBottom?: number; 
}

const TitleText = ({children, marginBottom}: Props) => {
    return(
        <>
            <Text 
                style={{
                    fontSize: 17, 
                    color: 'white',
                    fontWeight: '700',
                    marginBottom: marginBottom ? marginBottom : 0
                }
            }>
                {children}
            </Text>
        </>
    )
}


export default TitleText;