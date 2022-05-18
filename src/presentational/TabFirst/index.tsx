import React, {useEffect, useState} from "react";
import {View, Text, Dimensions} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import TopTitle from '../../component/TopTitle';
import {Calendar, LocaleConfig, CalendarList, Agenda} from 'react-native-calendars';




interface Props {

}


const TabFirst = () => {
    const screenHeight: number = Dimensions.get('window').height;
    const screenWidth: number = Dimensions.get('window').width;
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
            {/* <CalendarView/>
            <Record /> */}

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

            <CalendarList
                horizontal={true}
                pagingEnabled={true}
                calendarWidth={screenWidth}
                monthFormat={'yyyy년 MM월'}
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
                    textDisabledColor: '#bbbbbb',
                    textDayFontWeight: '400',
                    textDayFontSize: 16,
                    textMonthFontSize: 19,
                    textDayHeaderFontSize: 16,
                    // textDisabledColor: '#d9e1e8',
                }}
            />
            
        </Container>
    )
}

const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${CommonSetting.color.background_light};
`
const CalendarView = styled.View`
    width: 100%;
    height: 10%;
    background-color: ${CommonSetting.color.temp50};
`
const Record = styled.View`
    width: 100%;
    height: 28%;
    margin-top: 10px;
    background-color: ${CommonSetting.color.temp200};
`
 

export default TabFirst;