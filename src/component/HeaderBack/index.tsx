import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import TopTitle from '../../component/TopTitle';
import BasicText from "../../component/BasicText";
import TitleText from "../../component/TitleText";

interface Props {
    icon: any;
    title: string;
    iconFunc: () => void;
}

const HeaderBack = ({icon, title, iconFunc}: Props) => {


    return(
        

            <BackView>
                <BackBtn onPress={() => {iconFunc()}}>
                    <BackIcon
                        source={icon}
                    />
                </BackBtn>
                <HeaderTitle>
                    {title}
                </HeaderTitle>
            </BackView>

            
    )
}

export default HeaderBack;


const BackView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30px;
    margin-bottom: 20px;
`
const BackIcon = styled.Image`
    width: 25px;
    height: 25px;
`
const BackBtn = styled.TouchableOpacity`
    position: absolute;
    left: 5%;
`
const HeaderTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
`
