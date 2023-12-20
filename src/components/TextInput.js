import React, { Fragment } from 'react';
import { Form } from 'react-bootstrap';

export default function TextInput({
    onFocus = ()=>{},
    onBlur = ()=>{},
    onKeyDown = ()=>{},
    errorState = false,
    errorMessage = "",
    ...props
}) {
    return (
        <Fragment>
            <Form.Control
                {...props}
                autoComplete="off"
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
            />
            {errorState &&
                <Form.Text className="form-error">
                    {errorMessage}
                </Form.Text>}
        </Fragment>
    )
}