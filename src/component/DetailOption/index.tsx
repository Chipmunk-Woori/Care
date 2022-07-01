import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CommonSetting from "../../common/CommonSetting";

interface Props {
    children: any;
    marginBottom?: number;
    marginTop?: number;
}

const DetailOption = ({children, marginBottom, marginTop}: Props) => {
    return(
        <>
            <Text 
                style={{
                    fontSize: 13, 
                    color: 'rgb(218, 218, 228)',
                    marginBottom: marginBottom ? marginBottom : 12,
                    marginTop: marginTop ? marginTop : 12
                }}
            >
                {children}
            </Text>
        </>
    )
}

const styles = StyleSheet.create({
})


export default DetailOption;