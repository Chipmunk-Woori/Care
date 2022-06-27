import React, {useRef, useState, useEffect} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, FlatList} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Group from '../../presentational/Group';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    navigation: any;
}

const GroupContainer = ({navigation}: Props) => {

    const [newGroups, setNewGroups] = useState([]);

    const moveTo = (screen: any) => {
        navigation.push(screen);
    }


    const getNewGroups = async () => {
        try {
            const value = await AsyncStorage.getItem('newGroups');
            if (value !== null) {
                let valueArr = JSON.parse(value);
                setNewGroups(valueArr);
            } else {
                console.log('newGroups 가져오기 실패');             
            }
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        getNewGroups();
    },[])

    return(
        <>
            <Group 
                moveTo={moveTo}
                newGroups={newGroups}
            />
        </>
    )
}

export default GroupContainer;