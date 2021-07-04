const calculateTips = (total, tipPercent) =>   total + (total * tipPercent);

const fahrenheitToCensius = (temp) => (temp - 32) / 1.8;

const censiusToFahrenheit = (temp) => (temp * 1.8) + 32;

module.exports = {
    calculateTips,
    fahrenheitToCensius,
    censiusToFahrenheit
}