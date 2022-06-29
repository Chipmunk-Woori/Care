import React, {useEffect, useState} from "react";
import {View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, FlatList, StyleSheet} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";
import GroupPage from "../../page/GroupPage";
import TabSecond from '../../presentational/TabSecond';
import Group from '../../presentational/Group';
import Survival from '../../presentational/Survival';
import Terminated from '../../presentational/Terminated';
import NewGroups from "../../common/NewGroups.json";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GroupContainer from "../GroupContainer";

interface Props {
    navigation: any;
}

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const headerTabHeight = ScreenHeight * 0.07;

const TabSecondContainer = ({navigation}: Props) => {

    const [selectedHeader, setSelectedHeader] = useState({});

    const headerBtnArr = [
        {
            title : '그룹',
            screen : 'Group'
        },
        {
            title : '서바이벌',
            screen : 'Survival'
        },
        {
            title : '종료된',
            screen : 'Terminated'
        }
    ];

    const headerBtnView = () => {
        
        let temp = headerBtnArr.map((item: any, index:any) => {
            return (
                <HeaderBtn
                    key={index.toString()}
                    style={selectedHeader === item.title && styles.selected}
                    onPress={() => {
                        setSelectedHeader(item.title)
                    }}
                >
                    <HeaderText
                        style={selectedHeader === item.title && styles.selectedTitle}    
                    >
                        {item.title}
                    </HeaderText>
                </HeaderBtn>
            )
        })

        return temp;
    }

    const headerScreen = () => {

        if (selectedHeader === '그룹') {
            return <GroupContainer navigation={navigation}/>
        } else if (selectedHeader === '서바이벌') {
            return <Survival />
        } else if (selectedHeader === '종료된') {
            return <Terminated />
        }
        
    }

    const moveTo = (screen: any) => {
        navigation.push(screen);
    }


    const storeNewGroups = async () => {
        try {
            const jsonValue = JSON.stringify(NewGroups);
            await AsyncStorage.setItem('newGroups', jsonValue);
        } catch (e) {
            console.log(e)
        }
    }
    

    useEffect(() => {
        let init = headerBtnArr[0].title;
        setSelectedHeader(init);

        storeNewGroups()
    }, [])

    

    return (
        <>
            <StatusBar barStyle={'light-content'} />

            <Container>
                <PaddingView>
                    <HeaderView>
                        <HeaderBtnView>
                            {headerBtnView()}
                        </HeaderBtnView>

                        <TouchableOpacity>
                            <SearchIcon
                                source={require('../../assets/search.png')}
                            />
                        </TouchableOpacity>
                    </HeaderView>
                </PaddingView>
            </Container>


            {headerScreen()}
            
        </>
    )
}

const Container = styled.SafeAreaView`
    width: 100%;
    height: 100px;
    background-color: ${CommonSetting.color.background_dark};
`
const PaddingView = styled.View`
    padding-left: ${CommonSetting.screenPaddingHorizontal};
    padding-right: ${CommonSetting.screenPaddingHorizontal};
`
const HeaderView = styled.View`
    width: 100%;
    height: 45px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    border-bottom-color: ${CommonSetting.color.borderColor};
    border-bottom-width: 1px;
`
const HeaderBtnView = styled.View`
    flex-direction: row;
    width: 50%;
    justify-content: space-between;
    align-items: center;
`
const HeaderBtn = styled.Pressable`
    border-bottom-width: 2px;
    border-bottom-color: rgba(0,0,0,0);
    height: 45px;
    justify-content: center;
`
const HeaderText = styled.Text`
    font-size: 18px;
    color: rgba(99,97,117,1);
    font-weight: bold;
`
const SearchIcon = styled.Image`
    width: 20px;
    height: 20px;
`

const styles = StyleSheet.create({
    selected: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    },
    selectedTitle: {
        color: 'white'
    }
})

export default TabSecondContainer;