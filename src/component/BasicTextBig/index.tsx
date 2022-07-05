import React from "react";
import { View, Text } from "react-native";
import CommonSetting from "../../common/CommonSetting";

interface Props {
    children: any;
    marginTop? : number;
    marginBottom? : number;
}

const BasicTextBig = ({children, marginTop, marginBottom}: Props) => {
    return(
        <>
            <Text 
                style={{
                    fontSize: 16, 
                    color: 'white',
                    marginTop: marginTop ? marginTop : 0,
                    marginBottom: marginBottom ? marginBottom : 0,
                }}>
                {children}
            </Text>
        </>
    )
}


export default BasicTextBig;