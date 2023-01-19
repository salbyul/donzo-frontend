import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SignUpPersonal() {
    const [memberId, setMemberId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [validation, setValidation] = useState(true);
    const [isNull, setIsNull] = useState(false);
    const [phoneNumberValidation, setPhoneNumberValidation] = useState(true);
    const [emailValidation, setEmailValidation] = useState(true);

    useEffect(() => {
        checkPassword();
    }, [passwordCheck]);

    useEffect(() => {
        checkPassword();
    }, [password]);

    const onCancelClick = () => {
        window.history.back();
    };
    const onMemberIdChange = (e) => {
        if (e.target.value.length < memberId.length) {
            setMemberId(e.target.value);
            return;
        }
        const value = e.target.value.at(e.target.value.length - 1);
        console.log(value);
        if (
            (value >= 'a' && value <= 'z') ||
            (value >= 'A' && value <= 'Z') ||
            (value >= '0' && value <= '9')
        ) {
            setMemberId(memberId + value);
            return;
        }
    };
    const onNicknameChange = (e) => {
        setNickname(e.target.value);
    };
    const onPasswordChange = (e) => {
        if (e.target.value.length < password.length) {
            setPassword(e.target.value);
            return;
        }
        const value = e.target.value.at(e.target.value.length - 1);
        console.log(value);
        if (
            (value >= 'a' && value <= 'z') ||
            (value >= 'A' && value <= 'Z') ||
            (value >= '0' && value <= '9')
        ) {
            setPassword(password + value);
            return;
        }
    };
    const onPasswordCheckChange = (e) => {
        if (e.target.value.length < passwordCheck.length) {
            setPasswordCheck(e.target.value);
            return;
        }
        const value = e.target.value.at(e.target.value.length - 1);
        console.log(value);
        if (
            (value >= 'a' && value <= 'z') ||
            (value >= 'A' && value <= 'Z') ||
            (value >= '0' && value <= '9')
        ) {
            setPasswordCheck(passwordCheck + value);
            return;
        }
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onPhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const onRegisterClick = () => {
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

        const member = {
            member_id: memberId,
            nickname: nickname,
            password: password,
            email: email,
            phone_number: phoneNumber,
        };

        axios
            .post('http://localhost:8080/member/save', member)
            .then((response) => {
                window.location.href = '/login';
            })
            .catch((error) => {
                const code = error.response.data.code;
                if (code === 'M001') {
                    alert('중복된 아이디입니다.');
                } else if (code === 'M002') {
                    alert('중복된 닉네임입니다.');
                }
            });
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
        if (memberId === null || memberId === undefined || memberId === '') {
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
            setEmailValidation(true);
            return true;
        }
    };

    return (
        <div>
            <div className="bg-gray-50 py-12">
                <div className="bg-white border shadow-md mx-auto my-12 rounded-2xl w-1/2">
                    <div>
                        <img
                            alt=""
                            src="/img/logo.png"
                            className="mx-auto mt-24 h-16"
                        ></img>
                    </div>
                    <div className="w-3/5 border-b-2 mx-auto py-2 text-gray-300 mt-12 mb-12">
                        개인회원가입
                    </div>
                    <form>
                        {isNull && (
                            <div className="text-center">
                                <span className="text-red-600 tracking-wide">
                                    모든 값을 채워주세요!
                                </span>
                            </div>
                        )}
                        <div className="mb-2">
                            <label
                                htmlFor="name"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                            >
                                ID
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    id="name"
                                    value={memberId}
                                    onChange={onMemberIdChange}
                                    className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    placeholder="ID"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="nickname"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                            >
                                Nickname
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    id="nickname"
                                    value={nickname}
                                    onChange={onNicknameChange}
                                    className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    placeholder="donation_King"
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
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={onEmailChange}
                                    className={`${
                                        !emailValidation
                                            ? 'border-red-300'
                                            : 'border-gray-300'
                                    } w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                                    placeholder="donation@king.com"
                                />
                                {!emailValidation && (
                                    <div className="mx-auto mt-2">
                                        <span className="text-red-600 tracking-wide">
                                            이메일 형식을 지켜주세요!
                                        </span>
                                    </div>
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
                                        type="text"
                                        id="phoneNumber"
                                        value={phoneNumber}
                                        onChange={onPhoneNumberChange}
                                        className={`w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                                            !phoneNumberValidation &&
                                            'border-red-300'
                                        }`}
                                        placeholder="010-0000-0000"
                                    />
                                    {!phoneNumberValidation && (
                                        <div className="mx-auto mt-2">
                                            <span className="text-red-600 tracking-wide">
                                                전화번호의 형식을 지켜주세요!
                                            </span>
                                        </div>
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
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={onPasswordChange}
                                    className={`w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                                        !validation && 'border-red-300'
                                    }`}
                                    placeholder="******"
                                />
                                {!validation && (
                                    <div className="mx-auto mt-2">
                                        <span className="text-red-600 tracking-wide">
                                            비밀번호가 다릅니다.
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="passwordCheck"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800 mt-6"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    id="passwordCheck"
                                    value={passwordCheck}
                                    onChange={onPasswordCheckChange}
                                    className={`w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                                        !validation && 'border-red-300'
                                    }`}
                                    placeholder="******"
                                />
                                {!validation && (
                                    <div className="mx-auto mt-2">
                                        <span className="text-red-600 tracking-wide">
                                            비밀번호가 다릅니다.
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-8 font-light text-center">
                            <a
                                className="mt-6 mb-6 text-green-600 hover:underline"
                                href="/login"
                            >
                                already register?
                            </a>
                        </div>
                        <div className="flex items-center justify-center mx-auto mb-24 mt-12">
                            <button
                                type="button"
                                onClick={onCancelClick}
                                className="mx-4 w-56 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-green-600"
                            >
                                CANCEL
                            </button>
                            <button
                                type="button"
                                onClick={onRegisterClick}
                                className="mx-4 w-56 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                            >
                                회원가입
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpPersonal;
