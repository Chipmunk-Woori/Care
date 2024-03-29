import React, {useRef, useState, useEffect} from "react";
import {View, Modal, TouchableOpacity, Dimensions, Image, StyleSheet} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import DetailOption from "../../component/DetailOption";
import DetailOptionAnswer from "../../component/DetailOptionAnswer";
import ImagePicker from 'react-native-image-crop-picker';
import FinalBtn from '../../component/FinalBtn';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from '@react-native-picker/picker';
import BasicText from "../../component/BasicText";
import BasicTextBig from "../../component/BasicTextBig";
import OptionModal from "../../component/OptionModal";

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;


interface Props {
    closeOption: () => any;
    modifyBodyData?: (weight: any, muscle: any, fatPercent: any, img: any, memo: any) => any;
    type?: string; //checkRecord: 기록 확인
    recordedDiet?: any;
    moveTo: (screenName: string, value?: any) => any;
    saveMyRecord: (value: any) => any;
}

const ImageUploadDiet = ({closeOption, modifyBodyData, type, recordedDiet, moveTo, saveMyRecord}: Props) => {
    
    const [selYear, setSelYear] = useState('');
    const [selMonth, setSelMonth] = useState('');
    const [selDay, setSelDay] = useState('');

    const [uploadImage, setUploadImge] = useState('');
    const [amPm, setAmPm] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [score, setScore] = useState<any>();
    const [scoreOption, setScoreOption] = useState([1,2,3,4,5]);
    const [category, setCategory] = useState('');
    const [categoryOption, setCategoryOption] = useState([
        '아침', '아점', '점심', '점저', '저녁', '간식', '야식', '후식', '술', '음료', '영양제 / 보충제'
    ])
    const [amount, setAmount] = useState('');
    const [amountOption, setAmountOption] = useState([
        '가볍게', '적당히', '배부르게', '과하게'
    ])

    const [onPicker, setOnPicker] = useState(false);
    const [moreModalState, setMoreModalState] = useState(false); //더보기 모달 모드
    const [modifyState, setModifyState] = useState(false); //기존 기록 수정 모드



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
        await ImagePicker.openPicker({
            multiple: false,
            mediaType: 'photo'
        }).then(image => {
            let temp = image.path;
            setUploadImge(temp);
        })
    }

    const showImage = () => {

        
        if (type === "checkRecord") {

            if (recordedDiet.item.img) {
                return (
                    <UploadImg
                        source={{uri: recordedDiet.item.img}}
                    />
                )
            } else {
                return (
                    <NoUploadImg />
                )
            }
        } else {

            //하나 선택
            if (uploadImage) {
                return (
                    <UploadImg
                        source={{uri: uploadImage}}
                    />
                )
            } 
        }

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

    }

    const save = async () => {

        //기존 recordBody 데이터 받아옴
        const selectedDate = await AsyncStorage.getItem('selectedDate');
        const value = await AsyncStorage.getItem('MyRecord');


        //입력 데이터
        let inputData = {
            "score" : score,
            "category" : category,
            "amount" : amount,
            "time" : (hour !== '') ? `${amPm} ${hour}:${minute}` : '',
            "img" : uploadImage
        }


        //🌞 달력 - '수정' 에서 넘어온 경우. 수정한 정보 보내기.
        // if (modifyBodyData) {
        //     modifyBodyData(score, category, amount, `${amPm} ${hour}:${minute}`, uploadImage)
        // }


        //입력 데이터 추가해서 setItem
        let valueArr :any[] = []; 
        let duplication = false;

        if (value !== null) {
            valueArr = JSON.parse(value);
        } else {
            console.log('MyRecord 비어있음')
        }


        //기존 기록 수정 모드
        if (type && type == 'checkRecord' && recordedDiet && modifyState) {
            if (valueArr.length > 0) {
                valueArr.map( (item:any) => {
                    if (item.date == selectedDate) {
                        item.diet[recordedDiet.index] = inputData;
                    }
                })
            }
        } else { //새로운 기록 추가 모드
            //중복 체크
            if (valueArr.length > 0) {
                valueArr.map( (item :any) => {
                    if (item.date == selectedDate) {
                        
                        duplication = true;
    
                        //수정 전 : 중복 있으면 해당 날짜에 body값 넣기
                        // item["diet"] = inputData;
    
                        //수정 후 : 해당 날짜에 데이터 '교체' -> '추가'
                        let tempValue = item["diet"];
                        tempValue.push(inputData);
    
                        item["diet"] = tempValue;
                        
                    }
                })
            }
    
    
            if (duplication == false) {
    
                //날짜 새로 생성
                let newDate = {
                    "date" : selectedDate,
                    "diet" : [inputData],
                    "body" : {},
                    "exercise" : {},
                    "water" : {}
                }
    
                valueArr.push(newDate);
    
            } 
        }


        let newValueArr = JSON.stringify(valueArr);



        // await AsyncStorage.setItem('MyRecord', newValueArr);
        saveMyRecord(newValueArr)

    }

    const timeView = () => {
        if (hour !== '') {
            return (
                <TouchableOpacity 
                    style={{marginBottom:12}}
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
                    style={{marginBottom:12}}
                    onPress={()=>{setOnPicker(true)}}
                >
                    <OptionText style={{color:CommonSetting.color.borderColor}}>시간 선택</OptionText>
                </TouchableOpacity>
            )
        }
    }


    //초기 날짜 설정(현재 시간)
    const initTime = async () => {

        if (hour == '') {
            let today = new Date();

            //오전오후
            let amPm = '';

            //시
            let hour : number|string = today.getHours();
            if (hour > 12) {
                hour = hour - 12;
                amPm = '오후'
            } else {
                amPm = '오전'
            }
            hour = ('0' + hour).slice(-2);

            //분
            let minute = ('0' + today.getMinutes()).slice(-2);

            setAmPm(amPm);
            setHour(hour);
            setMinute(minute);
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



    const scoreView = () => {
        return (
            scoreOption.map((item:any, index:any) => {
                return (
                    <ScoreOptionView 
                        onPress={()=>{selectScore(item)}}
                        key={index.toString()}
                        style={{backgroundColor : score === item ? CommonSetting.color.borderColor : CommonSetting.color.background_dark}}
                    >
                        <OptionText>
                            {item}
                        </OptionText>
                    </ScoreOptionView> 
                )
            })
        )
    }

    const selectScore = (item: any) => {
        if (score === item) {
            setScore('');
        } else {
            setScore(item)
        }
    }


    const categoryView = () => {
        return (
            categoryOption.map((item: any, index: number) => {
                return (
                    <OptionView 
                        onPress={()=>{selectCategory(item)}}
                        key={index.toString()}
                        style={{backgroundColor : category === item ? CommonSetting.color.borderColor : CommonSetting.color.background_dark}}
                    >
                        <OptionText>
                            {item}
                        </OptionText>
                    </OptionView> 
                )
            })
        )
    }

    const selectCategory = (item: any) => {
        if (category === item) {
            setCategory('');
        } else {
            setCategory(item)
        }
    }


    const amountView = () => {
        return (
            amountOption.map((item:any, index:any) => {
                return (
                    <OptionView 
                        onPress={()=>{selectAmount(item)}}
                        key={index.toString()}
                        style={{backgroundColor : amount === item ? CommonSetting.color.borderColor : CommonSetting.color.background_dark}}
                    >
                        <OptionText>
                            {item}
                        </OptionText>
                    </OptionView> 
                )
            })
        )
    }

    const selectAmount = (item: any) => {
        if (category === item) {
            setAmount('');
        } else {
            setAmount(item)
        }
    }
    

    //데이터 갖고와서 날짜(year, month, day), 
    //신체(weight, muscle, fatPercent, memo, uploadImage) 변수에 넣음
    const getSelectedDate = async () => {
        try {
            const selectedDate = await AsyncStorage.getItem('selectedDate');
            // let myRecord = await AsyncStorage.getItem('MyRecord');
            

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

            // if (myRecord !== null) {
                
            //     let record = JSON.parse(myRecord);
            //     record.map((item :any) => {
            //         if (item.date == selectedDate) {
                        
            //             let diet = item.diet;
            //             console.log(diet.category);

            //         } else {

            //         }
            //     })
            // }
        } catch (e: any) {
            console.log(e)
        }
        
    }


    const moreModalContents = [
        {
            title: '공유',
            func: closeMoreModal
        },
        {
            title: '수정',
            func: modifyView
        },
        {
            title: '날짜 변경',
            func: closeMoreModal
        },
        {
            title: '삭제',
            func: closeMoreModal
        },
        {
            title: '취소',
            func: closeMoreModal
        },
    ]


    //취소
    function closeMoreModal () {
        setMoreModalState(false);
    }

    //수정
    function modifyView () {
        setModifyState(true);
        // console.log(recordedDiet)

        if (recordedDiet) {
            setScore(recordedDiet.item.score);
            setCategory(recordedDiet.item.category);
            setAmount(recordedDiet.item.amount);
            // setTimeout(recordedDiet.time);
            setUploadImge(recordedDiet.item.img);
        }

        setMoreModalState(false);
    }


    //수정, 공유, 날짜변경, 삭제
    const moreModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={moreModalState}
                onRequestClose={() => {
                    setMoreModalState(false)
                }}
            >
                <OptionModal
                    options = {moreModalContents}
                />
            </Modal>
        )
    }



    const contentsView = () => {
        if (type && type == 'checkRecord' && recordedDiet && !modifyState) {
            return (
                <DietTextView>
                    <BasicTextBig>
                        {
                            recordedDiet.item.category && recordedDiet.item.category
                        }
                    </BasicTextBig>

                    <RowView>
                        <DetailOption>
                            {
                                recordedDiet.item.time && recordedDiet.item.time
                            }
                            {'   '}
                            {
                                recordedDiet.item.amount && recordedDiet.item.amount
                            }
                        </DetailOption>
                    
                    </RowView>
                </DietTextView>
            )
        } else {
            return (
                <>
                    <View style={{marginBottom: 10}}>
                        <DetailOption>
                            식단 점수
                        </DetailOption>
                        <RowView>
                            {scoreView()}
                        </RowView>
                    </View>


                    <View style={{marginBottom: 10}}>
                        <DetailOption>
                            분류
                        </DetailOption>
                        <RowView>
                            {categoryView()}
                        </RowView>
                    </View>


                    <View style={{marginBottom: 10}}>
                        <DetailOption>
                            식사량
                        </DetailOption>
                        <RowView>
                            {amountView()}
                        </RowView>
                    </View>

                    <View style={{marginBottom: 10}}>
                        <DetailOption>
                            시간
                        </DetailOption>

                        {timeView()}
                        {pickerView()}
                    </View>
                </>
            )
        }
    }

    useEffect(() => {
        try {
            getSelectedDate();
            // console.log(recordedDiet)
        } catch (e) {
            console.log(e)
        }
    },[])


    useEffect(() => {
        initTime();
    },[hour])



    return(
        <Container>

            <Scroll>

                <TopMark />

                <HeaderView>
                    <HeaderText>
                        {selYear}년 {selMonth}월 {selDay}일 식단
                    </HeaderText>

                    <MoreView
                        onPress={() => {setMoreModalState(true)}}
                    >
                        <MoreImg
                            source={require('../../assets/more_row.png')}
                        />
                    </MoreView>
                </HeaderView>


                <TouchableOpacity
                    onPress={() => {closeOption()}}
                >
                    <Image
                        source={require('../../assets/back.png')}
                        style={{width: 18, height: 18, marginBottom :20}}
                    />
                </TouchableOpacity>


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

                {contentsView()}

                <View style={{height:100}} />

            </Scroll>


            
            <PaddingView>
                <FinalBtn 
                    func={()=>{
                        save();
                        closeOption();
                    }}
                    text={'저장하기'}
                    backgroundColor={'rgb(43,45,75)'}
                />
            </PaddingView>

            {moreModal()}


            
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
    padding-right: ${CommonSetting.screenPaddingHorizontal};

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
    width: ${CommonSetting.recordImgWidth}px;
    height: ${CommonSetting.recordImgHeight}px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    border-color: ${CommonSetting.color.borderColor};
    border-width: 1px;
    border-style: dashed;
    margin-top: 12px;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
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
    width: ${CommonSetting.recordImgWidth}px;
    height: ${CommonSetting.recordImgHeight}px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    margin-top: 12px;
    align-items: center;
    justify-content: center;
    position: absolute;
`
const NoUploadImg = styled.View`
    width: ${CommonSetting.recordImgWidth}px;
    height: ${CommonSetting.recordImgHeight}px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    margin-top: 12px;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: ${CommonSetting.color.temp300};
`
const Line = styled.View`
    width: 100%;
    height: 0.5px;
    background-color: ${CommonSetting.color.borderColor};
    margin-top: 15px;
    margin-bottom: 18px;
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
const ScoreOptionView = styled.Pressable`
    width: 32px;
    height: 32px;
    border-radius: 20px;
    border-color: ${CommonSetting.color.borderColor};
    border-width: 1px;
    margin-right: 10px;
    padding: 5px;
    align-items: center;
    justify-content: center;
`
const OptionText = styled.Text`
    color: white;
    font-size: 13px;
    font-weight: 500;
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
const DietTextView = styled.View`
    // margin-left: 20px;
    margin-top: 10px;
`
const MoreView = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
`
const MoreImg = styled.Image`
    width: 17px;
    height: 17px;
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
export default ImageUploadDiet;