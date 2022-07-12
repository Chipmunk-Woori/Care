import React, {useEffect, useRef, useState} from "react";
import {View, Text, Dimensions, Image, StyleSheet, Pressable, Modal, Alert, TouchableOpacity, FlatList} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import TopTitle from '../../component/TopTitle';
import {Calendar, LocaleConfig, CalendarList, Agenda} from 'react-native-calendars';
import BasicText from "../../component/BasicText";
import BasicTextBig from "../../component/BasicTextBig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageUploadBody from "../ImageUploadBody";
// import ImagePicker from 'react-native-image-crop-picker';




interface Props {
    moveTo: (screen :any) => any;
    goBack: () => any;
}

const screenHeight: number = Dimensions.get('window').height;
const screenWidth: number = Dimensions.get('window').width;

const TabFirst = ({moveTo, goBack} :Props) => {
    
    const [pressedDate, setPressedDate] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(1); //1:식단, 2:신체&운동
    const [selectedYear, setSelectedYear] = useState<number|string>();
    const [selectedMonth, setSelectedMonth] = useState<number|string>();
    const [selectedDate, setSelectedDate] = useState('');

    const [weight, setWeight] = useState('');
    const [muscle, setMuscle] = useState('');
    const [fatPercent, setFatPercent] = useState('');
    const [memo, setMemo] = useState('');
    const [uploadImage, setUploadImage] = useState<any>();

    const [record, setRecord] = useState<any[]>([]);
    const [bodyRecord, setBodyRecord] = useState(false);
    const [moreState, setMoreState] = useState(false);

    const [optionState, setOptionState] = useState(false);

    const [reload, setReload] = useState(false);
    
    //상단 아이콘
    const topTitleIcon = [
        {
            img: require('../../assets/upload.png'),
            func: () => {}
        },
        {
            img: require('../../assets/files.png'),
            func: () => {}
        },
        {
            img: require('../../assets/palette.png'),
            func: () => {}
        }
    ]

    //'식단' 내용
    const firstCategoryContents = [
        {
            title : '주간 리포트',
            icon : require('../../assets/report.png'),
            iconBackColor : 'rgba(152,153,169,1)',
            detail : '6월 1주차' 
        },
        {
            title : '오늘의 운동',
            icon : require('../../assets/check.png'),
            iconBackColor : 'rgba(90,103,245,1)',
            detail : '8시간 남음' 
        },
        {
            title : '오픈 그룹',
            icon : require('../../assets/group.png'),
            iconBackColor : 'rgba(251,251,255,1)',
            detail : '찾기' 
        },
    ]

    //달력
    LocaleConfig.locales['kr'] = {
        monthNames: [
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월'
        ],
        monthNamesShort: [
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월'
        ],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
    };
    LocaleConfig.defaultLocale = 'kr';



   //내 데이터 가져오기
   const getMyRecord = async () => {
        let myRecord = await AsyncStorage.getItem('MyRecord');

        if (myRecord !== null) {
            let myRecordArr = JSON.parse(myRecord);
            setRecord(myRecordArr);
        }

    }
    


    const closeOption = () => {
        setOptionState(false);
    }



    const ModifyScreen = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={optionState}
                onRequestClose={() => {
                    setOptionState(false)
                }}
            >
                <ImageUploadBody closeOption={closeOption} modifyBodyData={modifyBodyData}/>
            </Modal>
        )
    }



    //카테고리 내용 보여줌
    const categoryContents = () => {
        if (selectedCategory === 1) {
            return(
                <View>
                    <FlatList
                        data={firstCategoryContents}
                        renderItem={dietBtn}
                        keyExtractor={ (item, index) => index.toString()}
                        horizontal={true}
                    />
                </View>
            )
        } else if (selectedCategory === 2) {

            if (bodyRecord == true) {

                console.log('---bodyRecord == true---')
                return (
                    <>
                    
                        <BodyView>
                            <RowView>
                                <Icon>
                                    🧍🏼‍♀️
                                </Icon>
                                <View>
                                    <BasicTextBig marginBottom={10}>
                                        신체 
                                    </BasicTextBig>
            
                                    {
                                        weight !== '' &&
                                            (<BasicText marginBottom={5}>
                                                체중 {weight} kg
                                            </BasicText>)
                                    }
                                    {
                                        muscle !== '' &&
                                            (<BasicText marginBottom={5}>
                                                골격근량 {muscle} kg
                                            </BasicText>)
                                    }
                                    {
                                        fatPercent !== '' &&
                                            (<BasicText marginBottom={5}>
                                                체지방률 {fatPercent} %
                                            </BasicText>)
                                    }
                                    {
                                        memo !== '' &&
                                            (<BasicText marginBottom={5}>
                                                메모 {memo} 
                                            </BasicText>)
                                    }
                                </View>
                            </RowView>

                            <RowView>
                                {
                                    moreState == true && 
                                    
                                        <More>
                                            <MoreOption
                                                onPress={() => { setOptionState(true) }}
                                            >
                                                <MoreOptionText>
                                                    수정
                                                </MoreOptionText>
                                            </MoreOption>

                                            <MoreOption
                                                onPress={() => {
                                                    deleteBtn()
                                                }}
                                            >
                                                <MoreOptionText>
                                                    삭제
                                                </MoreOptionText>
                                            </MoreOption>
                                            
                                        </More>
                                    
                                }

                
                                <TouchableOpacity
                                    onPress={() => {setMoreState(!moreState)}}
                                >
                                    <Modify
                                        source={require('../../assets/more.png')}
                                    />
                                </TouchableOpacity>
                            </RowView>

                            
                        </BodyView>

                        
                    </>
                )
            } else {
                console.log('---bodyRecord == false---')
            }
        }
    }



    const dietBtn = ({item, index}: any) => {
        return(
            <DietBtnView>
                <RowView style={{alignItems:'center'}}>
                    <DietBtnIconView style={{backgroundColor: item.iconBackColor}}>
                        <DietBtnIcon
                            source={item.icon}
                        />
                    </DietBtnIconView>
                    
                    <View>
                        <BasicText>
                            {item.title}
                        </BasicText>
                        <DietDetailText>
                            {item.detail}
                        </DietDetailText>
                    </View>
                </RowView>

                <NextIcon
                    source={require('../../assets/next.png')} 
                />
            </DietBtnView>
        )
    }



    const initSelectedDate = async (today :any) => {
        let year: (number | string) = today.getFullYear();
        let month: (number | string) =  ("0" + (1 + today.getMonth())).slice(-2);
        let day: (number | string) = ("0" + today.getDate()).slice(-2);
        
        let todayString = `${year}-${month}-${day}`;

        await AsyncStorage.setItem('selectedDate', todayString);
    }



    const saveSelectedDate = async (date :string) => {
        await AsyncStorage.setItem('selectedDate', date);
        setSelectedDate(date);
    }



    const getBodyAndExer = async () => {

        let check = false

        record.map((item :any) => {

            if (item.date == selectedDate) {

                console.log('---3---')
                
                let body = item.body;
                check = true
                setBodyRecord(true)

                setWeight(body.weight);
                setMuscle(body.muscle);
                setFatPercent(body.fatPercent);
                setMemo(body.memo);
                setUploadImage(body.img);

            } 

            if (check == false) {


                setBodyRecord(false);

                setWeight('');
                setMuscle('');
                setFatPercent('');
                setMemo('');
                setUploadImage('');
            }
        })
 
    }



    //🌞
    //AsyncStorage setItem이 완료됐을 때 getItem이 실행돼야하는데,
    //이 타이밍을 맞출 수가 없어서 state를 사용함.

    //(처음 useEffect로 AsyncStorage getItem하여 데이터 받음 > state에 넣음 > 그 state로 화면에 보여줌.)
    //save해서 데이터 변경할 때 AsyncStorage.setItem도 하고, 보여주는 state도 변경.
    const modifyBodyData = (weight: any, muscle: any, fatPercent: any, img: any, memo: any) => {

        //수정된 데이터 바로 보여주기
        setWeight(weight);
        setMuscle(muscle);
        setFatPercent(fatPercent);
        setMemo(memo);
        setUploadImage(img);

        //수정된 데이터 따라 state도 변경
        let tempArr = record;

        tempArr.map((item: any) => {
            if (item.date == selectedDate) {
                item.body.weight = weight;
                item.body.muscle = muscle;
                item.body.fatPercent = fatPercent;
                item.body.img = img;
                item.body.memo = memo;
            }
        })
    
        setRecord(tempArr);
        setReload(!reload);
    }


    //🌞
    const deleteBtn = () => {
        Alert.alert(
            '삭제하시겠습니까?', '',
            [
                {
                    text: '확인',
                    onPress: () => { 
                        try {
                            deleteBodyData()
                        } catch (e) {
                            console.log(e)
                        }
                    }
                },
                {
                    text: '취소',
                    onPress: () => {setMoreState(false)}
                }
            ]
        )
    }


    //🌞
    const deleteBodyData = async () => {

        // setBodyRecord(false);

        let newRecord :any = [];
        let check = false;


        record.map((item: any, index: number) => {
            if (item.date == selectedDate) {
                check = true;
                newRecord = record.filter((fItem) => (
                    fItem.date !== selectedDate
                ))
            }
        })

        if (check !== false) {
            let value = JSON.stringify(newRecord);
            await AsyncStorage.setItem('MyRecord', value);
        }



    }


    //🌞 
    const onPressDay = (day: any) => {

        let temp = {
            [day.dateString] : {
                selected: true,
                customStyles: {
                    container: {
                        backgroundColor: CommonSetting.color.point,
                        borderRadius: 15,
                        borderColor: CommonSetting.color.point,
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContents: 'center',
                    },
                    text: {
                        color: '#ffffff',
                    }
                }
            }
        }
        setPressedDate(temp);

        try {
            saveSelectedDate(day.dateString);
        } catch (e) {
            console.log(e)
        }
   
    }



    //선택한 날짜에 맞는 데이터 보여주기
    useEffect(() => {
        try {
            getBodyAndExer();
        } catch (e) {
            console.log(e)
        }
    },[selectedDate])



    useEffect( () => {

        //초기 날짜 설정
        let today: (Date) = new Date();
        let year: (number | string) = today.getFullYear();
        let month: (number | string) =  ("0" + (1 + today.getMonth())).slice(-2);
        let day: (number | string) = ("0" + today.getDate()).slice(-2);
        
        let todayString = `${year}-${month}-${day}`;
        
        setSelectedYear(year);
        setSelectedMonth(month);


        let temp = {
            [todayString] : {
                selected: true,
                customStyles: {
                    container: {
                        backgroundColor: CommonSetting.color.point,
                        borderRadius: 50,
                        borderColor: CommonSetting.color.point,
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContents: 'center',
                    },
                    text: {
                        color: '#ffffff',
                    }
                }
            }
        }
        setPressedDate(temp);

        try {
            initSelectedDate(today);
        } catch (e) {
            console.log(e)
        }

        //내 기록 받아오기
        try {
            getMyRecord()
        } catch (e) {
            console.log(e)
        }

    },[])




    return(
        <Container>

            <PaddingView>
                <TopTitle
                    title={`${selectedYear}년 ${selectedMonth}월`}
                    icon={topTitleIcon}
                />
            </PaddingView>


            <CalendarContainer>
                <CalendarList
                    horizontal={true}
                    pagingEnabled={true}
                    calendarWidth={screenWidth}
                    monthFormat={''}
                    markingType={'custom'}
                    markedDates={pressedDate}
                    onVisibleMonthsChange={(months) => {
                        let year = months[0].year;
                        let month = months[0].month;
                        setSelectedYear(year);
                        setSelectedMonth(month);
                    }}
                    onDayPress={day => {
                        onPressDay(day)
                    }}
                    theme={{
                        calendarBackground: CommonSetting.color.background_dark, //달력 배경색
                        textSectionTitleColor: '#ffffff', //요일 색
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#ffffff',
                        dayTextColor: '#ffffff', 
                        monthTextColor: '#ffffff',
                        textDisabledColor: '#bbbbbb',
                        textDayFontWeight: '400',
                        textDayFontSize: 13,
                        textMonthFontSize: 0, //월
                        textDayHeaderFontSize: 13 //요일 크기
                    }}
                />
            </CalendarContainer>


            <PaddingScrollView>
                
                <CategoryBackView> 

                    <CategoryView
                        onPress={() => {setSelectedCategory(1)}}
                        style={{backgroundColor: selectedCategory === 2 ? 'rgba(64, 64, 77, 1)' : CommonSetting.color.background_dark}}
                    >
                        <CategoryText>
                            식단
                        </CategoryText>
                    </CategoryView>

                    <CategoryView
                        onPress={() => {setSelectedCategory(2)}}
                        style={{backgroundColor: selectedCategory === 1 ? 'rgba(64, 64, 77, 1)' : CommonSetting.color.background_dark}}
                    >
                        <CategoryText>
                            신체 & 운동
                        </CategoryText>
                    </CategoryView>

                </CategoryBackView>

                {categoryContents()}

                {ModifyScreen()}
                
            </PaddingScrollView>
        
        </Container>
    )
}

const Container = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    background-color: ${CommonSetting.color.background_dark};
`
const PaddingView = styled.View`
    padding-left: ${CommonSetting.screenPaddingHorizontal};
    padding-right: ${CommonSetting.screenPaddingHorizontal};
`
const PaddingScrollView = styled.ScrollView`
    padding-left: ${CommonSetting.screenPaddingHorizontal};
    padding-right: ${CommonSetting.screenPaddingHorizontal};
`
const RowView = styled.View`
    flex-direction: row;
`
const CalendarContainer = styled.View`
    width: 100%;
    background-color: ${CommonSetting.color.background_dark};
    background-color: orange;
`
const CategoryBackView = styled.View`
    width: 100%;
    height: 40px;
    background-color: rgba(64, 64, 77, 1);
    border-radius: ${CommonSetting.btnBorderRadius}px;
    border-width: 1px;
    border-color: rgba(64, 64, 77, 1);
    padding: 1.5px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 15px;
`
const CategoryView = styled.TouchableOpacity`
    height: 100%;
    width: 49%;
    background-color: ${CommonSetting.color.background_dark};
    border-radius: ${CommonSetting.btnBorderRadius}px;
    align-items: center;
    justify-content: center;
`
const CategoryText = styled.Text`
    color: white;
    font-size: 14px;
    font-weight: 600;
`
const DietBtnView = styled.TouchableOpacity`
    background-color: rgba(47,49,61,1);
    border-radius: ${CommonSetting.btnBorderRadius}px;
    height: 55px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 150px;
    margin-right: 10px;
    padding-left: 8px;
    padding-right: 8px;
`
const DietBtnIconView = styled.View`
    width: 30px;
    height: 30px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
`
const DietBtnIcon = styled.Image`
    width: 15px;
    height: 15px;
`
const DietDetailText = styled.Text`
    color: #dadada;
    font-size: 13px;
    margin-top: 3px;
`
const NextIcon = styled.Image`
    width: 15px;
    height: 15px;
`
const BodyView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    border-bottom-color: white;
    border-bottom-width: 0.3px;
    padding-top: 15px;
    padding-bottom: 15px;
`
const Icon = styled.Text`
    font-size: 35px;
    margin-right: 10px;
`
const Modify = styled.Image`
    width: 15px;
    height: 15px;
`
const MoreBack = styled.View`
    width: 100%;
    justify-content: center;
    margin-top: 10px;
`
const More = styled.View`
    border-radius: ${CommonSetting.btnBorderRadius}px;
    margin-right: 10px;
    flex-direction: row;
    height: 30px;
`
const MoreOption = styled.TouchableOpacity`
    width: 50px;
    height: 30px;
    align-items: center;
    justify-content: center;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    border-color: ${CommonSetting.color.borderColor};
    border-width: 1px;
    margin-left: 13px;
`
const MoreOptionText = styled.Text`
    font-size: 14px;
    color: white;
`


 

export default TabFirst;