import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useCookies } from 'react-cookie';

//BsSearch

const Header = () => {
    const [target, setTarget] = useState('');
    const [token, setToken] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'target']);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
    }, [target]);

    useEffect(() => {
        setTarget(cookies.target);
        setToken(cookies.token);
    }, [cookies]);

    const onLogoutClick = () => {
        removeCookie('token', { path: '/' });
        removeCookie('target', { path: '/' });
        setTarget('');
        setToken('');
        window.location.reload();
    };

    return (
        <>
            {loading && (
                <div>
                    <header>
                        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-5 dark:bg-gray-800">
                            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                                <div className="flex items-center">
                                    <a href="/">
                                        <img
                                            alt=""
                                            src="/img/logo.png"
                                            className="mr-3 h-6 sm:h-9"
                                        />
                                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
                                    </a>
                                </div>
                                <div className="flex items-center lg:order-2">
                                    {target === 'organization' ||
                                    target === 'personal' ? (
                                        <img
                                            alt=""
                                            src="https://t1.kakaocdn.net/together_image/common/avatar/avatar03.png"
                                            className="h-8 rounded-full"
                                        />
                                    ) : (
                                        <></>
                                    )}

                                    <Link
                                        to={'/profile/personal'}
                                        hidden={target !== 'personal'}
                                    >
                                        <button className="duration-150 hover:duration-150 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                            마이페이지
                                        </button>
                                    </Link>

                                    <Link
                                        to={'/profile/group'}
                                        hidden={target !== 'organization'}
                                    >
                                        <button className="duration-150 hover:duration-150 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                            그룹페이지
                                        </button>
                                    </Link>

                                    {token === undefined ? (
                                        <Link
                                            to={`/login?re=${location.pathname}`}
                                        >
                                            <button className="duration-150 hover:duration-150 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                                Login
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="duration-150 hover:duration-150 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                                            onClick={onLogoutClick}
                                        >
                                            Logout
                                        </button>
                                    )}

                                    <Link to={'/search'}>
                                        <div className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                            <BsSearch />
                                        </div>
                                    </Link>
                                </div>
                                <div
                                    className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                                    id="mobile-menu-2"
                                >
                                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                        <li>
                                            <a
                                                href="/project-list/1"
                                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                            >
                                                기부하기
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/project-review-list/1"
                                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                            >
                                                모금후기
                                            </a>
                                        </li>
                                        <li>
                                            <Dropdown
                                                text="더보기"
                                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                                options={[
                                                    {
                                                        label: '공지사항',
                                                        value: 'notice',
                                                        href: '/notice',
                                                    },
                                                    {
                                                        label: '기업소개',
                                                        value: 'intro',
                                                        href: '/intro',
                                                    },
                                                ]}
                                            ></Dropdown>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </header>
                </div>
            )}
        </>
    );
};
export default Header;
