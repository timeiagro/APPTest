const moneyFormatter = (valor: number) => { 
    // eslint-disable-next-line
    return valor.toFixed(2).replace('.',',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
};

const existsOrError = (value) => {
    if(!value) return false;
    if(Array.isArray(value) && value.length === 0) return false;
    if(typeof value === 'string' && !value.trim()) return false;

    return true;
}

export {
    moneyFormatter,
    existsOrError
}