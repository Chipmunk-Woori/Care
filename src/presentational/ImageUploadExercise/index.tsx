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
    closeOption: () => any;
    goBack: () => any;
}

const ImageUploadExercise = ({closeOption, goBack}: Props) => {
    
    const [uploadImage, setUploadImge] = useState<any>();
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState("");
    const [time, setTime] = useState("");
    const [memo, setMemo] = useState("");

    const [year, setYear] = useState(0);
    const [month, setMonth] = useState<string|number>(0);
    const [date, setDate] = useState<string|number>(0);


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
            setUploadImge(temp);
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

    

    useEffect(() => {
        let today = new Date();
        let todayYear = today.getFullYear();
        let todayMonth : string|number = today.getMonth()+1;
        let todayDate : string|number = today.getDate();

        if (todayMonth < 10) {
            todayMonth = `0${todayMonth}`
        }

        if (todayDate < 10) {
            todayDate = `0${todayDate}`
        }

        setYear(todayYear);
        setMonth(todayMonth);
        setDate(todayDate);
    },[])

    return(
        <Container>

            <Scroll>

                <TopMark />

                <HeaderView>
                    <HeaderText>
                        {year}년 {month}월 {date}일 운동
                    </HeaderText>

                    <TouchableOpacity
                        onPress={() => {closeOption()}}
                    >
                        <Image
                            source={require('../../assets/TabThird_sel.png')}
                            style={{width: 18, height: 18, marginLeft:20}}
                        />
                    </TouchableOpacity>
                </HeaderView>

                <TitleText marginBottom={15}>
                    오늘의 사진으로 추가
                </TitleText>

                <View style={{marginBottom: 10}}>
                    <DetailOption>
                        운동 제목
                    </DetailOption>

                    <RowView>
                        <AddedCondition
                            value={title}
                            onChangeText={setTitle}
                            placeholder={`${month}월 ${date}일 운동`}
                            placeholderTextColor={CommonSetting.color.borderColor}
                            style={{color:'white',fontSize:20}}
                        />
                        <AddedConditionText>
                            
                        </AddedConditionText>
                    </RowView>
                </View>


                <View style={{marginBottom: 10}}>
                    <DetailOption>
                        운동 시작 시간
                    </DetailOption>

                    <RowView>
                        <AddedCondition
                            value={startTime}
                            onChangeText={setStartTime}
                            placeholder={'0'}
                            placeholderTextColor={CommonSetting.color.borderColor}
                            style={{color:'white'}}
                        />
                        <AddedConditionText>
                            
                        </AddedConditionText>
                    </RowView>
                </View>


                <View style={{marginBottom: 10}}>
                    <DetailOption>
                        운동 시간
                    </DetailOption>

                    <RowView>
                        <AddedCondition
                            value={time}
                            onChangeText={setTime}
                            placeholder={'0'}
                            placeholderTextColor={CommonSetting.color.borderColor}
                            style={{color:'white'}}
                        />
                        <AddedConditionText>
                            
                        </AddedConditionText>
                    </RowView>
                </View>


                <View style={{marginBottom: 10}}>
                    <DetailOption>
                        내용
                    </DetailOption>

                    <RowView>
                        <AddedCondition
                            value={memo}
                            onChangeText={setMemo}
                            placeholder={'운동 내용을 입력해주세요'}
                            placeholderTextColor={CommonSetting.color.borderColor}
                            style={{color:'white'}}
                        />
                        <AddedConditionText>
                            
                        </AddedConditionText>
                    </RowView>
                </View>


                <Line />

                <View style={{marginBottom: 10}}>
                    <DetailOption>
                        사진
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

            </Scroll>


            
            <PaddingView>
                <FinalBtn 
                    func={()=>{
                        // save();
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
    margin-bottom: 30px;
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
export default ImageUploadExercise;