import React, {useRef, useState, useEffect} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, FlatList} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";
import MakeGroup from '../../presentational/MakeGroup';

interface Props {
    navigation: any;
}

const MakeGroupContainer = ({navigation}: Props) => {

    const goBack = () => {
        navigation.goBack();
    }

    return(
        <>
            <MakeGroup 
                goBack={goBack}
            />
        </>
    )
}

export default MakeGroupContainer;