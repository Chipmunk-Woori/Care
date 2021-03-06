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
    const [icon, setIcon] = useState('');
    const [iconBackgroundColor, setIconBackgroundColor] = useState('rgb(47, 49, 62)');
    const [groupName, setGroupName] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [record, setRecord] = useState<any[]>([]);
    const [openSwitch, setOpenSwitch] = useState(false);
    const [numberOfLimit, setNumberOfLimit] = useState('');
    const [period, setPeriod] = useState('');
    const [endDate, setEndDate] = useState('2022λ 07μ 06μΌ');
    const [strength, setStrength] = useState('');
    const [physicalCondition, setPhysicalCondition] = useState('');
    const [goals, setGoals] = useState('');
    const [connectionOptions, setConnectionOptions] = useState([
        {
            id : 1,
            name : 'π½ μλ¨',
            selected : false
        },
        {
            id : 2,
            name : 'π₯ μ΄λ',
            selected : false
        },
        {
            id : 3,
            name : 'π§ λ¬Ό',
            selected : false
        },
        {
            id : 4,
            name : 'π κ±Έμ',
            selected : false
        },
    ]);
    const [strengthOptions, setStrengthOptions] = useState([
        'κ°λ³κ²', 'μ λΉν', 'μ½κ° μΈκ²', 'μ² μ νκ²'
    ])


    const toggleSwitch = () => setOpenSwitch(previousState => !previousState);


    const onPressCheck = (item :any) => {
        
        //recordμ μ νλ μ΅μ λ£κΈ°
        let tempArr : any[] = record;
        let result = false;

        if (record.length > 0) {
            record.map((recordItem: any) => {
                if (recordItem === item) {
                    tempArr = tempArr.filter((i) => {
                        return i !== item
                    })

                    result = true;
                }
            })
        }

        if (result == false) {
            tempArr.push(item);
        }

        setRecord(tempArr);

        setReload(!reload);

    }


    const confirmCheck = (item: any) => {

        let result = false;

        record.map((recordItem: any) => {
            if (recordItem === item) {
                result = true
            } 
        })

        if (result == false) {
            return (
                <NoChecked onPress={()=>{onPressCheck(item)}} /> 
            )
        } else {
            return (
                <Checked 
                    onPress={()=>{onPressCheck(item)}}> 
                    <CheckIcon
                        source={require('../../assets/check_white.png')}
                    />
                </Checked>
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
                    <OptionView 
                        onPress={()=>{selectStrength(item)}}
                        key={index.toString()}
                        style={{backgroundColor : strength === item ? CommonSetting.color.borderColor : CommonSetting.color.background_dark}}
                    >
                        <OptionText>
                            {item}
                        </OptionText>
                   </OptionView> 
                )
            })
        )
    }

    const selectStrength = (item: any) => {
        if (strength === item) {
            setStrength('');
        } else {
            setStrength(item)
        }
    }

    const showBlock = () => {
        if ( icon == '' || iconBackgroundColor == '' || groupName == ''
            || introduction == '' || record.length > 0 ) {
            return <BlockView />
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
                    title={'κ·Έλ£Ή λ§λ€κΈ°'}
                    iconFunc={()=>{goBack()}}
                />

            <PaddingView>

                <GroupNameView style={{backgroundColor: iconBackgroundColor}}>
                   
                    <GroupNameIcon
                        value={icon}
                        onChangeText={setIcon}
                        maxLength={2}
                        style={{fontSize:60}}
                        textAlign={'center'}
                    />


                    <GroupNameInput
                        value={groupName}
                        onChangeText={setGroupName}
                        placeholder={'κ·Έλ£Ήλͺμ μλ ₯ν΄μ£ΌμΈμ'}
                        placeholderTextColor={"rgb(95, 95, 117)"}
                    />

                    <RowCenter>
                        <GroupNameColor 
                            onPress={()=>{setIconBackgroundColor('#dfb1b8')}}
                            style={{backgroundColor:'rgb(226,129,144)'}}/>
                        <GroupNameColor 
                            onPress={()=>{setIconBackgroundColor('#e4bba9')}}
                            style={{backgroundColor:'rgb(230,145,105)'}}/>
                        <GroupNameColor 
                            onPress={()=>{setIconBackgroundColor('#e2ceb2')}}
                            style={{backgroundColor:'rgb(230,167,79)'}}/>
                        <GroupNameColor 
                            onPress={()=>{setIconBackgroundColor('#bdce9c')}}
                            style={{backgroundColor:'rgb(160,206,70)'}}/>
                        <GroupNameColor 
                            onPress={()=>{setIconBackgroundColor('#b2ddcc')}}
                            style={{backgroundColor:'rgb(130,219,183)'}}/>
                    </RowCenter>
                </GroupNameView>

                <>
                    <Title>
                        μκ°
                    </Title>

                    <IntroInput
                        value={introduction}
                        onChangeText={setIntroduction}
                        placeholder={'μ²« λ¬Έμ₯μ΄ κ°μ₯ λ¨Όμ  λ³΄μ΄κ² λΌμ'}
                        placeholderTextColor={"rgb(143, 143, 167)"}
                        style={{color:'rgb(143, 143, 167)'}}
                    />
                </>
                
                <>
                    <Title>
                        κ·μΉ
                    </Title>

                    <AddRullBtn>
                        <AddRullIcon
                            source={require('../../assets/plus_2.png')}
                        />
                        <AddRullText>
                            κ·μΉ μΆκ°
                        </AddRullText>

                    </AddRullBtn>
                </>

                <>
                    <Title>
                        μ°κ²° κΈ°λ‘
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
                            μ€ν κ·Έλ£Ή λ§λ€κΈ°
                        </TitleText>
                        <Title style={{marginTop: 8, marginBottom: 0}}>
                            λͺ¨λ₯΄λ μ¬λλ€μ΄ κ·Έλ£Ήμ κ²μν  μ μμ΄μ
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
                            μ§ν μ‘°κ±΄ μΆκ°
                        </TitleText>
                        <TouchableOpacity>
                            <MinusIcon
                                source={require('../../assets/minus.png')}
                            />
                        </TouchableOpacity>
                    </RowBetween>

                    <View style={{marginBottom:23}}>
                        <OpenGroupTitle>
                            μΈμ μ ν
                        </OpenGroupTitle>
                        <RowView>
                            <AddedCondition
                                value={numberOfLimit}
                                onChangeText={setNumberOfLimit}
                                placeholder={'10'}
                                placeholderTextColor={"white"}
                                style={{color:'white'}}
                            />
                            <AddedConditionText>
                                λͺ
                            </AddedConditionText>
                        </RowView>
                    </View>

                    <RowView style={{marginBottom:23}}>
                        <View style={{width:'50%'}}>
                            <OpenGroupTitle>
                                μ§ν κΈ°κ°
                            </OpenGroupTitle>
                            <RowView>
                                <AddedCondition
                                    value={period}
                                    onChangeText={setPeriod}
                                    placeholder={'μ) 30'}
                                    placeholderTextColor={"white"}
                                    style={{color:'white'}}
                                />
                                <AddedConditionText>
                                    μΌ
                                </AddedConditionText>
                            </RowView>
                        </View>
                        <View style={{width:'50%'}}>
                            <OpenGroupTitle>
                                κ·Έλ£Ή μ’λ£μΌ
                            </OpenGroupTitle>
                            <RowView>
                                <AddedCondition
                                    value={endDate}
                                    onChangeText={setEndDate}
                                    placeholder={'μ ννκΈ°'}
                                    placeholderTextColor={"white"}
                                    style={{color:'white'}}
                                />
                                <AddedConditionText>
                                    
                                </AddedConditionText>
                            </RowView>
                        </View>
                    </RowView>

                    <View>
                        <OpenGroupTitle>
                            μ§ν κ°λ
                        </OpenGroupTitle>
                        <RowView>
                            {strengthView()}
                        </RowView>
                    </View>


                </AdditionalConditions>

                <BodyConditonView>
                    <BodyCondition>
                        μ μ²΄ μ‘°κ±΄ 
                    </BodyCondition>

                    <RowCenter>
                        <BodyConditionOption>
                            λ§λ¦ 
                        </BodyConditionOption>
                        <NextIcon
                            source={require('../../assets/next.png')}
                        />
                    </RowCenter>
                </BodyConditonView>

                <BodyConditonView>
                    <BodyCondition>
                        λͺ©ν
                    </BodyCondition>

                    <RowCenter>
                        <BodyConditionOption>
                            μΈμ°κΈ°
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
                        λ§λ€κΈ°
                    </MakingText>
                </MakingBtn>

                {showBlock()}
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
    border-radius: ${CommonSetting.btnBorderRadius}px;
    align-items: center;
    margin-bottom: 26px;
`
const GroupNameIcon = styled.TextInput`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border-color: ${CommonSetting.color.borderColor};
    border-width: 1.5px;
    border-style: dashed;
    align-items: center;
    justify-content: center;
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
const AddedCondition = styled.TextInput`
    /* padding: 10px; */
    color: white;
    font-size: 14px;
    font-weight: 500;
`
const AddedConditionText = styled.Text`
    color: white;
    font-size: 14px;
    font-weight: 500;
`
const AddRullBtn = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: ${CommonSetting.btnBorderRadius}px;
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
const OptionView = styled.Pressable`
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
    align-items: center;
    justify-content: center;
`
const MakingBtn = styled.TouchableOpacity`
    width: 100%;
    height: 47px;
    background-color: rgb(48,48,62);
    align-items: center;
    justify-content: center;
    border-radius: ${CommonSetting.btnBorderRadius}px;
`
const  MakingText = styled.Text`
    font-size: 15px;
    font-weight: 500;
    color: white
`
const BlockView = styled.View`
    width: 100%;
    height: 48px;
    background-color: rgba(0,0,0,0);
    align-items: center;
    justify-content: center;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    position: absolute;
`



const styles = StyleSheet.create({
    
})

