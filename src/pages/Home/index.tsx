import React, { useContext, useEffect } from 'react';
import { 
    SafeAreaView,
    View,
    ViewStyle,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    ScrollView,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../../config';
import { moneyFormatter } from '../../utils';
import { DataContext } from '../../contexts';

//@ts-ignore 
import Logo from '../../assets/logo.png';
//@ts-ignore 
import Saldo from '../../assets/saldo.png';
//@ts-ignore 
import Despesa from '../../assets/despesa.png';
//@ts-ignore 
import Receita from '../../assets/receita.png';
//@ts-ignore 
import Extrato from '../../assets/extrato.png';

import ItemBtn from '../../components/ItemBtn';

function Home() {

    const { saldo } = useContext(DataContext);
    const navigation = useNavigation();

    if (Platform.OS === 'ios') {
        useEffect(() => {
            const focusListener = navigation.addListener('focus', () => {
                StatusBar.setBarStyle('light-content');
            });      
            return focusListener;
        },[navigation]);
    }

    return (
        <>
        
        <StatusBar barStyle="light-content" backgroundColor="#4650c7" />
        
        <SafeAreaView style={[ theme.baseContainer as ViewStyle, { justifyContent: 'space-between',  backgroundColor: "#4650c7" }]}>
            
            <View style={ styles.logoContainer }>
                <Image source={ Logo } style={{ width: 150, height: 60 }} resizeMode="cover" />
            </View>                
            
            <View style={ styles.balanceWrapper }>
                <View style={ styles.balanceContainer }>

                    <View style={ styles.balanceLabel }>
                        <View style={ styles.balanceIcon }>
                            <Image source={ Saldo } style={{ width: 17.5, height: 30 }} resizeMode="contain" />
                        </View>
                        <View style={ styles.balanceTextContainer }>
                            <Text allowFontScaling={ false } style={ styles.balanceText } >SALDO</Text>
                        </View>
                    </View>

                    <View style={ styles.amountWrapper }>
                        <View style={ styles.amountContainer }>
                            <Text allowFontScaling={ false } style={ styles.amountTextCurrency }>R$</Text>
                            <Text allowFontScaling={ false } style={ styles.amountTextValue }>
                                { moneyFormatter(saldo) }
                            </Text>
                        </View>
                    </View>

                </View>
            </View>

            <View style={ styles.btnsContainer }>

                <ScrollView
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}  
                    scrollEventThrottle={16}
                >
                    
                    <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>

                        <ItemBtn 
                            icon={ <Image source={ Receita } style={{ width: 20, height: 20 }} resizeMode="cover" /> }
                            text="Receita"
                            callbackClick={() => navigation.navigate('Receita')}
                        />

                        <ItemBtn 
                            icon={ <Image source={ Despesa } style={{ width: 20, height: 20 }} resizeMode="cover" /> }
                            text="Despesa"
                            callbackClick={() => navigation.navigate('Despesa')}
                        />

                        <ItemBtn 
                            icon={ <Image source={ Extrato } style={{ width: 20, height: 20 }} resizeMode="cover" /> }
                            text="Extrato"
                            callbackClick={() => navigation.navigate('Extrato')}
                        />

                    </View>

                </ScrollView>

            </View>
            
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    
    logoContainer: {
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    balanceWrapper: {
        paddingHorizontal: 20,
        width: '100%'
    },
    balanceContainer: {        
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#FFF",
        ...theme.shadow
    },

    balanceLabel: {
        flexDirection: 'row'
    },
    balanceIcon: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    balanceTextContainer: {
        height: 40,
        justifyContent: 'center'
    },
    balanceText: {
        fontSize: 18,
        color: theme.colors.default8,
        fontWeight: 'bold'
    },

    amountWrapper: {
        paddingVertical: 40, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    amountContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    amountTextCurrency: {
        paddingRight: 10
    },
    amountTextValue: {
        fontSize: 35, 
        fontWeight: 'bold'
    },

    btnsContainer: {
        height: 130,
        paddingBottom: 10
    }

});


export default Home;