import React, {useRef, useState, useEffect} from "react";
import {View, Text, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Dimensions, Image, FlatList, StyleSheet} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

interface Props {
    options?: Array<string>; //타이틀, 기능
}

const OptionModal = ({options}: Props) => {

    const optionView = () => {
        // return (

        // )
    }


    return (
        // <Background>
            <Container>

            
                <OptionView>
                    <OptionText>
                        공유
                    </OptionText>
                </OptionView>

                <OptionView>
                    <OptionText>
                        수정
                    </OptionText>
                </OptionView>

                <OptionView>
                    <OptionText>
                        날짜 변경
                    </OptionText>
                </OptionView>

                <OptionView>
                    <OptionText>
                        삭제
                    </OptionText>
                </OptionView>

                <OptionView>
                    <OptionText>
                        취소
                    </OptionText>
                </OptionView>

            </Container>
        // </Background>

    )

}

const Background = styled.View`
    position: absolute;
    background-color: red;
    opacity: 0.5;
    width: ${ScreenWidth}px;
    height: ${ScreenHeight}px;
`

const Container = styled.SafeAreaView`
    width: ${ScreenWidth*0.9}px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    background-color: black;
    bottom: ${ScreenHeight*0.03}px;
    align-self: center;
    align-items: center;
    position: absolute;
`
const OptionView = styled.TouchableOpacity`
    width: 90%;
    align-items: center;
    justify-conten: center;  
    padding-top: 15px;
    padding-bottom: 15px;
    border-top-width: 0.3px;
    border-top-color: ${CommonSetting.color.gray};
`
const OptionText = styled.Text`
    color: white;
    font-size: 15px;
`
export default OptionModal;