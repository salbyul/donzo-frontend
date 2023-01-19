import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import PopupDom from '../../components/hong/PopupDom';
import PopupPostCode from '../hong/PopupPostCode';

function GroupModify() {
    const [organizationId, setOrganizationId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [address, setAddress] = useState('');
    const [account, setAccount] = useState('');
    const [bank, setBank] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [image, setImage] = useState('');
    const [imageSrc, setImageSrc] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);

    const [validation, setValidation] = useState(true);
    const [isNull, setIsNull] = useState(false);
    const [phoneNumberValidation, setPhoneNumberValidation] = useState(true);
    const [emailValidation, setEmailValidation] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [changeImage, setChangeImage] = useState(false);
    const location = useLocation();

    //쿠키
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'target']);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (
            cookies.token === '' ||
            cookies.token === undefined ||
            cookies.token === null ||
            cookies.target === null ||
            cookies.target === '' ||
            cookies.target === undefined
        ) {
            window.location.href = `/login?re=${location.pathname}`;
        }
        if (cookies.target !== 'organization') {
            alert('잘못된 접근입니다.');
            window.location.href = '/';
        }
        setToken(cookies.token);
    }, []);

    //수정페이지에 뿌려지는 정보들
    useEffect(() => {
        if (token !== null && token !== '' && token !== undefined) {
            axios
                .get('http://localhost:8080/organization/group/get', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log(response);
                    setOrganizationId(response.data.organization_id);
                    setNickname(response.data.nickname);
                    setPassword(response.data.password);
                    setEmail(response.data.email);
                    setPhoneNumber(response.data.phone_number);
                    setZipcode(response.data.zipcode);
                    setAddress(response.data.address);
                    setAccount(response.data.account);
                    setBank(response.data.bank);
                    setIntroduction(response.data.introduction);
                    setImageSrc(response.data.image);
                    setImageLoading(true);
                })
                .catch((error) => {});
        }
    }, [token]);

    useEffect(() => {
        checkPassword();
    }, [passwordCheck]);

    useEffect(() => {
        checkPassword();
    }, [password]);

    const onModifyClick = () => {
        setIsNull(false);
        if (!nullCheck()) {
            setIsNull(true);
            return;
        }
        if (!validateEmail()) {
            return;
        }
        setEmailValidation(true);
        if (!phoneNumberCheck()) {
            return;
        }
        if (!validation) {
            return;
        }

        const formData = new FormData();
        const reader = new FileReader();
        const organization = {
            organization_id: organizationId,
            password: password,
            email: email,
            nickname: nickname,
            phone_number: phoneNumber,
            introduction: introduction,
            zipcode: zipcode,
            address: address,
            account: account,
            bank: bank,
        };
        const json = JSON.stringify(organization);
        const blob = new Blob([json], { type: 'application/json' });
        formData.append('organization', blob);
        formData.append('image_name', image);

        axios
            .post('http://localhost:8080/organization/modify', formData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                alert('수정되었습니다!');
                window.history.back();
            })
            .catch((error) => {
                const code = error.response.data.code;
                if (code === 'O002') {
                    alert('중복된 닉네임입니다.');
                } else if (code === 'O003') {
                    alert('잘못된 접근입니다.');
                }
            });
    };

    const onCancelClick = () => {
        window.history.back();
    };
    const onNicknameChange = (e) => {
        setNickname(e.target.value);
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const onPasswordCheckChange = (e) => {
        setPasswordCheck(e.target.value);
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onPhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };
    const onAddressChange = (e) => {
        setAddress(e.target.value);
    };
    const onZipCodeChange = (e) => {
        setZipcode(e.target.value);
    };
    const onBankChange = (e) => {
        setBank(e.target.value);
    };
    const onAccountChange = (e) => {
        setAccount(e.target.value);
    };
    const onIntroductionChange = (e) => {
        setIntroduction(e.target.value);
    };

    const onImageChange = (e) => {
        setChangeImage(true);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        if (e.target.files[0].size > 0.1 * 1024 * 1000) {
            alert('사진 용량이 커서 업로드할 수 없습니다');
            return;
        } else {
            setImage(e.target.files[0]);
            reader.onloadend = () => {
                setImageSrc(reader.result);
                setImageLoading(true);
            };
        }
    };

    const checkPassword = () => {
        if (password === '' && passwordCheck === '') {
            setValidation(true);
            return;
        }
        if (password !== passwordCheck) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    };

    const nullCheck = () => {
        if (
            organizationId === null ||
            organizationId === undefined ||
            organizationId === ''
        ) {
            return false;
        }
        if (nickname === null || nickname === undefined || nickname === '') {
            return false;
        }
        if (email === null || email === undefined || email === '') {
            return false;
        }
        if (
            phoneNumber === null ||
            phoneNumber === undefined ||
            phoneNumber === ''
        ) {
            return false;
        }
        if (password === null || password === undefined || password === '') {
            return false;
        }
        if (
            passwordCheck === null ||
            passwordCheck === undefined ||
            passwordCheck === ''
        ) {
            return false;
        }
        return true;
    };

    const phoneNumberCheck = () => {
        let count = 0;
        for (let i = 0; i < phoneNumber.length; i++) {
            if (phoneNumber.at(i) === '-') {
                count++;
            }
            if (count > 2) {
                setPhoneNumberValidation(false);
                return false;
            }
        }
        if (count === 2) {
            setPhoneNumberValidation(true);
            return true;
        } else {
            setPhoneNumberValidation(false);
            return false;
        }
    };

    const validateEmail = () => {
        setEmailValidation(false);
        let beforeFlag = false;
        let flag = false;
        let afterFlag = false;
        let dotFlag = false;
        let afterDotFlag = false;
        for (let i = 0; i < email.length; i++) {
            const char = email.at(i);
            if (!flag && !dotFlag) {
                if (!beforeFlag) {
                    if (char !== '@' && char !== '.') {
                        beforeFlag = true;
                        continue;
                    } else {
                        return false;
                    }
                } else {
                    if (char === '.') {
                        return false;
                    }
                    if (char === '@') {
                        flag = true;
                        continue;
                    }
                }
            } else {
                if (!afterFlag) {
                    if (char !== '@' && char !== '.') {
                        afterFlag = true;
                        continue;
                    } else {
                        return false;
                    }
                } else {
                    if (char === '@') {
                        return false;
                    }
                    if (char === '.') {
                        dotFlag = true;
                        continue;
                    }
                }
            }
            if (dotFlag) {
                if (!afterDotFlag) {
                    if (char !== '.' && char !== '@') {
                        afterDotFlag = true;
                        continue;
                    } else {
                        return false;
                    }
                } else {
                    if (char === '.' || char === '@') {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }
        if (beforeFlag && flag && afterFlag && dotFlag && afterDotFlag) {
            return true;
        }
    };

    const openPostCode = () => {
        setIsPopupOpen(true);
    };

    const closePostCode = () => {
        setIsPopupOpen(false);
    };

    const changeAddress = (zipcode, address) => {
        setZipcode(zipcode);
        setAddress(address);
    };

    return (
        <>
            <div className="bg-gray-50 py-12">
                <div className="bg-white border shadow-md mx-auto my-12 rounded-2xl w-1/2">
                    <div>
                        <img
                            alt=""
                            src="/img/logo.png"
                            className="mx-auto mt-24 h-16"
                        ></img>
                    </div>
                    <div className="w-3/5 border-b-2 mx-auto py-2 text-xl text-gray-300 mt-12 mb-12">
                        Modify
                    </div>
                    <form>
                        {isNull && (
                            <div className="w-1/2 mx-auto">
                                <span className="text-red-600 tracking-wide">
                                    모든 값을 채워주세요!
                                </span>
                            </div>
                        )}
                        <div className="mb-2">
                            <label
                                htmlFor="id"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                            >
                                ID
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    id="id"
                                    disabled
                                    type="text"
                                    name="organizationId"
                                    value={organizationId}
                                    className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="nickname"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                            >
                                Groupname
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    id="nickname"
                                    type="text"
                                    name="organizationNickname"
                                    value={nickname}
                                    onChange={onNicknameChange}
                                    className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onEmailChange}
                                    className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                {!emailValidation && (
                                    <span className="text-red-600 tracking-wide mt-1 w-1/2 mx-auto">
                                        이메일 형식을 지켜주세요!
                                    </span>
                                )}
                            </div>
                            <div className="mt-4">
                                <label
                                    htmlFor="phoneNumber"
                                    className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                                >
                                    PhoneNumber
                                </label>
                                <div className="flex flex-col items-start">
                                    <input
                                        id="phoneNumber"
                                        type="text"
                                        name="name"
                                        value={phoneNumber}
                                        onChange={onPhoneNumberChange}
                                        className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    {!phoneNumberValidation && (
                                        <span className="text-red-600 tracking-wide mt-1 w-1/2 mx-auto">
                                            전화번호의 형식을 지켜주세요!
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onPasswordChange}
                                    className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                {!validation && (
                                    <span className="text-red-600 mt-1 tracking-wide w-1/2 mx-auto">
                                        비밀번호가 다릅니다.
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={passwordCheck}
                                    onChange={onPasswordCheckChange}
                                    className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                {!validation && (
                                    <span className="text-red-600 mt-1 tracking-wide w-1/2 mx-auto">
                                        비밀번호가 다릅니다.
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex">
                                <label
                                    htmlFor="zipCode"
                                    className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                                >
                                    Zipcode
                                </label>
                            </div>
                            <div className="flex items-center mx-auto w-1/2">
                                <div id="popupDom">
                                    {isPopupOpen && (
                                        <PopupDom>
                                            <PopupPostCode
                                                onClose={closePostCode}
                                                changeAddress={changeAddress}
                                            />
                                        </PopupDom>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    id="zipCode"
                                    value={zipcode}
                                    onChange={onZipCodeChange}
                                    className="w-3/4 block px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                <button
                                    type="button"
                                    className="px-2 mt-2 mx-2 inline-flex items-center text-center py-2 ml-5 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-[#77c577] border border-transparent rounded-md active:bg-gray-900 false hover:cursor-pointer"
                                    onClick={openPostCode}
                                >
                                    우편번호 검색
                                </button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="address"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                            >
                                Address
                            </label>
                            <div className="flex flex-col items-start">
                                <textarea
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={onAddressChange}
                                    className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="bank"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                            >
                                Bank
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    id="bank"
                                    type="text"
                                    name="bank"
                                    value={bank}
                                    onChange={onBankChange}
                                    className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="account"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                            >
                                Account
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    id="account"
                                    type="text"
                                    name="account"
                                    value={account}
                                    onChange={onAccountChange}
                                    className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="instroduction"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                            >
                                Instroduction
                            </label>
                            <div className="flex flex-col items-start">
                                <textarea
                                    type="text"
                                    id="instroduction"
                                    value={introduction}
                                    onChange={onIntroductionChange}
                                    className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="imgInput"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                            >
                                Logo
                                <label
                                    htmlFor="imgInput"
                                    className="inline-flex items-center px-3 py-2 ml-5 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-[#77c577] border border-transparent rounded-md active:bg-gray-900 false hover:cursor-pointer "
                                >
                                    Select logo
                                </label>
                            </label>
                            <input
                                type="file"
                                id="imgInput"
                                hidden
                                accept="image/*"
                                onChange={onImageChange}
                            />
                            {imageLoading && (
                                <img
                                    src={
                                        changeImage
                                            ? `${imageSrc}`
                                            : `data:image/*;base64,${imageSrc}`
                                    }
                                    alt="img"
                                    className="w-1/2 mt-4 mx-auto"
                                />
                            )}
                        </div>
                        <div className="flex items-center justify-center mx-auto mb-24 mt-12">
                            <div className="mt-12 text-center">
                                <button
                                    type="button"
                                    className="mx-4 w-56 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-green-600"
                                    onClick={onCancelClick}
                                >
                                    CANCEL
                                </button>
                            </div>
                            <div className="mt-12 text-center">
                                <button
                                    type="button"
                                    className="mx-4 w-56 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                                    onClick={onModifyClick}
                                >
                                    MODIFY
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default GroupModify;
