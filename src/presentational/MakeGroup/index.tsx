import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity, Dimensions, TextInput, StyleSheet, FlatList, Switch} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import TopTitle from '../../component/TopTitle';
import BasicText from "../../component/BasicText";
import TitleText from "../../component/TitleText";
import HeaderBack from "../../component/HeaderBack";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    goBack :() => void;
}

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const MakeGroup = ({goBack} :Props) => {

    const [reload, setReload] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [intro, setIntro] = useState('');
    const [openSwitch, setOpenSwitch] = useState(false);
    const [connectionOptions, setConnectionOptions] = useState([
        {
            id : 1,
            name : '🍽 식단',
            selected : false
        },
        {
            id : 2,
            name : '🔥 운동',
            selected : false
        },
        {
            id : 3,
            name : '💧 물',
            selected : false
        },
        {
            id : 4,
            name : '👟 걸음',
            selected : false
        },
    ]);
    const [strengthOptions, setStrengthOptions] = useState([
        '가볍게', '적당히', '약간 세게', '철저하게'
    ])


    const toggleSwitch = () => setOpenSwitch(previousState => !previousState);

    const onPressCheck = (item :any) => {
        
        const tempArr = connectionOptions;

        tempArr.map((mi :any) => {
            if (mi.id === item.id) {
                mi.selected = !mi.selected;
            }
            setConnectionOptions(tempArr);
        })

        setReload(!reload);

    }

    const confirmCheck = (item :any) => {

        if (item.selected === true) {
            return (
                <Checked 
                    onPress={()=>{onPressCheck(item)}}> 
                    <CheckIcon
                        source={require('../../assets/check_white.png')}
                    />
                </Checked>
            )
        } else if (item.selected === false) {
            return (
                <NoChecked onPress={()=>{onPressCheck(item)}} /> 
            )
        }
 
    } 

    const connectionView = ({item} :any) => {
       
        return(
            <OptionView onPress={()=>{onPressCheck(item)}}>
                <OptionText>
                    {item.name}
                </OptionText>

                <CheckView>
                    {confirmCheck(item)}
                </CheckView>

            </OptionView>
        )
    }

    const strengthView = () => {
        
        return(
            strengthOptions.map((item:any, index:any) => {
                return (
                   <OptionView key={index.toString()}>
                        <OptionText>
                            {item}
                        </OptionText>
                   </OptionView> 
                )
            })
        )
    }

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('testSet', '👻 value 👻')
        } catch (e) {
            console.log(e)
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('testSet')
            if (value !== null) {
                console.log(value)
            }
        } catch (e) {
            console.log(e)
        }
    }

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
                        placeholder={'그룹명을 입력해주세요'}
                        placeholderTextColor={"rgb(95, 95, 117)"}
                    />

                    <RowCenter>
                        <GroupNameColor style={{backgroundColor:'rgb(226,129,144)'}}/>
                        <GroupNameColor style={{backgroundColor:'rgb(230,145,105)'}}/>
                        <GroupNameColor style={{backgroundColor:'rgb(230,167,79)'}}/>
                        <GroupNameColor style={{backgroundColor:'rgb(160,206,70)'}}/>
                        <GroupNameColor style={{backgroundColor:'rgb(130,219,183)'}}/>
                    </RowCenter>
                </GroupNameView>

                <>
                    <Title>
                        소개
                    </Title>

                    <IntroInput
                        value={intro}
                        onChangeText={setIntro}
                        placeholder={'첫 문장이 가장 먼저 보이게 돼요'}
                        placeholderTextColor={"rgb(95, 95, 117)"}
                    />
                </>
                
                <>
                    <Title>
                        규칙
                    </Title>

                    <AddRullBtn>
                        <AddRullIcon
                            source={require('../../assets/plus_2.png')}
                        />
                        <AddRullText>
                            규칙 추가
                        </AddRullText>

                    </AddRullBtn>
                </>

                <>
                    <Title>
                        연결 기록
                    </Title>
                    
                    <FlatList 
                        data={connectionOptions}
                        keyExtractor={(item) => item.name}
                        renderItem={connectionView}
                        horizontal={true}
                        style={{marginBottom:33}}
                    />
                </>

                <OpenGroupView>
                    <View>
                        <TitleText>
                            오픈 그룹 만들기
                        </TitleText>
                        <Title style={{marginTop: 8, marginBottom: 0}}>
                            모르는 사람들이 그룹을 검색할 수 있어요
                        </Title>
                    </View>
                    <View>
                        <Switch
                            trackColor={{ false: "rgb(55,55,64)", true: CommonSetting.color.lightBtn }}
                            thumbColor={"#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={openSwitch}
                        />
                    </View>
                </OpenGroupView>

                <AdditionalConditions>
                    <RowBetween>
                        <TitleText>
                            진행 조건 추가
                        </TitleText>
                        <TouchableOpacity>
                            <MinusIcon
                                source={require('../../assets/minus.png')}
                            />
                        </TouchableOpacity>
                    </RowBetween>

                    <View style={{marginBottom:23}}>
                        <OpenGroupTitle>
                            인원 제한
                        </OpenGroupTitle>
                        <OptionText>
                            10명
                        </OptionText>
                    </View>

                    <RowView style={{marginBottom:23}}>
                        <View style={{width:'50%'}}>
                            <OpenGroupTitle>
                                진행 기간
                            </OpenGroupTitle>
                            <OptionText>
                                예) 30일
                            </OptionText>
                        </View>
                        <View style={{width:'50%'}}>
                            <OpenGroupTitle>
                                그룹 종료일
                            </OpenGroupTitle>
                            <OptionText>
                                선택하기
                            </OptionText>
                        </View>
                    </RowView>

                    <View>
                        <OpenGroupTitle>
                            진행 강도
                        </OpenGroupTitle>
                        <RowView>
                            {strengthView()}
                        </RowView>
                    </View>


                </AdditionalConditions>

                <BodyConditonView>
                    <BodyCondition>
                        신체 조건 
                    </BodyCondition>

                    <RowCenter>
                        <BodyConditionOption>
                            마름 
                        </BodyConditionOption>
                        <NextIcon
                            source={require('../../assets/next.png')}
                        />
                    </RowCenter>
                </BodyConditonView>

                <BodyConditonView>
                    <BodyCondition>
                        목표
                    </BodyCondition>

                    <RowCenter>
                        <BodyConditionOption>
                            채우기
                        </BodyConditionOption>
                        <NextIcon
                            source={require('../../assets/next.png')}
                        />
                    </RowCenter>
                </BodyConditonView>

                <View style={{height:60}}/>

            </PaddingView>



            <MakingBtnBack>
                <MakingBtn onPress={() => {
                    getData()
                }}>
                    <MakingText>
                        만들기
                    </MakingText>
                </MakingBtn>
            </MakingBtnBack>
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
    margin-bottom: 26px;
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
const Title = styled.Text`
    font-size: 13px;
    color: rgb(218, 218, 228);
    margin-bottom: 18px;
`
const IntroInput = styled.TextInput`
    /* padding: 10px; */
    color: rgb(95, 95, 117);
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 50px;
`
const AddRullBtn = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: ${CommonSetting.btnBorderRadius};
    border-color: ${CommonSetting.color.borderColor};
    border-width: 1px;
    padding-left: 13px;
    padding-right: 13px;
    padding-top: 10px;
    padding-bottom: 10px;
    align-self: flex-start;
    margin-bottom: 45px;
`
const AddRullText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 500;
`
const AddRullIcon = styled.Image`
    width: 15px;
    height: 15px;
    margin-right: 10px;
`
const OptionView = styled.TouchableOpacity`
    padding: 10px;
    border-radius: 20px;
    border-color: ${CommonSetting.color.borderColor};
    border-width: 1px;
    align-self: flex-start;
    flex-direction: row;
    margin-right: 10px;
`
const OptionText = styled.Text`
    color: white;
    font-size: 14px;
    font-weight: 500;
`
const CheckView = styled.View`
    width: 19px;
    margin-left: 10px;
`
const Checked = styled.TouchableOpacity`
    width: 19px;
    height: 19px;
    border-radius: 50px;
    border-width: 1.5px;
    border-color: ${CommonSetting.color.lightBtn};

    background-color: ${CommonSetting.color.lightBtn};
    align-items: center;
    justify-content: center;
    position: absolute;
`
const NoChecked = styled.TouchableOpacity`
    width: 19px;
    height: 19px;
    border-radius: 50px;
    border-width: 1.5px;
    border-color: ${CommonSetting.color.borderColor};

    align-items: center;
    justify-content: center;
    position: absolute;
`
const CheckIcon = styled.Image`
    width: 10px;
    height: 10px;
    position: absolute;
    z-index: 5;
`
const OpenGroupView = styled.View`
    width: 100%;
    border-color: ${CommonSetting.color.borderColor};
    border-bottom-width: 0.5px;
    border-top-width: 0.5px;
    padding-top: 27px;
    padding-bottom: 27px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
const AdditionalConditions = styled.View`
    width: 100%;
    border-color: ${CommonSetting.color.borderColor};
    border-bottom-width: 0.5px;
    padding-top: 27px;
    padding-bottom: 27px;
`
const RowBetween = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`
const MinusIcon = styled.Image`
    width: 18px;
    height: 18px;
`
const OpenGroupTitle = styled.Text`
    font-size: 13px;
    color: rgb(218, 218, 228);
    margin-bottom: 12px;
`
const BodyCondition = styled.Text`
    font-size: 16px;
    color: white;
    font-weight: 500;
`
const BodyConditionOption = styled.Text`
    font-size: 15px;
    color: white;
    font-weight: 500;
`
const BodyConditonView = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 27px;
`
const NextIcon = styled.Image`
    width: 15px;
    height: 15px;
`
const MakingBtnBack = styled.View`
    padding-left: ${CommonSetting.screenPaddingHorizontal};
    padding-right: ${CommonSetting.screenPaddingHorizontal};
    padding-top: 5px;
    padding-bottom: 5px;
`
const MakingBtn = styled.TouchableOpacity`
    width: 100%;
    height: 47px;
    background-color: rgb(48,48,62);
    align-items: center;
    justify-content: center;
    border-radius: ${CommonSetting.btnBorderRadius};
`
const  MakingText = styled.Text`
    font-size: 15px;
    font-weight: 500;
    color: white
`



const styles = StyleSheet.create({
    
})

