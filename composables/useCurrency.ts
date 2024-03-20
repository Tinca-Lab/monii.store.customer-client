export const useCurrency = (value: number) => {
    if (!value) {
        return '';
    }
    return new Intl.NumberFormat(['es-CO'], {
        style: 'currency',
        currency: 'COP',
    }).format(value);
}
