import React, {useRef, useState, useEffect} from "react";
import {View, Text, Modal, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Dimensions, Image, FlatList, StyleSheet} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import ImageUploadBody from "../ImageUploadBody";
import ImageUploadDiet from "../ImageUploadDiet";
import ImageUploadExercise from "../ImageUploadExercise";
import ImageUploadWater from "../ImageUploadWater";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;


interface Props {
    goBack: () => any;
    imageSelector: () => any;
    uploadImages: any;
}


const ImageUpload = ({goBack, imageSelector, uploadImages}: Props) => {

    const [optionState, setOptionState] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const Images = () => {
        if (uploadImages.length > 0) {
            let result = uploadImages.map((item :any, index :number) => {
                return (
                    <UploadImg
                        source={{uri: item}}
                        key={index.toString()}
                    />
                )
            })

            return result
        }
    }

    const closeOption = () => {
        setOptionState(false);
    }

    const option = () => {
        
        if (selectedOption === '식단') {

            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={optionState}
                    onRequestClose={() => {
                        setOptionState(false)
                    }}
                >
                    <ImageUploadDiet closeOption={closeOption} goBack={goBack}/>
                </Modal>
            )
        } else if (selectedOption === '신체') {

            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={optionState}
                    onRequestClose={() => {
                        setOptionState(false)
                    }}
                >
                    <ImageUploadBody closeOption={closeOption} goBack={goBack}/>
                </Modal>
            )
        } else if (selectedOption === '운동') {

            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={optionState}
                    onRequestClose={() => {
                        setOptionState(false)
                    }}
                >
                    <ImageUploadExercise closeOption={closeOption} goBack={goBack}/>
                </Modal>
            )
        } else if (selectedOption === '물') {

            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={optionState}
                    onRequestClose={() => {
                        setOptionState(false)
                    }}
                >
                    <ImageUploadWater closeOption={closeOption} goBack={goBack}/>
                </Modal>
            )
        }
        
    }



    return(
        <Container>
       
            <BlurView
                style={styles.absolute}
                blurType="dark"
                blurAmount={20}
                reducedTransparencyFallbackColor="white"
            >
                <BottomView>

                    <RowView>
                        <CategoryView
                            onPress={() => {
                                setSelectedOption('식단');
                                setOptionState(true);
                            }}
                        >
                            <IconView>
                                <Icon>
                                    🍽
                                </Icon>
                            </IconView>
                            <CategoryText>
                                식단
                            </CategoryText>
                        </CategoryView>

                        <CategoryView
                            onPress={() => {
                                setSelectedOption('신체');
                                setOptionState(true);
                            }}
                        >
                            <IconView>
                                <Icon>
                                    🧍🏼‍♀️
                                </Icon>
                            </IconView>
                            <CategoryText>
                                신체
                            </CategoryText>
                        </CategoryView>

                        <CategoryView
                            onPress={() => {
                                setSelectedOption('운동');
                                setOptionState(true);
                            }}
                        >
                            <IconView>
                                <Icon>
                                    🔥
                                </Icon>
                            </IconView>
                            <CategoryText>
                                운동
                            </CategoryText>
                        </CategoryView>

                        <CategoryView
                            onPress={() => {
                                setSelectedOption('물');
                                setOptionState(true);
                            }}
                        >
                            <IconView>
                                <Icon>
                                    💧
                                </Icon>
                            </IconView>
                            <CategoryText>
                                물
                            </CategoryText>
                        </CategoryView>
                    </RowView>



                    <CloseBtnView
                        onPress={()=>{goBack()}}
                    >
                        <CloseBtn
                            source={require('../../assets/TabThird_sel.png')}
                        />
                    </CloseBtnView>
                </BottomView>

                {option()}
            </BlurView>
            

        </Container>

    )
}

const Container = styled.SafeAreaView`
    width: ${ScreenWidth}px;
    height: ${ScreenHeight}px;
`
const RowView = styled.View`
    flex-direction: row;
    width: ${ScreenWidth*0.22*4}px;
    justify-content: space-between;
    margin-top: 26px;
    /* background-color: aqua; */
`
const UploadImg = styled.Image`
    width: 200px;
    height: 200px;
`
const BottomView = styled.SafeAreaView`
    width: ${ScreenWidth}px;
    height: 200px;
    background-color: ${CommonSetting.color.darkBtn};
    align-items: center;
    position: absolute;
    bottom: 0px;
`
const CloseBtnView = styled.TouchableOpacity`
    position: absolute;
    bottom: 42px;
`
const CloseBtn = styled.Image`
    width: 25px;
    height: 25px;
`
const CategoryView = styled.TouchableOpacity`
    width: ${ScreenWidth*0.18}px;
    height: ${ScreenWidth*0.18}px;
    align-items: center;
    justify-content: center;
    /* background-color: orange; */
`
const IconView = styled.View`
    width: ${ScreenWidth*0.11}px;
    height: ${ScreenWidth*0.11}px;
    border-radius: 50px;
    border-color: ${CommonSetting.color.borderColor};
    border-width: 1px;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`
const Icon = styled.Text`
    font-size: 22px;
`
const CategoryText = styled.Text`
    font-size: 16px;
    color: white;
`


const styles = StyleSheet.create({
    absolute : {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: ScreenHeight,
        width: ScreenWidth
    }
})

export default ImageUpload;


