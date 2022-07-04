import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CommonSetting from "../../common/CommonSetting";
import styled from 'styled-components/native';

interface Props {
    func: () => any;
    text: string;
    marginTop?: number;
    marginBottom?: number;
    backgroundColor?: string;
}

const FinalBtn = ({func, text, marginTop, marginBottom, backgroundColor}: Props) => {
    return(
        <BtnBack>
            <Btn 
                style={{backgroundColor: backgroundColor ? backgroundColor : 'rgb(48,48,62)'}}
                onPress={() => {func()}}
            >
                <BtnText>
                    {text}
                </BtnText>
            </Btn>
        </BtnBack>
    )
}

const BtnBack = styled.View`
    padding-top: 5px;
    padding-bottom: 5px;
    align-items: center;
    justify-content: center;
`
const Btn = styled.TouchableOpacity`
    width: 100%;
    height: 47px;
    background-color: rgb(48,48,62);
    align-items: center;
    justify-content: center;
    border-radius: ${CommonSetting.btnBorderRadius}px;
`
const  BtnText = styled.Text`
    font-size: 15px;
    font-weight: 500;
    color: white
`
export default FinalBtn;