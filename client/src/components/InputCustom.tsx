import React from 'react'
import { Input } from 'formik-antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
function InputCustomComp({
    title = '',
    handleChange,
    values,
    errors,
    touched,
    name
}) {
    return (
        <div>
            <span>{title}</span>
            <Input
                name={name}
                value={values}
                onChange={handleChange}
                className={`form-product 
                ${errors
                    && touched
                    && 'errors'}`}
            />
            {
                errors
                && touched && (
                    <span className="errors">
                        <ExclamationCircleOutlined />
                        &#160; {errors}
                    </span>
                )
            }
        </div>
    )
}

export const InputCustom = React.memo(InputCustomComp)
