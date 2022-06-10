import React, {useRef, useState, useEffect} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, FlatList} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";
import Carousel, { Pagination } from 'react-native-snap-carousel';

interface Props {

}

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const GuideViewHeight = ScreenHeight * 0.28;
const BtnViewHeight = ScreenHeight * 0.085;
const NewGroupWidth = ScreenWidth - ScreenWidth * 0.11;
const groupsHeight = BtnViewHeight * 3 + 10;

const Group = () => {

    let carouselRef = useRef(null);
    const [newGroupArr, setNewGroupArr] = useState<any[]>([]);

    const groupArr = [
        {
            icon : '🥗',
            title : '두 달 동안 건강한 식사',
            iconBackgroundColor : '#e4f4de',
            introduction : '가공되지않은 음식 위주로 먹기',
            rull : '',
            record : ['식단', '운동', '물', '걸음'],
            open : 'true',
            numberOfLimit : 10,
            numberOfMember : 8,
            period : 30,
            endDate : '2022.07.30',
            strength : '가볍게',
            physicalCondition : '',
            goals : ''
        },
        {
            icon : '🍊',
            title : '오렌지 다이어트',
            iconBackgroundColor : 'rgba(244,222,225,1)',
            introduction : '저녁 대신 오렌지 먹기',
            rull : '',
            record : ['식단', '운동', '물', '걸음'],
            open : 'true',
            numberOfLimit : 20,
            numberOfMember : 5,
            period : 14,
            endDate : '2022.06.21',
            strength : '적당히',
            physicalCondition : '',
            goals : ''
        },
        {
            icon : '✈️',
            title : '가보자고',
            iconBackgroundColor : '#c1e2eb',
            introduction : '저녁 대신 오렌지 먹기',
            rull : '',
            record : ['식단', '운동', '물', '걸음'],
            open : 'true',
            numberOfLimit : 20,
            numberOfMember : 5,
            period : 14,
            endDate : '2022.06.21',
            strength : '적당히',
            physicalCondition : '',
            goals : ''
        },
        {
            icon : '💙',
            title : '하루에 물 2L',
            iconBackgroundColor : '#c1e2eb',
            introduction : '저녁 대신 오렌지 먹기',
            rull : '',
            record : ['식단', '운동', '물', '걸음'],
            open : 'true',
            numberOfLimit : 20,
            numberOfMember : 5,
            period : 14,
            endDate : '2022.06.21',
            strength : '적당히',
            physicalCondition : '',
            goals : ''
        },
        {
            icon : '📆',
            title : '딱 한 달 다이어트',
            iconBackgroundColor : 'rgba(244,222,225,1)',
            introduction : '한 달 동안 식단+운동',
            rull : '',
            record : ['식단', '운동'],
            open : 'true',
            numberOfLimit : 10,
            numberOfMember : 4,
            period : 30,
            endDate : '2022.07.10',
            strength : '약간 세게',
            physicalCondition : '',
            goals : ''
        },
        {
            icon : '🏋🏻',
            title : '공복유산소',
            iconBackgroundColor : '#c1e2eb',
            introduction : '주 3회 아침 공복유산소',
            rull : '',
            record : ['식단', '운동'],
            open : 'true',
            numberOfLimit : 30,
            numberOfMember : 16,
            period : 30,
            endDate : '2022.07.21',
            strength : '적당히',
            physicalCondition : '',
            goals : ''
        },
    ]


    const groupSingleView = (item: any) => {

        if (item) {
            return(
                <NewGroup>
                    <RowView style={{alignItems: 'center'}}>
                        <GroupIconView style={{backgroundColor: item.iconBackgroundColor}}>
                            <GroupIcon>
                                {item.icon}
                            </GroupIcon>
                        </GroupIconView>

                        <View style={{justifyContent: 'space-between'}}>
                            <RowView style={{marginBottom: 11}}>
                                <GroupTitle>
                                    {item.title}
                                </GroupTitle>
                                <GroupMember>
                                    · {item.numberOfMember}/{item.numberOfLimit}명
                                </GroupMember>
                            </RowView>

                            <RowView>
                                <GroupDetail style={{backgroundColor: CommonSetting.color.lightBtn}}>
                                    <GroupDetailText>
                                        D-60
                                    </GroupDetailText>
                                </GroupDetail>
                                <GroupDetail>
                                    <GroupDetailText>
                                        {item.strength}
                                    </GroupDetailText>
                                </GroupDetail>
                                <GroupDetail>
                                    <GroupDetailText>
                                        🔥💧👟
                                    </GroupDetailText>
                                </GroupDetail>
                            </RowView>
                        </View>

                    </RowView>

                    <JoinBtn>
                        <JoinText>
                            참여
                        </JoinText>
                    </JoinBtn>
                </NewGroup>
            )
        } else {
            console.log('item이 없음')
            return <NewGroup style={{backgroundColor:CommonSetting.color.background_dark}}/>
        }
    
    }


    const groupView = ({item}: any) => {

        let singleView = null;
        let totalView :any[] = [];

        item.map((i:any) => {
            singleView = groupSingleView(i);
            totalView.push(singleView);
        })

        item = totalView;

        return item;

    }


    useEffect(() => {

        let totalArr :any[] = [];
        let lastIndex = groupArr.length -1;

        groupArr.map( (item: any, index: any) => {

            if (index % 3 == 0) {
                let singleArr = [];

                
                if(index <= lastIndex) {
                    let first = groupArr[index];
                    singleArr.push(first)
                }
                
                
                if(index+1 <= lastIndex) {
                    let second = groupArr[index+1];
                    singleArr.push(second)
                }
                
                if(index+2 <= lastIndex) {
                    let third = groupArr[index+2];
                    singleArr.push(third)
                }

                totalArr.push(singleArr)

            }

        })
       
        setNewGroupArr(totalArr);
        
    },[])



    return(
        <Container>

            {/* <HeaderView>
                <HeaderBtnView>
                    <HeaderBtn>
                        <HeaderText>
                            그룹
                        </HeaderText>
                    </HeaderBtn>
                    <HeaderBtn>
                        <HeaderText>
                            서바이벌
                        </HeaderText>
                    </HeaderBtn>
                    <HeaderBtn>
                        <HeaderText>
                            종료된
                        </HeaderText>
                    </HeaderBtn>
                </HeaderBtnView>

                <TouchableOpacity>
                    <SearchIcon
                        source={require('../../assets/search.png')}
                    />
                </TouchableOpacity>
            </HeaderView> */}


            <ScrollView style={{paddingHorizontal: CommonSetting.screenPaddingHorizontal}}>
                <GuideView>
                    <Image
                        style={{width: 65, height: 65}}
                        source={require('../../assets/group.png')}
                    />
                    <GuideText>
                        친구랑 기록을 실시간 공유해요
                    </GuideText>
                    <GuideBtn style={{borderColor: CommonSetting.color.borderColor}}>
                        <BasicText>
                            그룹 가이드 보기
                        </BasicText>
                    </GuideBtn>
                </GuideView>

                <View style={{marginBottom: 25}}>
                    <BtnView>
                        <RowView style={{alignItems: 'center'}}>
                            <BtnIconView>
                                <BtnIcon
                                    source={require('../../assets/plus.png')} 
                                />
                            </BtnIconView>
                            <BasicText>
                                원하는 그룹 만들기
                            </BasicText>
                        </RowView>

                        <NextIcon
                            source={require('../../assets/next.png')} 
                        />
                    </BtnView>
                    <BtnView>
                        <RowView style={{ alignItems: 'center'}}>
                            <BtnIconView>
                                <BtnIcon
                                    source={require('../../assets/letter.png')} 
                                />
                            </BtnIconView>
                            <BasicText>
                                받은 초대 코드 입력하기
                            </BasicText>
                        </RowView>

                        <NextIcon
                            source={require('../../assets/next.png')} 
                        />
                    </BtnView>
                    <BtnView style={{backgroundColor: CommonSetting.color.lightBtn}}>
                        <RowView style={{alignItems:'center'}}>
                            <BtnIconView style={{backgroundColor: CommonSetting.color.lightBtnIcon}}>
                                <BtnIcon
                                    source={require('../../assets/search.png')} 
                                />
                            </BtnIconView>
                            <BasicText>
                                오픈 그룹 찾기
                            </BasicText>
                        </RowView>

                        <NextIcon
                            source={require('../../assets/next.png')} 
                        />
                    </BtnView>
                </View>

                <TitleText>
                    새로 생긴 그룹
                </TitleText>

                <View style={{height:15}} />


                <Carousel
                    ref={(ref:any) => { carouselRef = ref }}
                    data={newGroupArr}
                    renderItem={groupView}
                    sliderWidth={ScreenWidth}
                    itemWidth={ScreenWidth}
                    sliderHeight={groupsHeight}
                    itemHeight={groupsHeight}
                    // containerCustomStyle={{backgroundColor:'yellow'}}
                />

               

            </ScrollView>

        </Container>
    )
}

const Container = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    background-color: ${CommonSetting.color.background_dark}
`
const HeaderView = styled.View`
    width: 100%;
    height: 7%;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 5%;
    padding-right: 5%;
`
const HeaderBtnView = styled.View`
    flex-direction: row;
    width: 50%;
    justify-content: space-between;
    align-items: center;
`
const HeaderBtn = styled.TouchableOpacity`
`
const HeaderText = styled.Text`
    font-size: 18px;
    color: ${CommonSetting.color.text_light};
    font-weight: bold;
`
const SearchIcon = styled.Image`
    width: 20px;
    height: 20px;
`
const GuideView = styled.View`
    width: 100%;
    height: ${GuideViewHeight}px;
    border-color: ${CommonSetting.color.borderColor};
    border-width: 1px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    margin-top: 10px;
    border-style: dotted;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
`
const GuideText = styled.Text`
    font-size: 22px;
    margin-top: 22px;
    color: white;
    font-weight: 500;
`
const GuideBtn = styled.TouchableOpacity`
    padding-left: 23px;
    padding-right: 23px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    border-width: 1px;
    border-color: black;
    margin-top: 25px;
`
const BtnView = styled.TouchableOpacity`
    padding-left: 17px;
    padding-right: 17px;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 100%;
    height: ${BtnViewHeight}px;
    background-color: ${CommonSetting.color.darkBtn};
    border-radius: ${CommonSetting.btnBorderRadius}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7px;
`
const BtnIconView = styled.View`
    background-color: ${CommonSetting.color.background_dark};
    width: 38px;
    height: 38px;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin-right: 12px;
`
const BtnIcon = styled.Image`
    width: 18px;
    height: 18px;
`
const NextIcon = styled.Image`
    width: 16px;
    height: 16px;
`
const NewGroup = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: ${NewGroupWidth}px;
    height: ${BtnViewHeight}px;
    border-bottom-width: 0.5px;
    border-bottom-color: ${CommonSetting.color.borderColor};
` 
const GroupTitle = styled.Text`
    font-size: 16px;
    margin-right: 7px;
    color: white;
`
const GroupMember = styled.Text`
    font-size: 15px;
    color: #b6b4b4;
    font-weight: 700;
`
const RowView = styled.View`
    flex-direction: row;
`
const GroupDetail = styled.View`
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
    background-color: ${CommonSetting.color.darkBtn};
    border-radius: 5px;
    margin-right: 5px;
`
const GroupDetailText = styled.Text`
    font-size: 13px;
    color: white;
`
const JoinBtn = styled.TouchableOpacity`
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 7px;
    padding-bottom: 7px;
    border-radius: 7px;
    border-width: 1.2px;
    border-color: ${CommonSetting.color.borderColor};
`
const JoinText = styled.Text`
    font-size: 13px;
    color: white;
    font-weight: 800;
`
const GroupIconView = styled.View`
    background-color: rgba(244,222,225,1);
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin-right: 15px;
`
const GroupIcon = styled.Text`
    font-size: 20px;
`


export default Group;