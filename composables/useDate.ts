export const useDate = (date: string | Date) => {
    // format date
    return new Date(date).toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

}
