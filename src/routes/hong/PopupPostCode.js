import React from 'react';
import DaumPostcode from 'react-daum-postcode';

function PopupPostCode({ onClose, changeAddress }) {
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress +=
                    extraAddress !== ''
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? `(${extraAddress})` : '';
        }
        changeAddress(data.zonecode, fullAddress);
        onClose();
    };

    const postCodeStyle = {
        dysplay: 'block',
        top: '10%',
        width: '600px',
        height: '600px',
        padding: '7px',
        margin: 'auto',
    };

    return (
        <div className="absolute shadow-2xl bg-white w-4/12 p-6 text-right z-100 -translate-x-100 -translate-y-100">
            <button
                type="button"
                className="px-4 py-2 tracking-wide bg-gray-700 rounded-lg text-gray-200 absolute z-100 -translate-x-4 -translate-y-8 w-20 shadow-lg duration-150 hover:duration-150 hover:bg-gray-800"
                onClick={onClose}
            >
                닫기
            </button>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
        </div>
    );
}

export default PopupPostCode;
