import Vue from 'vue'

Vue.filter('capitalize', function(value: string) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('currencyFormatRu', (value: number) => {
    value = Number(value)
    if (value === 0) {
        return '0 ₽'
    } else {
        return (
            value
                .toFixed(2) // always to decimals digits at the end
                .replace('.', ',') // replace decimal point to ,
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ₽' // use ' ' as separator
        )
    }
})
