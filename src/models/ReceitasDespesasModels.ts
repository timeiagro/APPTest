interface ReceitaDespesaProps {
    tipo: 'despesa' | 'receita',
    nome: string,
    valor: string,
    data: Date
}

export {
    ReceitaDespesaProps
}