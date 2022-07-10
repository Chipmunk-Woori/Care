import React, {useRef, useState, useEffect} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, FlatList} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {useIsFocused} from '@react-navigation/native';


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
    const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);


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


    useEffect(() => {

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



    // ------그룹 상단 Carousel------


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
    
                    {/* 여기 할 차례 : flatlist 랑 carousel 가로 터치가 겹치는 문제 해결하기 */}
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

    //기본 그룹 만들기 화면 (FlatList Footer)
    const groupScreen = () => {

        <Container>
            <Scroll>
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

                {/* 여기 할 차례 : flatlist 랑 carousel 가로 터치가 겹치는 문제 해결하기 */}
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
    }

    const myGroupCarousel = ({item, index}: any) => {

        
        

        //화면 퍼블리싱해놓고 데이터 받아서(파라미터 item) 그 데이터 보여주기
        return (
            
            <GuideView style={{backgroundColor:'orange'}}>
                
                <GuideText>
                        주 3회 운동
                </GuideText>
                
            </GuideView>
        )
    }

    

    //위에 flatlist 에 따라 보여줄 아래 내용
    const myGroupScreen = () => {
        if (selectedScreenIndex == 0) {
        return (
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
        )}
    }



    return(
        <Container>

            {/* <FlatList
                data={tempData}
                keyExtractor={(item, index) => index.toString()}      
                renderItem={renderScreen}  
                horizontal={true}
            /> */}

         
            <Scroll>
                {/* <FlatList
                    data={tempData}
                    keyExtractor={(item, index) => index.toString()}      
                    renderItem={myGroupCarousel}  
                    horizontal={true}
                /> */}

                <Carousel
                    ref={(ref:any) => { groupCarouselRef = ref }}
                    data={tempData}
                    renderItem={myGroupCarousel}
                    sliderWidth={ScreenWidth}
                    itemWidth={ScreenWidth}
                    sliderHeight={groupsHeight}
                    itemHeight={groupsHeight}
                    onSnapToItem={(slideIndex) => {//화면 넘길떄마다 실행될 함수
                        console.log(slideIndex)
                        setSelectedScreenIndex(slideIndex)
                    }}
                />

                {/* 마지막 index(footer 이면 보여줄 화면) */}

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
    background-color: red;
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


export default Group;