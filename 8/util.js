function arredondar (valor) {
    return Math.round(valor*100)/100;
}
function formatMoney (value) {
    return new Intl.NumberFormat("en-us", { currency: "USD", style: "currency"}).format(value);
}