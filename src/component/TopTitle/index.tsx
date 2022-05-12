import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';

interface Props {
    title: string,
    icon?: any
}

const TopTitle = ( {title, icon}: Props) => {

    const iconExample = [
        {
            img: '',
            func: ''
        }
    ]

    const showIcon = () => {
        let result = icon.map((item: any) => (
            <TouchableOpacity
                onPress={() => {item.func()}}
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
                {showIcon()}
            </IconView>
        </Container>
    )
}

const Container = styled.View`
    background-color: ${CommonSetting.color.background_light};
    background-color: ${CommonSetting.color.temp200};
    width: 100%;
    height: 45px;
    margin-top: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
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