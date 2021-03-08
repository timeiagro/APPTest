import React from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

import { theme } from '../../config';
import { moneyFormatter } from '../../utils';

import ItemSkeleton from '../ItemSkeleton';

interface CompProps {
    tipo?: string
    nome?: string,
    valor?: string,
    data?: Date,
    skeleton?: boolean 
}

function ItemList(props: CompProps) {
    return (
        <View style={ styles.itemListWrapper }>
            
            <View style={ styles.itemListContainer }>
            
                
                <View style={ styles.itemListLabelDesc }>
                
                    <View style={ styles.itemListLabelContainer }>
                        { props.skeleton ? (
                            <ItemSkeleton width={ 40 } height={ 12 } />
                        ) : (
                            <>
                                <Text allowFontScaling={ false } style={ styles.itemListLabelData }>{ `${ props.data.getDate() <= 9 ? `0${props.data.getDate()}` : props.data.getDate() }/${ (props.data.getMonth() + 1) <= 9 ? `0${(props.data.getMonth() + 1)}` : props.data.getMonth() + 1 }/${ props.data.getFullYear() }` }</Text>                                
                            </>
                        ) }                
                    </View>            

                    <View style={ styles.itemListDescContainer }>
                        { props.skeleton ? (
                            <ItemSkeleton width='50%' height={ 15 } />
                        ) : (
                            <Text allowFontScaling={ false } numberOfLines={2} style={[ styles.itemListDesc, { color: props.tipo === 'receita' ? theme.colors.receita : theme.colors.despesa }]}>{ props.nome }</Text>
                        )}                    
                    </View>

                </View>

                <View style={ styles.itemListValorContainer }>
                    { props.skeleton ? (
                        <ItemSkeleton width={ 40 } height={ 15 } /> 
                    ) : (
                        <Text allowFontScaling={ false } style={[ styles.itemListValor, { color: props.tipo === 'receita' ? theme.colors.receita : theme.colors.despesa }]}>{ props.tipo === 'receita' ? '+ ' : '- ' } R$ { moneyFormatter(Number(props.valor)) }</Text>
                    )}                    
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    itemListWrapper: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.borderColor
    },

    itemListContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5
    },

    itemListLabelDesc: {
        flexGrow: 1
    },

    itemListLabelContainer: {
        flexDirection: 'row',
        paddingBottom: 2
    },

    itemListLabelData: {
        fontSize: 12,
        color: theme.colors.default6
    },

    itemListLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase' 
    },

    

    itemListDescContainer: {
        flexDirection: 'row',
        flexGrow: 1
    },

    itemListDesc: {
        fontSize: 15,        
        flex: 1, 
        flexWrap: 'wrap',
        fontWeight: 'bold'
    },

    itemListValorContainer: {
        width: 120,
        alignItems: 'flex-end'
    },

    itemListValor: {
        fontSize: 14,
        fontWeight: 'bold'
    }

});

export default ItemList;