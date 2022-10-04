import React, {useEffect, useState} from "react";
import {View, Text, Modal, Alert, TouchableOpacity, FlatList} from "react-native";
import styled from 'styled-components/native';
import CommonSetting from '../../common/CommonSetting';


interface Props {

}

const ModalMore = ({}: Props) => {

    const [modalState, setModalState] = useState(false);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalState}
            onRequestClose={() => {
                setModalState(false)
            }}
        >
            <Text>test</Text>
        </Modal>
    )
}


export default ModalMore;