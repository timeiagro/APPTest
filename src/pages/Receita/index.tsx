import React, { useState, useContext, useEffect, useRef } from 'react';
import { 
    View,
    ViewStyle,
    ScrollView,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Dimensions,
    SafeAreaView,
    Platform,
    StatusBar
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../../config';
import { existsOrError } from '../../utils'

import { DataContext } from '../../contexts';

function Receita() {

    const { saldo, handleValor, handleReceitaDespesa } = useContext(DataContext);
    const navigation = useNavigation();
    
    const [ isDisabled, setIsdisabled ] = useState(true);
    const [ form, setForm ] = useState({
        nome: '',
        valor: '',
        data: ''
    });

    if (Platform.OS === 'ios') {
        useEffect(() => {
            const focusListener = navigation.addListener('focus', () => {
                StatusBar.setBarStyle('dark-content');
            });      
            return focusListener;
        },[navigation]);
    }

    const refSearch = useRef(true);
    useEffect(() => {        
        if (refSearch.current) { refSearch.current = false; return; }        
        
        if (
            !existsOrError(form.nome) || 
            !existsOrError(form.valor) ||
            !existsOrError(form.data)
        ) {
            setIsdisabled(true)
        } else {
            setIsdisabled(false);
        }

    },[form]);

    function handleForm(valor: object) {
        setForm({ ...form, ...valor });
    }

    function handleSubmit() {
        const valor     = form.valor.replace(/\./g, "").replace(',','.');
        const novaData  = new Date(form.data.split('/').reverse().join('-')+' 08:00:00');
        const novoValor = saldo + parseFloat(valor);
        handleValor(novoValor);
        handleReceitaDespesa({ 
            tipo: 'receita',
            nome: form.nome,
            valor,
            data: novaData        
        });
        navigation.goBack();
    }

    return (
        <SafeAreaView style={ theme.baseContainer as ViewStyle }>
            
            <ScrollView
                style={ styles.ScrollViewContent }
                scrollEventThrottle={16}                  
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ flexGrow: 1 }}
            >

                <View style={ styles.inputWrapper }>
                    <Text allowFontScaling={ false } style={ styles.inputLabel }>Nome</Text>
                    <View style={ styles.InputContainer }>
                        <TextInput 
                            value={ form.nome }
                            placeholder="Digite o nome da receita"
                            autoCapitalize="sentences"
                            autoCompleteType="off"
                            autoCorrect={ false }
                            keyboardType="default"
                            returnKeyType="done"                            
                            onChangeText={(e) => handleForm({ nome: e })}
                            autoFocus={ true }
                            style={{ flexGrow: 1 }}
                        />
                    </View>
                </View>

                <View style={ styles.inputWrapper }>
                    <Text allowFontScaling={ false } style={ styles.inputLabel }>Valor (R$)</Text>
                    <View style={ styles.InputContainer }>
                        <TextInputMask
                             type={'money'}
                             options={{
                                 precision: 2,
                                 separator: ',',
                                 delimiter: '.',
                                 unit: '',                                      
                             }}
                            value={ form.valor }
                            placeholder="Digite o valor da receita"
                            autoCapitalize="sentences"
                            autoCompleteType="off"
                            autoCorrect={ false }
                            keyboardType="phone-pad"
                            returnKeyType="done"                            
                            onChangeText={(e) => handleForm({ valor: e })}
                            style={{ flexGrow: 1 }}
                        />
                    </View>
                </View>

                <View style={ styles.inputWrapper }>
                    <Text allowFontScaling={ false } style={ styles.inputLabel }>Data</Text>
                    <View style={ styles.InputContainer }>
                        <TextInputMask
                             type={'datetime'}
                             options={{
                                 format: 'DD/MM/YYYY'
                             }}
                            value={ form.data }
                            placeholder="Digite a data da receita"
                            autoCapitalize="sentences"
                            autoCompleteType="off"
                            autoCorrect={ false }
                            keyboardType="phone-pad"
                            returnKeyType="done"                            
                            onChangeText={(e) => handleForm({ data: e })}
                            style={{ flexGrow: 1 }}
                        />
                    </View>
                </View>

                <View style={ styles.BtnWrapper }>
                    <Button 
                        onPress={ handleSubmit }
                        title="Adicionar"
                        color={ theme.colors.primary }
                        disabled={ isDisabled }                                            
                    />
                </View>
            
            </ScrollView> 

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    ScrollViewContent: {        
        flex: 1, 
        position: 'relative',         
        paddingVertical: 20, 
        zIndex: 5
    },

    inputWrapper: {      
        paddingHorizontal: 20,  
        paddingBottom: 20
    },
    inputLabel: {
        fontSize: 12,
        color: theme.colors.default8,
        paddingBottom: 5
    },
    InputContainer: {
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.borderColor
    },

    BtnWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingHorizontal: 20,
        width: Dimensions.get('window').width,        
    }

});

export default Receita;