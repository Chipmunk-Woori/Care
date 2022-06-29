import React, {useRef, useState, useEffect} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, FlatList} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";
import Carousel, { Pagination } from 'react-native-snap-carousel';

interface Props {
    navigation: any;
}

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const ImageUpload = ({navigation}: Props) => {

    const goBack = () => {
        navigation.goBack();
    }


    return(
        <Container>
            <TouchableOpacity
                onPress={()=>{goBack()}}
            >
                <Text>뒤로</Text>
            </TouchableOpacity>
        </Container>

    )
}

const Container = styled.SafeAreaView`
    width: ${ScreenWidth}px;
    height: ${ScreenHeight}px;
    background-color: ${CommonSetting.color.background_dark};
    background-color: #31a3d8;
`

export default ImageUpload;