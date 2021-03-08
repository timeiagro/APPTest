import React, { useState, useEffect } from 'react';
import { 
    View,
    Animated,
    Easing
} from 'react-native';

interface ItemSkeletonProps {
    width?: number | string, 
    height?: number | string,
    mt?: number, 
    mb?: number, 
    ml?: number, 
    mr?: number, 
    pt?: number, 
    pb?: number, 
    pl?: number, 
    pr?: number, 
    br?: number, 
}

export default function ItemSkeleton(props: ItemSkeletonProps) {

    const [ opacityAnimation, setOpacityAnimation ] = useState(new Animated.Value(1)); 

    useEffect(() => {
        animation();
    },[])

    function animation() {
        const animacao = 
        Animated.sequence([
            Animated.timing( 
                opacityAnimation,
                { 
                    toValue: 0.6,
                    //easing: Easing.in, 
                    duration: 500, 
                    useNativeDriver: true               
                }
            ),
            Animated.timing( 
                opacityAnimation,
                { 
                    toValue: 1,
                    //easing: Easing.in, 
                    duration: 500, 
                    useNativeDriver: true               
                }
            )
        ]);

        Animated.loop(
            animacao,
            {
              iterations: -1
            }
          ).start();
    }

    return (
        <View style={{ 
            width: props.width ? props.width : '100%', 
            height: props.height ? props.height : '100%', 
            marginTop: props.mt ? props.mt : 0, 
            marginBottom: props.mb ? props.mb : 0, 
            marginLeft: props.ml ? props.ml : 0,
            marginRight: props.mr ? props.mr : 0,
            paddingTop: props.pt ? props.pt : 0,
            paddingBottom: props.pb ? props.pb : 0,
            paddingLeft: props.pl ? props.pl : 0,
            paddingRight: props.pr ? props.pr : 0,
            borderRadius: props.br ? props.br : 0,
            overflow: 'hidden'
        }}>
            <Animated.View style={{ width: '100%', height: '100%', backgroundColor: '#dadada', opacity: opacityAnimation }} />
            
        </View>
    );
}