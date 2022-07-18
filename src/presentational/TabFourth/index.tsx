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

                <VideoView>

                </VideoView>

                <VideoInfoView>
                    <VideoTimeView>
                        <VideoTime>
                            13
                        </VideoTime>
                        <VideoMinut>
                            분
                        </VideoMinut>
                    </VideoTimeView>

                    <VideoTitleView>
                        <VideoTitle>
                            다이어트 스트레칭 챌린지
                        </VideoTitle>
                        <VideoSubTitle>
                            스트레칭 / 하체, 전신
                        </VideoSubTitle>
                    </VideoTitleView>
                </VideoInfoView>


                <ChallengeCompleteView>
                    <RowBetween>
                        <ChallengeComplete>
                            도전 완료 20 🔥
                        </ChallengeComplete>
                        <MoreView>
                            <More>
                                모두 보기
                            </More>
                            <MoreImg
                                source={require('../../assets/next.png')}
                            />     
                        </MoreView>

                    </RowBetween>
                    <ChallengeInfoView>

                    </ChallengeInfoView>
                </ChallengeCompleteView>


                <QuestionView>
                    <BasicText>
                        오늘의 운동은 무슨 기능인가요?
                    </BasicText>
                    <LineView/>

                    <RowView>
                        <CheckImg
                            source={require('../../assets/check_white.png')}
                        />
                        <AnswerView>
                            <AnswerText>
                                '오늘 운동 뭐하지' 고민할 시간에 바로 시작할 수 있도록
                                매일 새로운 운동을 보내드리는 기능이에요! {'\n'}
                                오늘의 운동은 딱 24시간 동안만 공개되어요 ⏰
                            </AnswerText>
                        </AnswerView>
                    </RowView>
                </QuestionView>


                <QuestionView>
                    <BasicText>
                        오늘의 운동은 어떻게 추천되나요?
                    </BasicText>
                    <LineView/>

                    <RowView>
                        <CheckImg
                            source={require('../../assets/check_white.png')}
                        />
                        <AnswerView>
                            <AnswerText>
                                초보 다이어터도 함께 할 수 있는 초급에서 중급 난이도로
                                매일 20분 내외의 운동을 추천합니다.{'\n'}
                                유산소/무산소, 부위별, 요일 등의 기준에 따라 여러 크리에이터들의
                                운동 영상을 엄선하고 있어요 🔍
                            </AnswerText>
                        </AnswerView>
                    </RowView>
                </QuestionView>


                <QuestionView>
                    <BasicText>
                        오늘의 운동 인증하고, 후기도 남겨봐요!
                    </BasicText>
                    <LineView/>

                    <RowView>
                        <CheckImg
                            source={require('../../assets/check_white.png')}
                        />
                        <AnswerView>
                            <AnswerText>
                                '도전 완료' 버튼을 누르고 인증 스탬프를 모아보세요.{'\n'}
                                오늘 운동은 어땠는지 한 줄 평을 남기고 다른 유저들의 후기를 참고해봐도 좋겠죠?{'\n'}
                                그러면 오늘부터 오늘의 운동으로 1일 1운동 시작 🔥
                            </AnswerText>
                        </AnswerView>
                    </RowView>
                </QuestionView>


                <QuestionView>
                    <BasicText>
                        ⚠️ 주의사항
                    </BasicText>
                    <LineView/>

                    <RowView>
                        <CheckImg
                            source={require('../../assets/check_white.png')}
                        />
                        <AnswerView>
                            <AnswerText>
                                '도전하기'로 운동하고 나서 이 페이지로 다시 돌아와{'\n'}
                                '도전 완료' 버튼을 눌러야 내가 한 운동이 저장돼요!
                            </AnswerText>
                        </AnswerView>
                    </RowView>
                </QuestionView>

                <MarginBottom />
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
const VideoView = styled.View`
    width: 100%;
    height: 200px;
    border-top-left-radius: ${CommonSetting.btnBorderRadius}px;
    border-top-right-radius: ${CommonSetting.btnBorderRadius}px;
    background-color: blanchedalmond;
`
const VideoInfoView = styled.View`
    flex-direction: row;
    width: 100%;
    height: 80px;
    border-bottom-left-radius: ${CommonSetting.btnBorderRadius}px;
    border-bottom-right-radius: ${CommonSetting.btnBorderRadius}px;
    background-color: ${CommonSetting.color.darkBtn};
    margin-top: 5px;
    align-items: center;
    justify-content: center;
`
const VideoTimeView = styled.View`
    width: 18%;
    height: 50px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    background-color: ${CommonSetting.color.background_dark};
    align-items: center;
    justify-content: center;
    flex-direction: row;
`
const VideoTime = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: bold;
`
const VideoMinut = styled.Text`
    color: ${CommonSetting.color.gray};
    font-size: 13px;
    margin-left: 2px;
`
const VideoTitleView = styled.View`
    width: 67%;
    height: 50px;
    margin-left: 20px;
`
const VideoTitle = styled.Text`
    color: #e9e9e9;
    font-size: 15px;
    margin-bottom: 5px;
`
const VideoSubTitle = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`
const ChallengeComplete = styled.Text`
    color: white;
    font-size: 15px;
    margin-bottom: 5px;
`
const ChallengeCompleteView = styled.View`
    margin-top: 30px;
    margin-bottom: 30px;
`
const RowBetween = styled.View`
    flex-direction: row;
    justify-content: space-between;
`
const More = styled.Text`
    color: ${CommonSetting.color.gray};
    font-size: 13px;
`
const MoreImg = styled.Image`
    width: 13px;
    height: 13px;
`
const MoreView = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    flex-direction: row;
`
const ChallengeInfoView = styled.View`
    flex-direction: row;
    width: 100%;
    height: 60px;
    border-radius: ${CommonSetting.btnBorderRadius}px;
    background-color: ${CommonSetting.color.darkBtn};
    margin-top: 10px;
    align-items: center;
    justify-content: center;
`
const QuestionView = styled.View`
    margin-top: 20px;
    margin-bottom: 23px;
`
const LineView = styled.View`
    width: 100%;
    height: 0.5px;
    background-color: ${CommonSetting.color.borderColor};
    margin-top: 15px;
    margin-bottom: 15px;
`
const AnswerText = styled.Text`
    color: rgb(143, 143, 167);
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
`
const CheckImg = styled.Image`
    width: 13px;
    height: 13px;
`
const AnswerView = styled.View`
    margin-left: 10px;
    padding-right: 12px;
`
const MarginBottom = styled.View`
    height: 60px;
    width: 100%
`