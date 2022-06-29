import React from "react";
import {View, Text, Dimensions} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";

interface Props {

}

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const TabThird = () => {
    return(
        <Container>
        
        </Container>
    )
}

const Container = styled.SafeAreaView`
    width: ${ScreenWidth};
    height: ${ScreenHeight};
    background-color: ${CommonSetting.color.background_dark};
`

export default TabThird;