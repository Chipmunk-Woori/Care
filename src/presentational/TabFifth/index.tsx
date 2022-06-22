import React from "react";
import {View, Text, Dimensions} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import TopTitle from '../../component/TopTitle';
import BasicText from "../../component/BasicText";
import TitleText from "../../component/TitleText";

interface Props {

}

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;


const TabFifth = () => {

    const MyInfoBtnContents = [
        {
            title : '습관 알림',
            icon : require('../../assets/bell.png'),
            detail : '만들기' 
        },
        {
            title : '내 목표',
            icon : require('../../assets/flag.png'),
            detail : '세우기' 
        }
    ]

    const MyInfoBtn = (item: any) => {
        return(
            <DietBtnView>
                <RowView>
                    <DietBtnIconView>
                        <DietBtnIcon
                            source={item.icon}
                        />
                    </DietBtnIconView>
                    
                    <View>
                        <DietDetailText>
                            {item.title}
                        </DietDetailText>
                        <BasicText>
                            {item.detail}
                        </BasicText>
                    </View>
                </RowView>

                <NextIcon
                    source={require('../../assets/next.png')} 
                />
            </DietBtnView>
        )
    }

    const MyInfoView = () => {

        let temp = MyInfoBtnContents.map((item) => {
            return(
                MyInfoBtn(item)
            )
        })

        return temp;
    }

    return(
        <Container style={{paddingHorizontal: CommonSetting.screenPaddingHorizontal}}>
            <PaddingView>
                <TopTitle
                    title = {'마이페이지'}
                    icon = {[{
                        img: require('../../assets/setting.png'),
                        func: () => {}
                    }]}
                />
                
                <MyInfo>
                    <NicknameView>
                        <NicknameHeadView>
                            <NicknameHead>

                            </NicknameHead>
                        </NicknameHeadView>
                        <Nickname>
                            <View>
                                <NicknameText>
                                    맛밤
                                </NicknameText>
                                <MgText>
                                    30mg
                                </MgText>
                            </View>
                            <NextImg
                                source={require('../../assets/next_dark.png')}
                            />
                        </Nickname>
                    </NicknameView>

                    <ReportDays>
                        <ReportDaysTitle>
                            연속 기록
                        </ReportDaysTitle>
                        <ReportDaysDay>
                            1일
                        </ReportDaysDay>
                    </ReportDays>
                </MyInfo>

                <MyInfoBtnView>
                    {MyInfoView()}
                </MyInfoBtnView>

                <MarginView/>


                <ReportView>
                    <TitleText>
                        주간 리포트
                    </TitleText>

                    <ReportBtn>
                        <RowView style = {{alignItems:'center'}}>
                            <ReportBtnIconView>
                                <DietBtnIcon
                                    source={require('../../assets/report.png')}
                                />
                            </ReportBtnIconView>
                            
                            <View style = {{marginLeft:10}}>
                                <BasicText>
                                    6월 2주차 밀:포트
                                </BasicText>
                                <ReportText>
                                    2022.06.06 - 12
                                </ReportText>
                            </View>
                        </RowView>

                        <Next>
                            <NextText>
                                보기
                            </NextText>
                        </Next>
                    </ReportBtn>
                </ReportView>

                <StatsView>
                    <StatsTitleView>
                        <View>
                            <TitleText>
                                통계
                            </TitleText>
                            <SubText>
                                최근 7일 체중(kg)
                            </SubText>
                        </View>

                        <RowTouch>
                            <NextText>
                                자세히
                            </NextText>
                            <NextIcon
                                source={require('../../assets/next.png')} 
                            />
                        </RowTouch>
                    </StatsTitleView>
                </StatsView>

            </PaddingView>
        </Container>
    )
}

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
const RowTouch = styled.TouchableOpacity`
    flex-direction: row;
`
const DietBtnView = styled.TouchableOpacity`
    background-color: rgba(47,49,61,1);
    border-radius: ${CommonSetting.btnBorderRadius}px;
    height: 65px;
    width: 49%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 3px;
    padding-bottom: 3px;
`
const DietBtnIconView = styled.View`
    width: 30px;
    height: 30px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
`
const DietBtnIcon = styled.Image`
    width: 22px;
    height: 22px;
`
const DietDetailText = styled.Text`
    color: #dadada;
    font-size: 13px;
    margin-bottom: 5px;
`
const NextIcon = styled.Image`
    width: 15px;
    height: 15px;
`
const Next = styled.TouchableOpacity`
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    background-color: rgb(12, 11, 18);
    border-color: rgb(62,64,77);
`
const NextText = styled.Text`
    color: white;
    font-size: 13px;
    font-weight: 800;
`
const MyInfoBtnView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 25px;
    margin-bottom: 20px;
`
const MarginView = styled.View`
    height: 15px;
    width: 100%;
    background-color: rgb(12, 11, 18);
`
const ReportBtn = styled.TouchableOpacity`
    background-color: rgba(47,49,61,1);
    border-radius: ${CommonSetting.btnBorderRadius}px;
    height: 70px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 20px;
`
const ReportView = styled.View`
    padding-bottom: 20px;
    border-bottom-color: ${CommonSetting.color.borderColor};
    border-bottom-width: 1px;
    margin-top: 30px;
`
const ReportBtnIconView = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    background-color: rgba(90,103,245,1);
`
const ReportText = styled.Text`
    color: #dadada;
    font-size: 13px;
    margin-top: 5px;
`
const StatsTitleView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const StatsView = styled.View`
    margin-top: 20px;
`
const SubText = styled.Text`
    font-size: 12px;
    color: ${CommonSetting.color.gray};
    margin-Top: 5px;
`
const MyInfo = styled.TouchableOpacity`
    width: 100%;
    height: ${ScreenHeight*0.21}px;
    background-color: rgb(232,233,250);
    border-radius: ${CommonSetting.btnBorderRadius}px;
    margin-top: 13px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    justify-content: space-between;
`
const NicknameView = styled.View`
    width: 100%;
    height: 50%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`
const NicknameHeadView = styled.View`
    width: 22%;
`
const NicknameHead = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    margin-right: 13px;
    background-color: white;
`
const Nickname = styled.View`
    width: 78%;
    height: 100%;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding-right: 8px;
`
const NicknameText = styled.Text`
    color: rgb(48,50,68);
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
`
const MgText = styled.Text`
    color: rgb(151,151,170);
    font-size: 15px;
    font-weight: 500;
`
const ReportDays = styled.View`
    width: 100%;
    height: 45%;
    align-items: center;
    background-color: white;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    align-items: center;
    justify-content: center;
`
const ReportDaysTitle = styled.Text`
    color: rgb(151,151,170);
    font-size: 15px;
    margin-bottom: 5px;
`
const ReportDaysDay = styled.Text`
    color: rgb(48,50,68);
    font-size: 20px;
    font-weight: 600;
`
const NextImg = styled.Image`
    width: 13px;
    height: 13px;
`


export default TabFifth;