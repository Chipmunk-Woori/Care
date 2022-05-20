import React, {useEffect, useState} from "react";
import {View, Text, Dimensions, Image, StyleSheet, Pressable, Modal, Alert, TouchableOpacity} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import TopTitle from '../../component/TopTitle';
import {Calendar, LocaleConfig, CalendarList, Agenda} from 'react-native-calendars';




interface Props {

}


const screenHeight: number = Dimensions.get('window').height;
const screenWidth: number = Dimensions.get('window').width;
const CalendarHeight = screenHeight - 45;

const TabFirst = () => {
    const [todayDate, setTodayDate] = useState('');
    const [pressedDate, setPressedDate] = useState({});

    //상단 아이콘
    const topTitleIcon = [
        {
            img: require('../../assets/TabSecond.png'),
            func: () => {console.log('첫번째')}
        },
        {
            img: require('../../assets/TabThird.png'),
            func: () => {console.log('두번째')}
        },
        {
            img: require('../../assets/TabFourth.png'),
            func: () => {console.log('세번째')}
        }
    ]

    //달력
    LocaleConfig.locales['fr'] = {
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
    LocaleConfig.defaultLocale = 'fr';

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
        <Container>

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
                    <CalendarList
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
                    />
                {/* </CalendarContainer> */}
           




            <CategoryView> 
                <CategoryBtn>
                    <Text>
                        식단
                    </Text>
                </CategoryBtn>
                <CategoryBtn>
                    <Text>
                        바디 운동
                    </Text>
                </CategoryBtn>
               
                
            </CategoryView>


            
            
        </Container>
    )
}

const Container = styled.ScrollView`
    width: 100%;
    height: 100%;
    background-color: ${CommonSetting.color.background_light};
`
const CalendarContainer = styled.View`
    width: 100%;
    height: ${CalendarHeight}px;
    background-color: ${CommonSetting.color.background_light};
    top: 0px
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
const CategoryView = styled.View`
    width: 100%;
    height: 7%;
    margin-top: 10px;
    background-color: ${CommonSetting.color.gray};
    justify-content: center;
    flex-direction: row;
`
const CategoryBtn = styled.TouchableOpacity`
    height: 90%;
    width: 40%;
    background-color: orange;
    margin-right: 10px;
    margin-left: 10px;
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