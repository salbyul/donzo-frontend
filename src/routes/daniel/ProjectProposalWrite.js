import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import Contents from '../../components/daniel/ContentOfProjectProposal';

function ProjectProposalWrite() {
    const [service_start_date, setService_start_date] = useState('');
    const [service_end_date, setService_end_date] = useState('');
    const [category, setCategory] = useState('');
    const [target_price, setTarget_price] = useState(0);
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [deadline, setDeadLine] = useState('');
    const [startValidation, setStartValidation] = useState(true);
    const [endValidation, setEndValidation] = useState(true);
    const [categoryValidation, setCategoryValidation] = useState(true);
    const [priceValidation, setPriceValidation] = useState(true);
    const [titleValidation, setTitleValidation] = useState(true);
    const [deadlineValidation, setDeadlineValidation] = useState(true);
    const [name1, setName1] = useState('');
    const [price1, setPrice1] = useState(0);
    const [name2, setName2] = useState('');
    const [price2, setPrice2] = useState(0);
    const [name3, setName3] = useState('');
    const [price3, setPrice3] = useState(0);
    const [plans, setPlans] = useState([{}, {}, {}]);
    const [cookies, setCookies, removeCookies] = useCookies('token');
    const [token, setToken] = useState('');
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
    }, []);

    const onName1 = (e) => {
        setName1(e.target.value);
    };
    const onPrice1 = (e) => {
        setPrice1(e.target.value);
    };
    const onName2 = (e) => {
        setName2(e.target.value);
    };
    const onPrice2 = (e) => {
        setPrice2(e.target.value);
    };
    const onName3 = (e) => {
        setName3(e.target.value);
    };
    const onPrice3 = (e) => {
        setPrice3(e.target.value);
    };
    useEffect(() => {
        const mine = { name: name1, price: price1 };
        const list = [];
        list.push(mine);
        list.push(plans.at(1));
        list.push(plans.at(2));
        setPlans(list);
    }, [name1, price1]);

    useEffect(() => {
        const mine = { name: name2, price: price2 };
        const list = [];
        list.push(plans.at(0));
        list.push(mine);
        list.push(plans.at(2));
        setPlans(list);
    }, [name2, price2]);

    useEffect(() => {
        const mine = { name: name3, price: price3 };
        const list = [];
        list.push(plans.at(0));
        list.push(plans.at(1));
        list.push(mine);
        setPlans(list);
    }, [name3, price3]);

    useEffect(() => {}, [category]);
    const onCancelClick = () => {
        window.history.back();
    };
    const onStartDate = (e) => {
        setService_start_date(e.target.value);
    };
    const onEndDate = (e) => {
        setService_end_date(e.target.value);
    };
    const onCategory = (e) => {
        setCategory(e.target.value);
    };
    const onPrice = (e) => {
        setTarget_price(e.target.value);
    };
    const onTitle = (e) => {
        setTitle(e.target.value);
    };
    const onDeadLine = (e) => {
        setDeadLine(e.target.value);
    };

    const changeContents = (context, imageList) => {
        setContents(context);
        setImageList(imageList);
    };

    const onSubmitClick = () => {
        if (!isNull()) {
            return;
        }
        const data = new FormData();
        const value = {
            service_start_date: service_start_date,
            service_end_date: service_end_date,
            category: category,
            target_price: target_price,
            title: title,
            contentOfProjectSaveDtoList: contents,
            deadline: deadline,
        };

        const json = JSON.stringify(value);
        const blob = new Blob([json], { type: 'application/json' });
        data.append('boardSaveDto', blob);

        const json2 = JSON.stringify(plans);
        const blob2 = new Blob([json2], { type: 'application/json' });
        data.append('usagePlan', blob2);

        imageList.forEach((image) => {
            data.append('imageList', image);
        });

        axios
            .post('http://localhost:8080/project-proposal/save', data, {
                headers: { Authorization: `Bearer ${cookies.token}` },
            })
            .then((response) => {
                window.location.href = '/';
            })
            .catch((error) => {});
    };

    const isNull = () => {
        if (
            service_start_date === null ||
            service_start_date === '' ||
            service_start_date === undefined
        ) {
            setStartValidation(false);
            return false;
        }
        setStartValidation(true);
        if (
            service_end_date === null ||
            service_end_date === '' ||
            service_end_date === undefined
        ) {
            setEndValidation(false);
            return false;
        }
        setEndValidation(true);
        if (deadline === null || deadline === '' || deadline === undefined) {
            setDeadlineValidation(false);
            return false;
        }
        setDeadlineValidation(true);
        if (category === null || category === '' || category === undefined) {
            setCategoryValidation(false);
            return false;
        }
        setCategoryValidation(true);
        if (
            target_price === null ||
            target_price === 0 ||
            target_price === undefined
        ) {
            setPriceValidation(false);
            return false;
        }
        setPriceValidation(true);
        if (title === null || title === '' || title === undefined) {
            setTitleValidation(false);
            return false;
        }
        setTitleValidation(true);
        return true;
    };
    return (
        <>
            <div className="min-h-screen h-full flex bg-green[#000333] w-9/12 mx-auto">
                <div
                    className="hidden lg:flex w-full lg:w-2/5 login_img_section justify-around items-center "
                    style={{
                        backgroundImage: `url("https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80")`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundColor: '(0, 0, 0, 0.5)',
                    }}
                >
                    <div className="bg-black opacity-20 inset-0 z-0"></div>
                    <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
                        <h1 className="ml-28 text-white font-bold text-4xl font-sans">
                            DonEasy
                        </h1>
                        <h1 className="ml-40 text-white font-bold text-4xl font-sans">
                            프로젝트 제안서
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

                <div className="flex w-full lg:w-3/5 justify-center items-center bg-gray-50 space-y-8">
                    <div className="w-full px-8 md:px-32 lg:px-44">
                        <div
                            align="center"
                            className="mb-5 block   text-[#07074D]"
                        >
                            <label htmlFor="startday">시작 :</label>
                            <input
                                id="startday"
                                value={service_start_date}
                                type="date"
                                className={`ml-1  resize-none rounded-md border border-[#e0e0e0] bg-white py-1 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                                    !startValidation && 'border-red-500'
                                }`}
                                onChange={onStartDate}
                            />
                            <label className="ml-8" htmlFor="endday">
                                종료 :
                            </label>
                            <input
                                id="endday"
                                value={service_end_date}
                                type="date"
                                className={`ml-1  resize-none rounded-md border border-[#e0e0e0] bg-white py-1 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                                    !endValidation && 'border-red-500'
                                }`}
                                onChange={onEndDate}
                            />
                            <label className="ml-8" htmlFor="endday2">
                                마감 :
                            </label>
                            <input
                                id="endday2"
                                value={deadline}
                                type="date"
                                className={`ml-1 resize-none rounded-md border border-[#e0e0e0] bg-white py-1 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                                    !deadlineValidation && 'border-red-500'
                                }`}
                                onChange={onDeadLine}
                            />
                        </div>

                        <div align="center">
                            <label htmlFor="category">카테고리:</label>
                            <select
                                id="category"
                                className={`ml-1 resize-none rounded-md border border-[#e0e0e0] bg-white py-1 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                                    !categoryValidation && 'border-red-500'
                                }`}
                                value={category}
                                onChange={onCategory}
                            >
                                <option value="">select category.</option>
                                <option value="seniorcitizen">어르신</option>
                                <option value="children">어린이</option>
                                <option value="youth">청년</option>
                                <option value="environment">환경</option>
                                <option value="disabled ">장애인</option>
                                <option value="society ">사회</option>
                            </select>
                            <label className="ml-16" htmlFor="target_price">
                                목표금액:
                            </label>
                            <input
                                id="target_price"
                                className={`ml-1 resize-none rounded-md border border-[#e0e0e0] bg-white py-1 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                                    !priceValidation && 'border-red-500'
                                }`}
                                type="number"
                                value={target_price}
                                placeholder="목표 금액을 설정해주세요."
                                onChange={onPrice}
                            />
                        </div>

                        <details>
                            <summary
                                className="rouned_md bg-[#719E71] px-1 py-1 transition duration-700 hover:bg-gray-400 space-x-1 text-white mt-5 mb-3 hover:cursor-pointer"
                                align="center"
                            >
                                사용 용도
                            </summary>

                            <div className="mt-8 flex items-center border-2 mb-6 py-2 px-3 rounded-2xl ">
                                <input
                                    className="mr-4 pl-2 w-full outline-none border-10"
                                    type="text"
                                    value={name1}
                                    onChange={onName1}
                                    id="subTitle"
                                    placeholder="1.사용용도"
                                />
                                <input
                                    className="ml-4 pl-2 w-full outline-none border-10"
                                    type="number"
                                    value={price1}
                                    onChange={onPrice1}
                                    id="subTitle"
                                    placeholder="1.금액"
                                />
                            </div>
                            <div className="mt-4 flex items-center border-2 mb-6 py-2 px-3 rounded-2xl ">
                                <input
                                    className="mr-4 pl-2 w-full outline-none border-10"
                                    type="text"
                                    value={name2}
                                    onChange={onName2}
                                    id="subTitle"
                                    placeholder="2.사용용도"
                                />
                                <input
                                    className="ml-4 pl-2 w-full outline-none border-10"
                                    type="number"
                                    value={price2}
                                    onChange={onPrice2}
                                    id="subTitle"
                                    placeholder="2.금액"
                                />
                            </div>
                            <div className="mt-4 flex items-center border-2 mb-6 py-2 px-3 rounded-2xl ">
                                <input
                                    className="mr-4 pl-2 w-full outline-none border-10"
                                    type="text"
                                    value={name3}
                                    onChange={onName3}
                                    id="subTitle"
                                    placeholder="3.사용용도"
                                />
                                <input
                                    className="ml-4 pl-2 w-full outline-none border-10"
                                    type="number"
                                    value={price3}
                                    onChange={onPrice3}
                                    id="subTitle"
                                    placeholder="3.금액"
                                />
                            </div>
                        </details>

                        <div
                            className={`mt-8 flex items-center border-2 mb-4 py-2 px-3 rounded-2xl ${
                                !titleValidation && 'border-red-500'
                            }`}
                        >
                            <input
                                id="text"
                                className="pl-2 w-full outline-none border-none"
                                type="text"
                                value={title}
                                onChange={onTitle}
                                placeholder="주제를 입력하세요."
                            />
                        </div>

                        <Contents changeContents={changeContents} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectProposalWrite;
