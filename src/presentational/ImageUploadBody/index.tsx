import React, {useRef, useState, useEffect} from "react";
import {View, Text, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Dimensions, Image, FlatList, StyleSheet} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";
import DetailOption from "../../component/DetailOption";
import DetailOptionAnswer from "../../component/DetailOptionAnswer";
import ImagePicker from 'react-native-image-crop-picker';
import FinalBtn from '../../component/FinalBtn';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;


interface Props {
    closeOption?: () => any;
    navigation?: any;
}

const ImageUploadBody = ({closeOption, navigation}: Props) => {
    
    const [weight, setWeight] = useState('');
    const [muscle, setMuscle] = useState('');
    const [fatPercent, setFatPercent] = useState('');
    const [memo, setMemo] = useState('');
    const [uploadImage, setUploadImage] = useState<any>();

    const [selYear, setSelYear] = useState('');
    const [selMonth, setSelMonth] = useState('');
    const [selDay, setSelDay] = useState('');


    // 여기 할 차례
    const goBack = () => {
        navigation.goBack();
    }

    const imageSelector = async () => {

        //여러 개 선택
        // let tempList :Array<any> = [];
        // const result :any = [];

        // await ImagePicker.openPicker({
        //     multiple: true,
        //     mediaType: 'photo'
        // }).then(images => {
        //     images.map((item :any)=>{
        //         tempList.push(item.path);
        //     })

        //     setUploadImges(tempList)
        // })


        //하나 선택
        let tempList :any = null;

        await ImagePicker.openPicker({
            multiple: false,
            mediaType: 'photo'
        }).then(image => {
            let temp = image.path;
            setUploadImage(temp);
        })
    }

    const  showImage = () => {
        //여러 개 선택
        // if (uploadImages.length > 0) {
        //     let result = uploadImages.map((item :any, index :number) => {
        //         return (
        //             <UploadImg
        //                 source={{uri: item}}
        //                 key={index.toString()}
        //             />
        //         )
        //     })

        //     return result
        // }


        //하나 선택
        if (typeof uploadImage !== 'undefined') {
            return (
                <UploadImg
                    source={{uri: uploadImage}}
                />
            )
        }
    }

    const save = async () => {
       
        //기존 recordBody 데이터 받아옴
        const value = await AsyncStorage.getItem('MyRecord');
        const selectedDate = await AsyncStorage.getItem('selectedDate');

        //입력 데이터
        let input = {
            "date" : selectedDate,
            "weight" : weight,
            "muscle" : muscle,
            "fatPercent" : fatPercent,
            "img" : uploadImage,
            "memo" : memo
        }

        //입력 데이터 추가해서 setItem
        let valueArr :any[] = []; 
        let duplication = false;

        if (value !== null) {
            valueArr = JSON.parse(value);
        } else {
            console.log('MyRecord 비어있음')
        }

        //중복 체크
        if(valueArr.length > 0) {
            valueArr.map( async (item :any) => {
                if (item.date == selectedDate) {
                    duplication = true;

                    //중복 있으면 해당 날짜에 body값 넣기
                    item["body"] = input;
                    let newValueArr = JSON.stringify(valueArr);
                    await AsyncStorage.setItem('MyRecord', newValueArr);
                }
            })
        }


        if (duplication == false) {
            //날짜 새로 생성
            let newRecord = {
                "date" : selectedDate,
                "diet" : {},
                "body" : input,
                "exercise" : {},
                "water" : {}
            } 

            valueArr.push(newRecord);

            let newValueArr = JSON.stringify(valueArr);
            await AsyncStorage.setItem('MyRecord', newValueArr);
        }


    }


    const getSelectedDate = async () => {
        const selectedDate = await AsyncStorage.getItem('selectedDate');
        let myRecord = await AsyncStorage.getItem('MyRecord');

        if (selectedDate !== null) {           
            let year = selectedDate.substring(0,4);
            let month = selectedDate.substring(5,7);
            let day = selectedDate.substring(8,10);

            setSelYear(year);
            setSelMonth(month);
            setSelDay(day);
        } else {
            console.log('selectedDate == null')
        }

        if (myRecord !== null) {
            let record = JSON.parse(myRecord);
            record.map((item :any) => {
                if (item.date == selectedDate) {
                    let body = item.body;
                    setWeight(body.weight);
                    setMuscle(body.muscle);
                    setFatPercent(body.fatPercent);
                    setMemo(body.memo);
                    setUploadImage(body.img);
                }
            })
        }
    }

    useEffect(() => {
        try {
            getSelectedDate();
        } catch (e) {
            console.log(e)
        }
    },[])



    return(
        <Container>

            <Scroll>

                <TopMark />

                <HeaderView>

                    
                    <HeaderText>
                        {selYear}년 {selMonth}월 {selDay}일 신체
                    </HeaderText>

                    
                </HeaderView>

                <TouchableOpacity
                    onPress={() => {goBack()}}
                >
                    <Image
                        source={require('../../assets/back.png')}
                        style={{width: 18, height: 18, marginBottom :20}}
                    />
                </TouchableOpacity>

                <TitleText marginBottom={15}>
                    신체 기록
                </TitleText>

                <View style={{marginBottom: 10}}>
                    <DetailOption>
                        체중
                    </DetailOption>

                    <RowView>
                        <AddedCondition
                            value={weight}
                            onChangeText={setWeight}
                            placeholder={'입력하기'}
                            placeholderTextColor={CommonSetting.color.borderColor}
                            style={{color:'white'}}
                        />
                        <AddedConditionText>
                            {`   `}kg
                        </AddedConditionText>
                    </RowView>
                </View>

                <View style={{marginBottom: 10}}>
                    <DetailOption>
                        골격근량
                    </DetailOption>

                    <RowView>
                        <AddedCondition
                            value={muscle}
                            onChangeText={setMuscle}
                            placeholder={'입력하기'}
                            placeholderTextColor={CommonSetting.color.borderColor}
                            style={{color:'white'}}
                        />
                        <AddedConditionText>
                            {`   `}kg
                        </AddedConditionText>
                    </RowView>
                </View>

                <View style={{marginBottom: 10}}>
                    <DetailOption>
                        체지방률
                    </DetailOption>

                    <RowView>
                        <AddedCondition
                            value={fatPercent}
                            onChangeText={setFatPercent}
                            placeholder={'입력하기'}
                            placeholderTextColor={CommonSetting.color.borderColor}
                            style={{color:'white'}}
                        />
                        <AddedConditionText>
                            {`   `}%
                        </AddedConditionText>
                    </RowView>
                </View>

                <View style={{marginBottom: 10}}>
                    <DetailOption>
                        눈바디
                    </DetailOption>


                    <RowView>
                        <AddPicture
                            onPress={() => {imageSelector()}}
                        >
                            <AddPictureIcon
                                source={require('../../assets/plus.png')}
                            />
                            <AddPictureText>
                                사진 추가
                            </AddPictureText>
                        </AddPicture>

                        {showImage()}
                    </RowView>
                </View>

                <Line />

                <TitleText marginBottom={15}>
                    메모
                </TitleText>

                <AddedCondition
                    value={memo}
                    onChangeText={setMemo}
                    placeholder={'기분, 컨디션, 몸 상태 등을 자유롭게 입력해 주세요'}
                    placeholderTextColor={CommonSetting.color.borderColor}
                    style={{color:'white'}}
                />


            </Scroll>


           
            <PaddingView>
                <FinalBtn 
                    func={()=>{
                        save();
                        goBack();
                    }}
                    text={'저장하기'}
                    backgroundColor={'rgb(43,45,75)'}
                />
            </PaddingView>

            
        </Container>
    )
}

const Container = styled.SafeAreaView`
    width: ${ScreenWidth}px;
    height: ${ScreenHeight*0.9}px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    background-color: ${CommonSetting.color.background_dark};
    position: absolute;
    bottom: 0;
`
const Scroll = styled.ScrollView`
    padding-top: 25px;
    padding-left: ${CommonSetting.screenPaddingHorizontal};
    padding-right: 10px;
`
const PaddingView = styled.View`
    padding-left: ${CommonSetting.screenPaddingHorizontal};
    padding-right: ${CommonSetting.screenPaddingHorizontal};
`
const RowView = styled.View`
    flex-direction: row;
`
const HeaderView = styled.View`
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 20px;
`
const HeaderText = styled.Text`
    font-weight: bold;
    color: white;
    font-size: 18px;
`
const AddedCondition = styled.TextInput`
    /* padding: 10px; */
    color: white;
    font-size: 14px;
    font-weight: 500;
`
const TopMark = styled.View`
    align-self: center;
    margin-bottom: 20px;
    height: 2px;
    width: 45px;
    background-color: ${CommonSetting.color.borderColor};
`
const AddedConditionText = styled.Text`
    color: white;
    font-size: 14px;
    font-weight: 500;
`
const AddPicture = styled.TouchableOpacity`
    width: 170px;
    height: 170px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    border-color: ${CommonSetting.color.borderColor};
    border-width: 1px;
    border-style: dashed;
    margin-top: 12px;
    align-items: center;
    justify-content: center;
`
const AddPictureIcon = styled.Image`
    width: 16px;
    height: 16px;
    margin-bottom: 7px;
`
const AddPictureText = styled.Text`
    color: white;
    font-size: 15px;
`
const UploadImg = styled.Image`
    width: 170px;
    height: 170px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    margin-top: 12px;
    align-items: center;
    justify-content: center;
    position: absolute;
`
const Line = styled.View`
    width: 100%;
    height: 0.5px;
    background-color: ${CommonSetting.color.borderColor};
    margin-top: 15px;
    margin-bottom: 18px;
`
export default ImageUploadBody;