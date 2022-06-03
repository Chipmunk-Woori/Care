import React from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';


interface Props {

}

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const GuideViewHeight = ScreenHeight * 0.25;

const TabSecond = () => {
    return(
        <Container>

            <HeaderView>
                <HeaderBtnView>
                    <HeaderBtn>
                        <HeaderText>
                            그룹
                        </HeaderText>
                    </HeaderBtn>
                    <HeaderBtn>
                        <HeaderText>
                            서바이벌
                        </HeaderText>
                    </HeaderBtn>
                    <HeaderBtn>
                        <HeaderText>
                            종료된
                        </HeaderText>
                    </HeaderBtn>
                </HeaderBtnView>

                <TouchableOpacity>
                    <SearchIcon
                        source={require('../../assets/search.png')}
                    />
                </TouchableOpacity>
            </HeaderView>


            <ScrollView style={{paddingHorizontal:'7%'}}>
                <GuideView>
                    <Image
                        style={{width: 30, height: 30}}
                        source={require('../../assets/search.png')}
                    />
                    <GuideText1>
                        친구랑 기록을 실시간 공유해요
                    </GuideText1>
                </GuideView>

            </ScrollView>

        </Container>
    )
}

const Container = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    background-color: ${CommonSetting.color.background_light};
`
const HeaderView = styled.View`
    width: 100%;
    height: 7%;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 5%;
    padding-right: 5%;
`
const HeaderBtnView = styled.View`
    flex-direction: row;
    width: 50%;
    justify-content: space-between;
    align-items: center;
`
const HeaderBtn = styled.TouchableOpacity`
`
const HeaderText = styled.Text`
    font-size: 18px;
    color: ${CommonSetting.color.text_dark};
    font-weight: bold;
`
const SearchIcon = styled.Image`
    width: 17px;
    height: 17px;
`
const GuideView = styled.View`
    width: 100%;
    height: ${GuideViewHeight}px;
    border-color: #c0c0c0;
    border-width: 1px;
    border-radius: 10px;
    margin-top: 10px;
    border-style: dotted;
    align-items: center;
    justify-content: center;
    /* background-color: beige; */
`
const GuideText1 = styled.Text`
    font-size: 20px;
    margin-top: 20px;
`
const GuideText2 = styled.Text`
    font-size: 12px;
`

export default TabSecond;