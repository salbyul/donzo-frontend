import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Cookies, useCookies } from 'react-cookie';

function Login() {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [radio, setRadio] = useState('personal');
    const [idValidation, setIdValidation] = useState(true);
    const [passwordValidation, setPasswordValidation] = useState(true);
    const location = useLocation();
    useEffect(() => {});

    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const onClickLogin = () => {
        const idVal = validateId();
        const pwVal = validatePassword();
        if (!idVal || !pwVal) {
            return;
        }
        const loginMember = {
            memberId: inputId,
            password: inputPw,
            target: radio,
        };
        if (radio === 'personal') {
            axios
                .post('http://localhost:8080/member/login', loginMember)
                .then((response) => {
                    const token = response.data[0];
                    const target = response.data[1];
                    const cookies = new Cookies();
                    cookies.set('token', token, {
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        path: '/',
                    });
                    cookies.set('target', target, {
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        path: '/',
                    });
                    if (location.search === '') {
                        window.location.href = '/';
                    } else window.location.href = location.search.substring(4);
                })
                .catch((error) => {
                    const code = error.response.status;
                    if (code === 400) {
                        alert('아이디나 비밀번호를 확인해주세요.');
                    }
                });
        } else if (radio === 'organization') {
            axios
                .post('http://localhost:8080/organization/login', loginMember)
                .then((response) => {
                    const token = response.data[0];
                    const target = response.data[1];
                    const cookies = new Cookies();
                    cookies.set('token', token, {
                        maxAge: 1800,
                        path: '/',
                    });
                    cookies.set('target', target, {
                        maxAge: 1800,
                        path: '/',
                    });
                    if (location.search === '') window.location.href = '/';
                    else window.location.href = location.search.substring(4);
                })
                .catch((error) => {
                    const code = error.response.status;
                    if (code === 400) {
                        alert('아이디나 비밀번호를 확인해주세요.');
                    }
                });
        }
    };

    const onRadioClick = (e) => {
        const target = e.target.defaultValue;
        target === 'personal' ? setRadio('personal') : setRadio('organization');
    };
    const validateId = () => {
        if (inputId === null || inputId === '' || inputId === undefined) {
            setIdValidation(false);
            return false;
        }
        setIdValidation(true);
        return true;
    };

    const validatePassword = () => {
        if (inputPw === null || inputPw === '' || inputPw === undefined) {
            setPasswordValidation(false);
            return false;
        }
        setPasswordValidation(true);
        return true;
    };

    const onEnterClick = (e) => {
        if (e.code === 'Enter') {
            onClickLogin();
        }
    };
    return (
        <>
            <div className="bg-gray-50 py-12 h-screen">
                <div className="bg-white border shadow-md mx-auto my-12 rounded-2xl w-1/2 py-32">
                    <img
                        alt="로고"
                        src="/img/logo.png"
                        className="mx-auto mt-12 h-16"
                    ></img>
                    {(!idValidation || !passwordValidation) && (
                        <div className="text-red-500 tracking-wide text-center mt-2">
                            모든 값을 입력해주세요.
                        </div>
                    )}
                    <form className="mt-6">
                        <div className="mb-2">
                            <label
                                htmlFor="id"
                                className="w-1/2 mx-auto block text-sm font-semibold text-gray-800"
                            >
                                ID
                            </label>
                            <input
                                type="text"
                                id="id"
                                className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                value={inputId}
                                onChange={handleInputId}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="w-1/2 mx-auto mt-6 block text-sm font-semibold text-gray-800"
                            >
                                PASSWORD
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-1/2 block mx-auto px-4 py-2 mt-2 text-green-700 border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                value={inputPw}
                                onChange={handleInputPw}
                                onKeyDown={onEnterClick}
                            />
                        </div>
                        <div className="text-center">
                            <input
                                type="radio"
                                value="personal"
                                name="user"
                                onClick={onRadioClick}
                                className="mr-1"
                                defaultChecked
                            />
                            <label htmlFor="personalRadio" className="mr-3">
                                개인회원
                            </label>
                            <input
                                type="radio"
                                value="organization"
                                name="user"
                                onClick={onRadioClick}
                                className="mr-1"
                            />
                            <label htmlFor="organizationRadio">단체회원</label>
                        </div>
                        <div className="mt-12 text-center">
                            <button
                                type="button"
                                className="mx-auto w-1/2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                                onClick={onClickLogin}
                            >
                                LOGIN
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-xs font-light text-center text-gray-700">
                        <Link to={'/join'}>
                            <div className="mb-6 font-medium text-green-600 hover:underline">
                                JOIN US
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;
