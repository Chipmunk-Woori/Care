import React, {useRef, useState, useEffect} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, FlatList} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewGroups from '../../common/NewGroups.json';


interface Props {
    moveTo: (screen: any) => void;
    newGroups: any;
}

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const GuideViewHeight = ScreenHeight * 0.28;
const BtnViewHeight = ScreenHeight * 0.085;
const NewGroupWidth = ScreenWidth - ScreenWidth * 0.11;
const groupsHeight = BtnViewHeight * 3 + 10;

const Group = ({moveTo, newGroups}: Props) => {

    let carouselRef = useRef(null);
    let groupCarouselRef = useRef(null);
    const [newGroupArr, setNewGroupArr] = useState<any[]>([]);
    const tempData = ['MyGroup', 'Group'];
    const isFocused = useIsFocused();
    const [selectedScreenIndex, setSelectedScreenIndex] = useState(0); //현재 보고있는 화면
    const [myGroups, setMyGroups] = useState<any[]>([]);


    const groupSingleView = (item: any, index: any) => {

        if (item) {
            return(
                <NewGroup key={index.toString()}>
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

       
        item.map((i:any, index:any) => {
            singleView = groupSingleView(i, index);
            totalView.push(singleView);
        })
        item = totalView;

        return item;
    }



    const getNewGroup = async () => {

        let newGroups = await AsyncStorage.getItem('newGroups');
        let newGroupsArr = [];

        if (newGroups) {
            newGroupsArr = JSON.parse(newGroups);
        }

        //Carousel 마지막 화면은 '그룹 만들기'
        let value :any[] = [ ...newGroupsArr, {title:"Developer"}]; 

        setMyGroups(value);
        
    }


    useEffect(() => {

        //'새로 생긴 그룹'
        if (newGroups) {
            let totalArr :any[] = [];
            let lastIndex = newGroups.length -1;

            newGroups.map( (item: any, index: any) => {

                if (index % 3 == 0) {
                    let singleArr = [];
 
                    if(index <= lastIndex) {
                        let first = newGroups[index];
                        singleArr.push(first)
                    }
                    
                    if(index+1 <= lastIndex) {
                        let second = newGroups[index+1];
                        singleArr.push(second)
                    }
                    
                    if(index+2 <= lastIndex) {
                        let third = newGroups[index+2];
                        singleArr.push(third)
                    }

                    totalArr.push(singleArr)
                }

            })

            setNewGroupArr(totalArr);
        

        } else {
            console.log('newGroup 없음')
        }

    },[newGroups])


    useEffect(() => {
        try {
            getNewGroup()
        } catch (e) {
            console.log(e)
        }
    },[])



    // ------------------그룹 Carousel------------------

    // X
    const renderScreen = ({item, index}: any) => {
        if (index == 0) {
            return firstScreen()
        } else {
            return (
                <Container/>
            )
        }
    }

    // X
    const firstScreen = () => {
        return(
            <Container>
    
                <Scroll>
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
                        <BtnView
                            onPress={() => {moveTo('MakeGroup')}}
                        >
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
    
                    <FindBtn>
                        <BasicText>
                            오픈 그룹 찾기
                        </BasicText>
                    </FindBtn>
    
                   
    
                </Scroll>

                
    
            </Container>
        )
    }

    //그룹 만들기 화면 (Carousel)
    const groupCarousel = () => {
        return (
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
        )
    }

    //그룹 만들기 화면 (아래)
    const groupScreen = () => { 
        return (
            <>
                <View style={{marginBottom: 25}}>
                    <BtnView
                        onPress={() => {moveTo('MakeGroup')}}
                    >
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

                <FindBtn>
                    <BasicText>
                        오픈 그룹 찾기
                    </BasicText>
                </FindBtn>
            </>
        )
    }



    const myGroupCarousel = ({item, index}: any) => {

        if (index !== myGroups.length-1) {
        
            return (
                <GuideView 
                    style={{
                        backgroundColor:item.iconBackgroundColor,
                        paddingHorizontal: CommonSetting.screenPaddingHorizontal
                    }}>
                    
                    <RowBetween>
                        <DDayView>
                            <DDay>
                                D-{item.period}
                            </DDay>
                        </DDayView>

                        <IconView>
                            <Icon>
                                {item.icon}
                            </Icon>
                            <Title>
                                {item.title}
                            </Title>
                        </IconView>

                        <More>
                            <MoreIcon
                                source={require('../../assets/more_dark.png')}
                            />
                        </More>
                    </RowBetween>

                    <NotiView>
                        <NotiIcon
                            source={require('../../assets/megaphone.png')}
                        />
                        <Noti>
                            {item.introduction}
                        </Noti>
                    </NotiView>

                    <LankingView>
                        <LankingTouch>
                            <LankingText>
                                랭킹
                            </LankingText>
                        </LankingTouch>

                        <LankingTouch>
                            <LankingText>
                                멤버
                            </LankingText>
                        </LankingTouch>
                    </LankingView>
                    
                </GuideView>
            )
        } else {
            return groupCarousel()
        }
    }


    //아랫부분
    const myGroupScreen = () => {

        const item :any = myGroups[selectedScreenIndex];


        if (typeof item !== 'undefined' && item.title !== "Developer") {
            
            return(
                <View>
    
                    <BtnView
                        onPress={() => {moveTo('MakeGroup')}}
                        style={{height: (BtnViewHeight-10)}}
                    >
                        <RowView style={{alignItems: 'center'}}>
                            <BtnIconView style={{backgroundColor:'#fafaec', width: 33, height: 33}}>
                                
                                <BtnIcon
                                    source={require('../../assets/crown.png')} 
                                />
                            </BtnIconView>
                            <Chat>
                                {item.title}
                            </Chat>
                        </RowView>
    
                        <NextIcon
                            source={require('../../assets/next.png')} 
                        />
                    </BtnView>
    
                    <BtnView
                        onPress={() => {moveTo('MakeGroup')}}
                        style={{height: (BtnViewHeight-10)}}
                    >
                        <RowView style={{alignItems: 'center'}}>
                            <BtnIconView style={{backgroundColor:'rgb(153,153,174)', width: 33, height: 33}}>
                                
                                <BtnIcon
                                    source={require('../../assets/message.png')} 
                                />
                            </BtnIconView>
                            <Chat>
                                그룹 채팅방
                            </Chat>
                        </RowView>
    
                        <NextIcon
                            source={require('../../assets/next.png')} 
                        />
                    </BtnView>
    
    
                    <BtnView
                        onPress={() => {moveTo('MakeGroup')}}
                        style={{height: (BtnViewHeight-10)}}
                    >
                        <RowView style={{alignItems: 'center'}}>
                            <BtnIconView style={{width: 33, height: 33}}>
                                <BtnIcon
                                    source={require('../../assets/addFriend.png')} 
                                />
                            </BtnIconView>
                            <View>
                                <Chat>
                                    첫 멤버를 초대해볼까요?
                                </Chat>
                                <Code>
                                    GROUP-92232B
                                </Code>
                            </View>
                            
                        </RowView>
    
                        <SharingCodeView>
                            <SharingCode>
                                코드 공유
                            </SharingCode>
                        </SharingCodeView>
                    </BtnView>
    
                </View>
            )
        } else {
            return groupScreen()
        }

        
    }



    return(
        <Container>

         
            <Scroll>
                {/* <FlatList
                    data={tempData}
                    keyExtractor={(item, index) => index.toString()}      
                    renderItem={myGroupCarousel}  
                    horizontal={true}
                /> */}

                <Carousel
                    ref={(ref:any) => { groupCarouselRef = ref }}
                    data={myGroups}
                    renderItem={myGroupCarousel}
                    sliderWidth={ScreenWidth}
                    itemWidth={ScreenWidth}
                    sliderHeight={groupsHeight}
                    itemHeight={groupsHeight}
                    onSnapToItem={(slideIndex) => {//화면 넘길때마다 실행될 함수
                        setSelectedScreenIndex(slideIndex)
                    }}
                />

                {myGroupScreen()}

            </Scroll>
          
        </Container>
    )
}

const Container = styled.SafeAreaView`
    width: ${ScreenWidth}px;
    height: ${ScreenHeight}px;
    background-color: ${CommonSetting.color.background_dark};
`
const Scroll = styled.ScrollView`
    padding-left: ${CommonSetting.screenPaddingHorizontal};
    padding-right: ${CommonSetting.screenPaddingHorizontal};
    margin-bottom: 130px;

`
const GuideView = styled.View`
    width: ${ScreenWidth*0.9}px;
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
const FindBtn = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    border-color: ${CommonSetting.color.borderColor};
    border-width: 1px;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`
const RowBetween = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 45%;
`
const DDayView = styled.View`
    background-color: black;
    align-items: center;
    justify-content: center;
    padding: 3px;
    width: 18%;
    height: 28px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
`
const DDay = styled.Text`
    color: white;
    font-size: 13px;
    font-weight: 600;
`
const TitleView = styled.View`
    width: 70%;
`
const Icon = styled.Text`
    font-size: 30px;
    margin-bottom: 5px;
`
const Title = styled.Text`
    font-size: 20px;
    color: ${CommonSetting.color.text_navy};
    font-weight: 600;
`
const More = styled.TouchableOpacity`
    width: 8%;
    align-items: flex-end;
    justify-content: center;
    height: 25px;
`
const MoreIcon = styled.Image`
    width: 15px;
    height: 15px;
`
const IconView = styled.View`
    align-items: center;
    width: 74%;
    justify-content: center;
`
const NotiView = styled.TouchableOpacity`
    width: 100%;
    height: 18%;
    background-color: white;
    flex-direction: row;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    align-items: center;
    padding-left: ${CommonSetting.screenPaddingHorizontal};
    padding-right: ${CommonSetting.screenPaddingHorizontal};
    margin-bottom: 5px;
`
const Noti = styled.Text`
    color: ${CommonSetting.color.borderColor};
    font-size: 15px;
`
const NotiIcon = styled.Image`
    width: 17px;
    height: 17px;
    margin-right: 10px;
`
const LankingView = styled.View`
    width: 100%;
    height: 18%;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5px;
`
const LankingTouch = styled.TouchableOpacity`
    width: 47%;
    height: 100%;
    background-color: #cce4db;
    align-items: center;
    justify-content: center;
    border-radius: ${CommonSetting.btnBorderRadius}px;
`
const LankingText = styled.Text`
    color: ${CommonSetting.color.background_dark};
    font-size: 16px;
`
const ChatView = styled.View`
    width: 100%;
    background-color: ${CommonSetting.color.lightBtn};
    border-radius: ${CommonSetting.btnBorderRadius}px;
    height: 30px;
    flex-direction: row;
    align-items: center;
`
const Chat = styled.Text`
    font-size: 15px;
    color: ${CommonSetting.color.text_gray};
    font-weight: 700;
`
const Code = styled.Text`
    font-size: 12px;
    color: ${CommonSetting.color.text_gray};
    font-weight: 500;
`
const SharingCodeView = styled.TouchableOpacity`
    border-radius: ${CommonSetting.btnBorderRadius}px;
    border-width: 1px;
    border-color: ${CommonSetting.color.borderColor};
    background-color: ${CommonSetting.color.background_dark};
    padding-left: 13px;
    padding-right: 13px;
    padding-top: 7px;
    padding-bottom: 7px;
`
const SharingCode = styled.Text`
    color: white;
    font-size: 13px;
    font-weight: 600;
`

export default Group;