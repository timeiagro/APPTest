import React, {  
    useState,
    ReactNode,
    createContext
} from 'react';

import { ReceitaDespesaProps } from '../models/ReceitasDespesasModels';

interface CompProps {
    children: ReactNode
}

interface DataContextInterface {
    saldo: number,
    receitasDespesas: Array<ReceitaDespesaProps>,
    handleValor:(valor: number) => void,
    handleReceitaDespesa:(valores: ReceitaDespesaProps) => void
}

const DataContext = createContext({} as DataContextInterface);

function DataProvider(props: CompProps){    

    const [ saldo, setSaldo ] = useState(0);
    const [ receitasDespesas, setReceitasDespesas ] = useState<ReceitaDespesaProps[]>([]);

    function handleValor(valor: number) {
        setSaldo(valor);
    }

    function handleReceitaDespesa(valores: ReceitaDespesaProps) {
        const novoValor = [ valores ];
        //@ts-ignore 
        setReceitasDespesas([ ...receitasDespesas, ...novoValor ])
    }

    return (
        <DataContext.Provider value={{ 
            saldo, 
            receitasDespesas,
            handleValor,
            handleReceitaDespesa
        }}>
            
            { props.children }

        </DataContext.Provider>        
    )

}

export {
    DataContext,
    DataProvider
}