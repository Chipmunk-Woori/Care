import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity, Dimensions, TextInput, StyleSheet} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import TopTitle from '../../component/TopTitle';
import BasicText from "../../component/BasicText";
import TitleText from "../../component/TitleText";
import HeaderBack from "../../component/HeaderBack";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    goBack: () => void;
}

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const MakeGroup = ({goBack}: Props) => {

    const [groupName, setGroupName] = useState('그룹명을 입력해주세요');

    return(
        <Container>

                <HeaderBack 
                    icon={require('../../assets/back.png')}
                    title={'그룹 만들기'}
                    iconFunc={()=>{goBack()}}
                />

            <PaddingView>

                <GroupNameView>
                    <GroupNameIcon>

                    </GroupNameIcon>

                    <GroupNameInput
                        value={groupName}
                        onChangeText={setGroupName}
                    />

                    <RowCenter>
                        <GroupNameColor style={{backgroundColor:'rgb(226,129,144)'}}/>
                        <GroupNameColor style={{backgroundColor:'rgb(230,145,105)'}}/>
                        <GroupNameColor style={{backgroundColor:'rgb(230,167,79)'}}/>
                        <GroupNameColor style={{backgroundColor:'rgb(160,206,70)'}}/>
                        <GroupNameColor style={{backgroundColor:'rgb(130,219,183)'}}/>
                    </RowCenter>
                </GroupNameView>
                

            </PaddingView>
        </Container>
    )
}

export default MakeGroup;

const Container = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    background-color: ${CommonSetting.color.background_dark};
`
const PaddingView = styled.ScrollView`
    padding-left: ${CommonSetting.screenPaddingHorizontal};
    padding-right: ${CommonSetting.screenPaddingHorizontal};
`
const RowView = styled.View`
    flex-direction: row;
`
const RowTouch = styled.TouchableOpacity`
    flex-direction: row;
`
const GroupNameView = styled.View`
    width: 100%;
    height: 330px;
    background-color: rgb(47,49,62);
    border-radius: ${CommonSetting.btnBorderRadius}px;
    align-items: center;
`
const GroupNameIcon = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border-color: ${CommonSetting.color.borderColor};
    border-width: 1.5px;
    border-style: dashed;
    margin-top: 73px;
`
const GroupNameInput = styled.TextInput`
    padding: 10px;
    color: rgb(95, 95, 117);
    font-size: 24px;
    margin-top: 27px;
    font-weight: 500;
    margin-bottom: 30px;
`
const GroupNameColor = styled.TouchableOpacity`
    width: 25px;
    height: 25px;
    border-radius: 100px;
    margin-left: 10px;
    margin-right: 10px;
`
const RowCenter = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const styles = StyleSheet.create({
    
})

