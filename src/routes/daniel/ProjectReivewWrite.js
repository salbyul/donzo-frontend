import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import ContentsRe from '../../components/daniel/ContentOfProjectReview';

function ProjectReviewWrite() {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [cookies, setCookies, removeCookies] = useCookies('token', 'target');
    const [token, setToken] = useState('');
    const [titleValidation, setTitleValidation] = useState(true);
    const [id, setId] = useState(0);
    const location = useLocation();

    useEffect(() => {
        if (
            cookies.token === undefined ||
            cookies.token === '' ||
            cookies.token === null ||
            cookies.target === undefined ||
            cookies.target === '' ||
            cookies.target === null
        ) {
            alert('로그인을 해주세요.');
            window.location.href = `/login?re=${location.pathname}`;
        }
        if (cookies.target !== 'organization') {
            alert('잘못된 접근입니다.');
            window.location.href = '/';
        }
        setToken(cookies.token);
        setId(location.pathname.substring(21));
    }, []);

    const onCancelClick = () => {
        window.history.back();
    };

    const onTitleChange = (e) => {
        setTitle(e.target.value);
        setTitleValidation(true);
        if (title === '' || title === null || title === undefined) {
            setTitleValidation(false);
            return;
        }
    };

    const changeContents = (context, imageList) => {
        setContents(context);
        setImageList(imageList);
    };

    const onSubmitClick = () => {
        setTitleValidation(true);
        if (title === '' || title === null || title === undefined) {
            setTitleValidation(false);
            return;
        }
        const data = new FormData();
        const value = {
            title: title,
            projectId: id,
            contentOfProjectReviewSaveDtoList: contents,
        };
        const json = JSON.stringify(value);
        const blob = new Blob([json], { type: 'application/json' });
        data.append('boardSaveReDto', blob);

        imageList.forEach((image) => {
            data.append('imageList', image);
        });

        axios
            .post('http://localhost:8080/project-review/save', data, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                window.location.href = '/';
            })
            .catch((error) => {});
    };

    return (
        <>
            <div className="min-h-screen flex bg-green[#000333] h-full w-9/12 mx-auto">
                <div className="flex w-full lg:w-3/5 justify-center items-center bg-gray-50 space-y-8">
                    <div className="w-full px-8 md:px-32 lg:px-44">
                        <div className="mt-8 flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                            <input
                                id="text"
                                className={`pl-2 w-full outline-none ${
                                    !titleValidation && 'border-red-300'
                                }`}
                                type="text"
                                value={title}
                                onChange={onTitleChange}
                                placeholder="제목"
                            />
                        </div>
                        {!titleValidation && (
                            <span className="text-red-500 mt-2 ml-2">
                                제목을 입력해주세요.
                            </span>
                        )}

                        <ContentsRe changeContents={changeContents} />
                    </div>
                </div>

                <div
                    className="hidden lg:flex w-full lg:w-2/5 login_img_section justify-around items-center"
                    style={{
                        backgroundImage: `url("https://images.pexels.com/photos/9034095/pexels-photo-9034095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundColor: '(0, 0, 0, 0.5)',
                    }}
                >
                    <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
                        <h1 className="ml-28 text-white font-bold text-4xl font-sans">
                            DonEasy
                        </h1>
                        <h1 className="ml-40 text-white font-bold text-4xl font-sans">
                            기부 후기작성
                        </h1>
                        <div className="flex justify-center lg:justify-start mt-6 ">
                            <button
                                className="ml-60 hover:bg-[#719E71] hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-black mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
                                onClick={onCancelClick}
                            >
                                {' '}
                                뒤로가기{' '}
                            </button>
                            <button
                                className="ml-4 hover:bg-[#719E71] hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-black mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
                                onClick={onSubmitClick}
                            >
                                {' '}
                                작성완료{' '}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectReviewWrite;
