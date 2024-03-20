export default function useDiscount(price: number, discount: number) {
    const value = price - (price * discount / 100);
    return useCurrency(value);
}
