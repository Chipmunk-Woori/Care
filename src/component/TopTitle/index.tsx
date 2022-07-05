import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';

interface Props {
    title?: string,
    icon?: any
}

const TopTitle = ( {title, icon}: Props) => {

    // 상단 아이콘
    // const topTitleIcon = [
    //     {
    //         img: require('../../assets/upload.png'),
    //         func: () => {console.log('첫번째')}
    //     },
    //     {
    //         img: require('../../assets/files.png'),
    //         func: () => {console.log('두번째')}
    //     },
    //     {
    //         img: require('../../assets/palette.png'),
    //         func: () => {console.log('세번째')}
    //     }
    // ]

    const iconExample = [
        {
            img: '',
            func: ''
        }
    ]

    const showIcon = () => {
        let result = icon.map((item: any, index: number) => (
            <TouchableOpacity
                onPress={() => {item.func()}}
                key={index.toString()}
            >
                <IconImg
                    source = {item.img}
                />
            </TouchableOpacity>
        ))

        return result;
    }

    return (
        <Container>
            <Title>
                {title}
            </Title>
            <IconView>
                {icon && showIcon()}
            </IconView>
        </Container>
    )
}

const Container = styled.View`
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

export default TopTitle;