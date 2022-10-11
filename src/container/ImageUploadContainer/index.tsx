import React, {useRef, useState, useEffect} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, FlatList} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';
import BasicText from '../../component/BasicText';
import TitleText from "../../component/TitleText";
import ImageUpload from '../../presentational/ImageUpload';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';



const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

interface Props {
    navigation: any;
}

const ImageUploadContainer = ({navigation}: Props) => {

    const [uploadImages, setUploadImges] = useState<any[]>([]);

    const goBack = () => {
        navigation.goBack();
    }

    const imageSelector = async () => {

        let tempList :Array<any> = [];
        const result :any = [];

        await ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo'
        }).then(images => {
            images.map((item :any)=>{
                tempList.push(item.path);
            })

            setUploadImges(tempList)
        })
    }

    const moveTo = (screenName: string, value?: any) => {
        if (value) {
            navigation.navigate(screenName, value)
        } else {
            navigation.navigate(screenName)
        }
    }

  

    return (
        <ImageUpload 
            goBack={goBack}
            imageSelector={imageSelector}
            uploadImages={uploadImages}
            moveTo={moveTo}
        />
    )

}

export default ImageUploadContainer;