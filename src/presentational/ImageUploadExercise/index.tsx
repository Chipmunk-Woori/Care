import React, {useRef, useState, useEffect} from "react";
import {View, ImageBackground, TouchableOpacity, ScrollView, Dimensions, Image, StyleSheet} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";
import DetailOption from "../../component/DetailOption";
import DetailOptionAnswer from "../../component/DetailOptionAnswer";
import ImagePicker from 'react-native-image-crop-picker';
import FinalBtn from '../../component/FinalBtn';
import {Picker} from '@react-native-picker/picker';
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
    const [day, setDay] = useState<string|number>(0);

    const [amPm, setAmPm] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [onPicker, setOnPicker] = useState(false);

    const [typeOfExerciseGroup, setTypeOfExerciseGroup] = useState([
        '유산소', '무산소', '스트레칭'
    ])
    const [partOfBodyGroup, setPartOfBodyGroup] = useState([
        '전신', '팔', '복근', '하체', '등', '어깨', '가슴', '허리', '엉덩이', '코어'
    ])
    const [intensityOfExerciseGroup, setIntensityOfExerciseGroup] = useState([
        '매우 힘듦', '힘듦', '적당함', '쉬움'
    ])

    const [typeOfExercise, setTypeOfExercise] = useState("");
    const [partOfBody, setPartOfBody] = useState("");
    const [intensityOfExercise, setIntensityOfExercise] = useState("");

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


    const pickerView = () => {

        if (onPicker == true) {
            return (
                <>
                    <PickerBtn>
                        <ClosePicker onPress={() => {
                            setOnPicker(false)
                            setAmPm('')
                            setHour('')
                            setMinute('')
                        }}>
                            <ClosePickerText>
                                삭제
                            </ClosePickerText>
                        </ClosePicker>

                        <ClosePicker onPress={() => {
                            setOnPicker(false);
                        }}>
                            <ClosePickerText>
                                확인
                            </ClosePickerText>
                        </ClosePicker>
                    </PickerBtn>

                    <PickerBack>
                        <Picker
                            selectedValue={amPm}
                            itemStyle={styles.pickerItem}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                setAmPm(itemValue)
                            }>
                                <Picker.Item label = '오전' value = '오전'/>
                                <Picker.Item label = '오후' value = '오후'/>
                        </Picker>

                        <Picker
                            selectedValue={hour}
                            itemStyle={styles.pickerItem}
                            style={styles.picker}
                            mode='dialog'
                            onValueChange={(itemValue, itemIndex) =>
                                setHour(itemValue)
                            }>
                                {hourOption()}
                        </Picker>

                        <Picker
                            selectedValue={minute}
                            itemStyle={styles.pickerItem}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                setMinute(itemValue)
                            }>
                                {minuteOption()}
                        </Picker>
                    </PickerBack>
                </>
            )
        } 

    }


    const timeView = () => {
        if (hour !== '') {
            return (
                <TouchableOpacity 
                    onPress={()=>{setOnPicker(true)}}
                >
                    <OptionText>
                        {amPm} {hour} : {minute}
                    </OptionText>
                </TouchableOpacity>
            )
        } else if (hour == '' && minute == '') {
            return(
                <TouchableOpacity 
                    onPress={()=>{setOnPicker(true)}}
                >
                    <OptionText style={{color:CommonSetting.color.borderColor}}>시간 선택</OptionText>
                </TouchableOpacity>
            )
        }
    }


    const hourOption = () => {
        
        let hourArr = [];

        for (let i = 1; i < 13; i++) {
            hourArr.push(i);
        }   

        let hourPicker = hourArr.map((item: any) => {
            let tempHour = `0${item}`;
            tempHour = tempHour.slice(-2)

            return (
                <Picker.Item 
                    label = {tempHour}
                    value = {tempHour} 
                    key={tempHour}
                />
            )
        })

        return hourPicker;
        
    }

    const minuteOption = () => {
        
        let minuteArr = [];

        for (let i = 0; i < 60; i++) {
            minuteArr.push(i);
        }   

        let minutePicker = minuteArr.map((item: any) => {
            let tempMinute = `0${item}`;
            tempMinute = tempMinute.slice(-2);
            
            return (
                <Picker.Item 
                    label = {tempMinute} 
                    value = {tempMinute}
                    key = {tempMinute}
                />
            )
        })

        return minutePicker;
        
    }


    const categoryView = (categoryOptions: string[], category: string, setCategory: any) => {
        return (
            categoryOptions.map((item: any, index: number) => {
                return (
                    <OptionView
                        onPress={() => {selectOption(item, category, setCategory)}}
                        key={index.toString()}
                        style={{backgroundColor: category === item ? CommonSetting.color.borderColor : CommonSetting.color.background_dark}}
                    >
                        <OptionText>
                            {item}
                        </OptionText>
                    </OptionView>

                )
            })
        )
    }


    const selectOption = (item: string, category: string, setCategory: any) => {
        if (category === item) {
            setCategory("")
        } else {
            setCategory(item)
        }
    }
    

    

    useEffect(() => {
        let today = new Date();
        let todayYear = today.getFullYear();
        let todayMonth : string|number = today.getMonth()+1;
        let todayDay : string|number = today.getDate();

        if (todayMonth < 10) {
            todayMonth = `0${todayMonth}`
        }

        if (todayDay < 10) {
            todayDay = `0${todayDay}`
        }

        setYear(todayYear);
        setMonth(todayMonth);
        setDay(todayDay);
    },[])

    return(
        <Container>

            <Scroll>

                <TopMark />

                <HeaderView>
                    <HeaderText>
                        {year}년 {month}월 {day}일 운동
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

                <View style={{marginBottom: 10}}>
                    <DetailOption>
                        운동 제목
                    </DetailOption>

                    <RowView>
                        <AddedCondition
                            value={title}
                            onChangeText={setTitle}
                            placeholder={`${month}월 ${day}일 운동`}
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

                    {timeView()}
                    {pickerView()}

                    
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

                <>
                    <View style={{marginBottom: 10}}>
                        <DetailOption>
                            운동 종류
                        </DetailOption>
                        <RowView>
                            {categoryView(typeOfExerciseGroup, typeOfExercise, setTypeOfExercise)}
                        </RowView>
                    </View>
                </>

                <>
                    <View style={{marginBottom: 10}}>
                        <DetailOption>
                            운동 부위
                        </DetailOption>
                        <RowView>
                            {categoryView(partOfBodyGroup, partOfBody, setPartOfBody)}
                        </RowView>
                    </View>
                </>

                <>
                    <View style={{marginBottom: 10}}>
                        <DetailOption>
                            운동 강도
                        </DetailOption>
                        <RowView>
                            {categoryView(intensityOfExerciseGroup, intensityOfExercise, setIntensityOfExercise)}
                        </RowView>
                    </View>
                </>

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
const PickerBack = styled.View`
    width: 100%;
    height: 200px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`
const PickerBtn = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
`
const ClosePicker = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: ${CommonSetting.color.borderColor};
    border-radius: ${CommonSetting.btnBorderRadius}px;
`
const ClosePickerText = styled.Text`
    font-size: 13px;
    font-weight: 500;
    color: white;
    margin-top: 5px;
    margin-bottom: 5px;
`
const OptionText = styled.Text`
    color: white;
    font-size: 13px;
    font-weight: 500;
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


const styles = StyleSheet.create({
    pickerItem: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500'
    },
    picker: {
        width: 100,
        height: 200,
    }
})
export default ImageUploadExercise;