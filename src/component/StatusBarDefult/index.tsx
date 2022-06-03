import React, {useEffect, useState} from "react";
import { StatusBar, View } from "react-native";
import CommonSetting from "../../common/CommonSetting";

interface Props {

}

const StatusBarDefult = () => {
    return(
        <StatusBar
            barStyle = {"dark-content"}
            // backgroundColor = {CommonSetting.color.background_dark}
        />
    )
}

export default StatusBarDefult;