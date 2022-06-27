import React, { useEffect, useState } from "react";
import {View, Text} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import TopTitle from '../../component/TopTitle';
import BasicText from "../../component/BasicText";
import TitleText from "../../component/TitleText";

interface Props {

}



const TabFourth = () => {

    const dayArr = ['월', '화', '수', '목', '금', '토', '일'];
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [hours, setHours] = useState(0);

    const getDate = () => {

        //현재
        let today = new Date();

        //만료 시간 구하기 (today의 23:59:59)
        let year :any = today.getFullYear();
        let month :any = today.getMonth() + 1;
        let day :any = today.getDate();

        if (month < 10) { month = `0${month}` } 
        if (day < 10) { day = `0${day}` }

        let tempDDay = new Date(`${year}-${month}-${day}T23:59:59`);
        let dDay = new Date(tempDDay); 

        //현재 - 만료날짜 
        let gap = dDay.getTime() - today.getTime();

        let second = Math.floor( (gap / 1000) % 60);
        let minute = Math.floor( (gap / (1000 * 60)) % 60 );
        let hour = Math.floor( (gap / (1000 * 60 * 60)) % 24);
        
        setSeconds(second);
        setMinutes(minute);
        setHours(hour);

    }

    const dayView = () => {

        let result =dayArr.map((item :any, index :any) => {

            return (
                <TodayView key={index.toString()}>
                    <DayText>
                        {item}
                    </DayText>
                </TodayView>
            )
        })

        return result;
    }

    useEffect(() => {
        getDate();
    },[])

    useEffect(() => {
        const countdown = setInterval(() => {
            if (seconds > 0) {
                
                setSeconds(seconds - 1)
            } else if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        getDate()
                    } else if (hours !== 0) {
                        setHours(hours - 1)
                        setMinutes(59)
                        setSeconds(59)
                    }
                } else if (minutes !== 0) {
                    setMinutes(minutes - 1)
                    setSeconds(59)
                }
            }
        }, 1000)

        return () => clearInterval(countdown)
    },[seconds])


    return(
        <Container>
            <PaddingView>

                <TopTitle
                    title={`남은 시간 ${hours}:${minutes}:${seconds}`}
                />

                

                <DayView>
                    {dayView()}
                </DayView>

            </PaddingView>
        </Container>
    )
}

export default TabFourth;

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
const DayView = styled.View`
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
`
const DayText = styled.Text`
    color: white;
    font-size: 12px;
`
const TodayView = styled.View`
    margin-right: 10px;
    border-radius: 50px;
    border-width: 2px;
    border-color: purple;
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
`
const HeaderContainer = styled.View`
    background-color: ${CommonSetting.color.background_dark};
    width: 100%;
    height: 45px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
const Title = styled.Text`
    color: ${CommonSetting.color.text_light};
    font-size: 18px;
    font-weight: bold;
`
const IconView = styled.View`
    flex-direction: row;
`
const IconImg = styled.Image`
    width: 21px;
    height: 21px;
    margin-left: 20px;
`