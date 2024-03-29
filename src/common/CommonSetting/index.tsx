import { Dimensions } from "react-native";

const CommonSetting = {
    color : {
        background_light: 'white',
        background_dark: 'rgba(28, 28, 35, 1)',

        text_navy: 'rgb(54,54,79)',
        text_darkGray: 'rgb(132,131,139)',
        text_gray: '#b5b5c0',
        text_light: 'white',
        text_dark: 'black',

        borderColor: '#6d6d81',

        darkBtn: 'rgba(47,49,61,1)', //TabSecond
        lightBtn: '#3d4166', //TabSecond
        lightBtnIcon: 'rgba(61,65,117,1)', //TabSecond

        point: '#42a5f5',

        gray: 'rgba(242,242,242,1)',

        bottomTab: 'rgba(20, 20, 28, 1)',
        Tab: 'rgba(33, 33, 46, 1)',
        temp50: '#e3f2fd',
        temp100: '#bbdefb',
        temp200: '#90caf9',
        temp300: '#64b5f6',
        temp900: '#0d47a1'
    },
    btnBorderRadius: 8,
    screenPaddingHorizontal: '5%',
    screenHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('window').width,
    recordImgWidth: Dimensions.get('window').width*0.9,
    recordImgHeight: Dimensions.get('window').width*0.9*11/10,
}

export default CommonSetting;