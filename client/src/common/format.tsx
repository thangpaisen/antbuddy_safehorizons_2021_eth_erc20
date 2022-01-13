import moment from 'moment';
import React from 'react'
import NumberFormat from 'react-number-format';

export const formatCurrency = (value:number) => {
    if (value === 0) return `0 VND`
    return (
        <NumberFormat
            value={value}
            prefix={'VND'}
            displayType={'text'}
            thousandSeparator={true}
            renderText={formattedValue => <span>{formattedValue.slice(3,)} đ</span>}
        />
    )
}