import React, {useRef, useState, useEffect} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, FlatList} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Group from '../../presentational/Group';

interface Props {
    navigation: any;
}

const GroupContainer = ({navigation}: Props) => {
    return(
        <>
            <Group />
        </>
    )
}

export default GroupContainer;