import React, {useRef, useState, useEffect} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, FlatList} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";

interface Props {

}

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const GuideViewHeight = ScreenHeight * 0.28;
const BtnViewHeight = ScreenHeight * 0.085;
const NewGroupWidth = ScreenWidth - ScreenWidth * 0.11;
const groupsHeight = BtnViewHeight * 3 + 10;

const TabSecond = () => {

    return (
       <>
       </>
    )
}




export default TabSecond;