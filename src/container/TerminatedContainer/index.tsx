import React, {useRef, useState, useEffect} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, FlatList} from "react-native";
import styled from 'styled-components/native';
import Terminated from '../../presentational/Terminated';

interface Props {
    navigation: any;
}

const TerminatedContainer = ({navigation}: Props) => {
    return(
        <>
            <Terminated/>
        </>
    )

}

export default TerminatedContainer;