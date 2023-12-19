import React from 'react';
import { Toast } from 'react-bootstrap';
import { CiCircleCheck, CiWarning } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi"

export default function Alert({
    showToast,
    setShowToast,
    error
}) {
    const errorToast = error ? " error-toast" : ""
    return (
        <Toast
            className={"cust-toast box rounded-0 border-0 position-absolute mt-3" + errorToast}
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={5000}
            autohide>
            <div className="toast-div d-flex">
                <Toast.Body className="p-3">
                    <div className="d-flex m-0">
                        <div>
                            {error
                                ? <CiWarning color="#E91630" fontSize="22px" />
                                : <CiCircleCheck color="#28411F" fontSize="22px" />}
                        </div>
                        <div className="ms-2">
                            {error
                                ? <span>Oops, Something went wrong. Please try again.</span>
                                : <span>Item added to shopping cart!</span>}
                        </div>
                    </div>
                </Toast.Body>
                <button type="button" className="btn cart-toast me-2 m-auto" data-bs-dismiss="toast">
                    <TfiClose color={error ? "#E91630" : "#28411F"} fontSize="14px" />
                </button>
            </div>
        </Toast>
    )
}