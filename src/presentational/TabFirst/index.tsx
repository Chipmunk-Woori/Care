import React, {useEffect, useRef, useState} from "react";
import {View, Text, Dimensions, Image, StyleSheet, Pressable, Modal, Alert, TouchableOpacity, FlatList} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import TopTitle from '../../component/TopTitle';
import {Calendar, LocaleConfig, CalendarList, Agenda} from 'react-native-calendars';
import BasicText from "../../component/BasicText";
import Carousel, { Pagination } from 'react-native-snap-carousel';




interface Props {

}

const screenHeight: number = Dimensions.get('window').height;
const screenWidth: number = Dimensions.get('window').width;
const CalendarHeight = screenHeight - 45;


const TabFirst = () => {
    const [todayDate, setTodayDate] = useState('');
    const [pressedDate, setPressedDate] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(1); //1:식단, 2:신체&운동
    let tempRef = useRef(null);

    //상단 아이콘
    const topTitleIcon = [
        {
            img: require('../../assets/upload.png'),
            func: () => {console.log('첫번째')}
        },
        {
            img: require('../../assets/files.png'),
            func: () => {console.log('두번째')}
        },
        {
            img: require('../../assets/palette.png'),
            func: () => {console.log('세번째')}
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
            return(
                <View>
                    
                </View>
            )
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

    let tempDataArr = ['a', 'b'];

    const tempFunction = ({item}: any) => {
       
       
        return(
            <Text>{item}</Text>
        )
        
        
    }



    useEffect(() => {
        let today: (Date) = new Date();
        let year: (number | string) = today.getFullYear();
        let month: (number | string) =  ("0" + (1 + today.getMonth())).slice(-2);
        let date: (number | string) = ("0" + today.getDate()).slice(-2);
        
        let todayString = `${year}-${month}-${date}`;
        setTodayDate(todayString);


        let temp = {
            [todayString] : {
                selected: true,
                // marked: true,
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
    },[])

    return(
        <Container style={{paddingHorizontal: CommonSetting.screenPaddingHorizontal}}>

            <TopTitle
                title={'2022년 5월'}
                icon={topTitleIcon}
            />

            <CalendarBtn
                onPress={() => {}}
            > 
                <ArrowBtn
                    source={require('../../assets/arrow_down.png')}
                />
            </CalendarBtn>
            

            {/* <Calendar
                // minDate={todayDate}
                monthFormat={'yyyy년 MM월'}
                markingType={'custom'}
                markedDates={pressedDate}
                onDayPress={day => {
                    let temp = {
                        [day.dateString] : {
                            selected: true,
                            marked: true,
                            customStyles: {
                                container: {
                                    backgroundColor: CommonSetting.color.point,
                                    borderRadius: 20,
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
                }}
                
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: 'rgba(255, 255, 255, 0.5)',
                    textSectionTitleColor: '#666666',
                    selectedDayBackgroundColor: '#ffffff',
                    selectedDayTextColor: CommonSetting.color.point,
                    todayTextColor: '#666666',
                    dayTextColor: '#666666',
                    textDisabledColor: '#bbbbbb',
                    arrowColor: CommonSetting.color.point,
                    monthTextColor: '#333333',
                    indicatorColor: 'blue',
                    textDayFontWeight: '400',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 19,
                    textDayHeaderFontSize: 16,
                }}
                enableSwipeMonths={true}
                disableAllTouchEventsForDisabledDays={true}
            /> */}

           
                {/* <CalendarContainer> */}
                    {/* <CalendarList
                        horizontal={true}
                        pagingEnabled={true}
                        calendarWidth={screenWidth}
                        monthFormat={''}
                        markingType={'custom'}
                        markedDates={pressedDate}
                        onDayPress={day => {
                            let temp = {
                                [day.dateString] : {
                                    selected: true,
                                    // marked: true,
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
                        }}
                        theme={{
                            backgroundColor: '#ffffff',
                            textSectionTitleColor: '#666666', //요일 색
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#666666',
                            dayTextColor: '#666666', 
                            monthTextColor: '#ffffff',
                            textDisabledColor: '#bbbbbb',
                            textDayFontWeight: '400',
                            textDayFontSize: 13,
                            textMonthFontSize: 0,
                            textDayHeaderFontSize: 13,
                            // textDisabledColor: '#d9e1e8',
                        }}
                    /> */}
                {/* </CalendarContainer> */}
           

            <View style={{backgroundColor:'rgba(64, 64, 77, 0.5)', height: 60, marginBottom: 15}}/>

            <CategoryBackView> 

                <CategoryView
                    onPress={() => {setSelectedCategory(1)}}
                >
                    <CategoryText>
                        식단
                    </CategoryText>
                </CategoryView>

                <CategoryView
                    onPress={() => {setSelectedCategory(2)}}
                >
                    <CategoryText>
                        신체 & 운동
                    </CategoryText>
                </CategoryView>

            </CategoryBackView>



            {categoryContents()}

            <View style={{width: 250, height: 160}}>
                {/* <Carousel
                    ref={(ref:any) => { tempRef = ref }}
                    data={tempDataArr}
                    renderItem={tempFunction}
                    sliderWidth={200}
                    itemWidth={150}
                    sliderHeight={200}
                    itemHeight={200}
                /> */}
            </View>

            
        </Container>
    )
}

const Container = styled.ScrollView`
    width: 100%;
    height: 100%;
    background-color: ${CommonSetting.color.background_dark};
`
const RowView = styled.View`
    flex-direction: row;
`
const CalendarContainer = styled.View`
    width: 100%;
    height: ${CalendarHeight}px;
    background-color: ${CommonSetting.color.background_dark};
    top: 0px;
`
const CalendarBtn = styled.TouchableOpacity`
    width: 30%;
    height: 45px;
    position: absolute;
    left: 20px;
    top: 50px;
    justify-content: center;
    /* background-color: bisque; */
`
const ArrowBtn = styled.Image`
    width: 20px;
    height: 20px;
    left: 85%;
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
    font-size: 13px;
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


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor:'lavender'
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

 

export default TabFirst;