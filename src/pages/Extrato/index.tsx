import React, { useState, useEffect, useContext } from 'react';
import { 
    View,
    ViewStyle,
    Text,
    ScrollView,
    FlatList,
    Platform,
    StatusBar,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ReceitaDespesaProps } from '../../models/ReceitasDespesasModels'
import { theme } from '../../config';

import { DataContext } from '../../contexts'

import ItemList from '../../components/ItemList';

function Extract() {

    const navigation = useNavigation();
    const { receitasDespesas } = useContext(DataContext);

    const [ itens, setItens ] = useState<ReceitaDespesaProps[]>();

    if (Platform.OS === 'ios') {
        useEffect(() => {
            const focusListener = navigation.addListener('focus', () => {
                StatusBar.setBarStyle('dark-content');
            });      
            return focusListener;
        },[navigation]);
    }

    useEffect(() => {
        setTimeout(() => { 
            orderDesc();            
        },1000);
    },[]);

    function orderDesc() {
        const newArr = receitasDespesas.sort((a: ReceitaDespesaProps, b: ReceitaDespesaProps): number => {
            return (a.data < b.data) ? 1 : -1;
        })
        setItens(newArr);
        
    }

    if(!itens) {
        return (
            <View style={ theme.baseContainer as ViewStyle }>
                
                <ScrollView
                        style={{ flex: 1, position: 'relative', paddingVertical: 15, zIndex: 5 }}
                        scrollEventThrottle={16}                 
                        keyboardShouldPersistTaps="always"        
                >
                    
                    <View style={{ height: 10 }} />

                    <ItemList skeleton={ true } />
                    <ItemList skeleton={ true } />
                
                </ScrollView> 
    
            </View>
        );
    }

    return (
        <View style={ theme.baseContainer as ViewStyle }>
            
            <FlatList                
                data={ receitasDespesas ? receitasDespesas : [] }
                style={[ styles.scrollArea, { paddingVertical: 15 }]}                
                ListHeaderComponent={(
                   <View style={{ height: 10 }} />
                )}
                renderItem={({item, index}) => {
                    return (                                    
                        <ItemList 
                            tipo={ item.tipo }
                            nome={ item.nome }
                            valor={ item.valor }
                            data={ item.data } 
                        />                                
                    )
                }}
                ListFooterComponent={(
                    <View style={{ height: 60 }} />
                )}
                ListEmptyComponent={(
                    <View style={ styles.listEmptyComponent }>
                        <Text allowFontScaling={ false } style={ styles.listEmptyComponentText }>
                            Nenhuma movimentação
                        </Text> 
                    </View>
                )}
                keyExtractor={(item, index) => {  return `key-${index}` }}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    scrollArea: {
        flexGrow: 1, 
        position: 'relative', 
        zIndex: 5,
        paddingVertical: 15
    },

    listEmptyComponent: {
        paddingVertical: 60, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    listEmptyComponentText: {
        fontSize: 14, 
        textAlign: 'center', 
        color: theme.colors.default4
    },

});

export default Extract;