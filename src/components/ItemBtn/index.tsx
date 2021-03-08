import React, { ReactNode } from 'react';
import { 
    TouchableWithoutFeedback,
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

interface CompProps {
    icon: ReactNode,
    text: string,
    callbackClick:() => void
}

const { width } = Dimensions.get('window');

function ItemBtn(props: CompProps) {

    function handleClick() {
        props.callbackClick();
    }

    return (
        <View style={ styles.btnWrapper }>
            <TouchableWithoutFeedback onPress={ handleClick }>
                <View style={ styles.btnContainer }>
                    { props.icon }
                    <Text allowFontScaling={ false } style={ styles.btnText }>{ props.text }</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({

    btnWrapper: {
        paddingHorizontal: 5
    },
    btnContainer: {
        //width: 120,
        width: ((width / 3) - 10) - 10,
        height: 120,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 4
    },

    btnText: {
        color: '#FFF',
        fontSize: 15
    }

});

export default ItemBtn;