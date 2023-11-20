import React, { Fragment } from 'react';
import { Form } from 'react-bootstrap';

export default function TextInput({
    type, name, value, onChange, className, placeholder, errorState, errorMessage
}) {
    return (
        <Fragment>
            <Form.Control
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={className}
                placeholder={placeholder}
                autoComplete="off"
            />
            {errorState &&
                <Form.Text className="form-error">
                    {errorMessage}
                </Form.Text>}
        </Fragment>
    )
}