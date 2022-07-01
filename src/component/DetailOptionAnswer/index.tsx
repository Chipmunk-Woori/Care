import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CommonSetting from "../../common/CommonSetting";
import styled from 'styled-components/native';



interface Props {
    children: any;
    marginBottom?: number;
}

const DetailOptionAnswer = ({children, marginBottom}: Props) => {
    return(
        <>
            <Text 
                style={{
                    fontSize: 14, 
                    color: 'white',
                    fontWeight: '500',
                    marginBottom: marginBottom ? marginBottom : 12
                }}
            >
                {children}
            </Text>
        </>
    )
}



export default DetailOptionAnswer;