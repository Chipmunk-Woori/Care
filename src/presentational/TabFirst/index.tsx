import React from "react";
import {View, Text} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import TopTitle from '../../component/TopTitle';


interface Props {

}

const TabFirst = () => {

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

    return(
        <Container>
            <TopTitle
                title={'2022년 5월'}
                icon={topTitleIcon}
            />
            <Calendar/>
            <Record />
            
        </Container>
    )
}

const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${CommonSetting.color.background_light};
`
const Calendar = styled.View`
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