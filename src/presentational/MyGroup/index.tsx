import React, {useRef, useState, useEffect} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, FlatList} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";


interface Props {
    moveTo: (screen: any) => void;
    newGroups: any;
}

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const MyGroup = ({moveTo, newGroups}: Props) => {

    

    return(
        <Container>
            <Scroll>

            </Scroll>
        </Container>
    )
}

const Container = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    background-color: ${CommonSetting.color.background_dark};
    background-color: beige;
`
const Scroll = styled.ScrollView`
    padding-left: ${CommonSetting.screenPaddingHorizontal};
    padding-right: ${CommonSetting.screenPaddingHorizontal};
    margin-bottom: 130px;
`
const RowView = styled.View`
    flex-direction: row;
`

export default MyGroup;