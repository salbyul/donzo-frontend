import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import CommentForm from '../../components/rnjsrlgur/CommentForm';
import PayModal from '../../components/rnjsrlgur/PayModal';

import Comments from '../../components/rnjsrlgur/Comments';
import ContentOfProject from '../../components/rnjsrlgur/ContentOfProject';
import { FaHeart } from 'react-icons/fa';

function ProjectDetail() {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [titleImage, setTitleImage] = useState('');
    const [organization, setOrganization] = useState('');
    const [targetPrice, setTargetPrice] = useState(0);
    const [createdDate, setCreatedDate] = useState('');
    const [deadline, setDeadline] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [fundrasingMoney, setFundrasingMoney] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentLoading, setCommentLoading] = useState(false);
    const [support, setSupport] = useState(0);
    const [donationList, setDonationList] = useState([]);
    const [donation, setDonation] = useState([]);
    const [donationMoney, setDonationMoney] = useState(0);
    const [usagePlan, setUsagePlan] = useState([]);
    const location = useLocation();
    const [cookies, setCookies, removeCookies] = useCookies('token');
    const [token, setToken] = useState('');
    const [isPayModalOpen, setIsPayModalOpen] = useState(false);

    useEffect(() => {
        const dList = [];
        const pList = [];
        for (let i = 0; i < donationList.length; i++) {
            dList.push(donationList[i].memberId);
            pList.push(donationList[i].price);
        }
        setDonation(pList);
    }, [donationList]);

    useEffect(() => {
        let donationPrice = 0;
        donation.forEach((element) => {
            donationPrice += element;
        });
        setDonationMoney(donationPrice);
        setCommentLoading(true);
        setFundrasingMoney(
            donationPrice + comments.length * 100 + support * 100
        );
    }, [comments, support, donation]);

    useEffect(() => {
        setToken(cookies.token);
        const projectId = location.pathname.substring(16);
        const formData = new FormData();
        formData.append('id', projectId);
        axios
            .post('http://localhost:8080/project/get-project', formData)
            .then((response) => {
                setTitle(response.data.title);
                setOrganization(response.data.nickname);
                setTargetPrice(response.data.target_price);
                setCreatedDate(response.data.created_date);
                setDeadline(response.data.deadline);
                setStartDate(response.data.service_start_date);
                setEndDate(response.data.service_end_date);
            })
            .catch((error) => {});

        axios
            .post(
                'http://localhost:8080/content-of-project/get-content',
                formData
            )
            .then((response) => {
                const list = response.data;
                list.sort((a, b) => {
                    return a.order_num - b.order_num;
                });
                setContents(list);
                setLoading(true);
                setTitleImage(response.data[0].image);
            })
            .catch((error) => {});

        axios
            .post(
                'http://localhost:8080/comment-of-project/get-comment',
                formData
            )
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {});

        axios
            .post(
                'http://localhost:8080/support-of-project/get-support',
                formData
            )
            .then((response) => {
                setSupport(response.data.length);
            })
            .catch((error) => {});

        axios
            .post(
                'http://localhost:8080/donation-of-project/get-donation',
                formData
            )
            .then((response) => {
                setDonationList(response.data);
                donationList.sort((a, b) => {
                    return a.id - b.id;
                });
            })
            .catch((error) => {});

        axios
            .post('http://localhost:8080/usage-plan/get-usageplan', formData)
            .then((response) => {
                setUsagePlan(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onSupportClick = () => {
        if (token === '' || token === undefined || token === null) {
            alert('로그인을 해주세요.');
            window.location.href = `/login?re=${location.pathname}`;
        }
        const project_id = Number.parseInt(location.pathname.substring(16));
        axios
            .post(
                'http://localhost:8080/support-of-project/save-support',
                {
                    project_id: project_id,
                },
                { headers: { Authorization: `Bearer ${cookies.token}` } }
            )
            .then((response) => {
                setSupport(support + 1);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.data.code === 'S001') {
                    alert('응원은 한번만 할 수 있습니다.');
                } else if (error.response.data.code === 'S002') {
                    alert('단체회원은 응원을 할 수 없습니다.');
                } else if (error.response.data.code === 'S003') {
                    alert('모금액을 초과할 수 없습니다.');
                }
            });
    };

    const showModal = () => {
        if (token === '' || token === undefined || token === null) {
            alert('로그인을 해주세요.');
            window.location.href = `/login?re=${location.pathname}`;
            return;
        }
        setIsPayModalOpen(true);
    };

    return (
        <>
            {/*
            <div id="wrap_content">
            // 수정하기 btn
                <c:if test="${content.writer == loginIdx}">
                    <div id="btn_update">
                        <a href="/write?cate=fund&idx=${content.idx}"><span>수 정</span></a>		
                    </div>
                </c:if>
            </div> 
        */}
            <div className="pt-0 mb-100">
                {/* Title Content */}
                <div className="w-full h-300 mb-70 relative">
                    <div className="w-full h-full absolute bg-[#0006]">
                        <div className="pt-90 relative z-10 text-center align-middle">
                            <span className="block w-620 max-h-100 m-auto font-normal text-4xl text-white">
                                {title}
                            </span>
                            <span className="block w-620 max-h-14 mt-0 m-auto pt-2 text-lg text-white opacity-60">
                                by {organization}
                            </span>
                        </div>
                    </div>
                    <img
                        src={`data:image/*;base64,${titleImage}`}
                        alt="titleImage"
                        className="w-full h-full bg-cover"
                    ></img>
                </div>

                {/* Body Content */}
                <div className="relative">
                    {loading &&
                        contents.map((value) => {
                            return (
                                <ContentOfProject
                                    contents={value}
                                    key={value.id}
                                />
                            );
                        })}
                </div>

                <div className="w-700 mt-12 m-auto border-t-2 border-b-2 text-center pt-14 pl-0 pr-0 pb-14">
                    <span className="block text-green-600 text-4xl text-ellipsis whitespace-nowrap leading-10">
                        {fundrasingMoney
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        <span className="text-2xl">원</span>
                    </span>
                    <span className="pt-0 text-lg text-black">
                        {targetPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        원 목표
                    </span>
                    <span className="mt-2 text-base block">
                        직접기부 :{' '}
                        {donationMoney
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        원
                        {donationList &&
                            donationList.map((value) => {
                                return (
                                    <span
                                        className="block text-center text-sm"
                                        key={value.id}
                                    >
                                        {value.memberId}님!{' '}
                                        {value.price
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )}
                                        원 기부 감사합니다♡
                                    </span>
                                );
                            })}
                    </span>
                    <span className="mt-2 text-base block">
                        참여기부 :{' '}
                        {(support * 100 + comments.length * 100)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        원
                        <span className="block text-center text-sm">
                            응원 :{' '}
                            {(support * 100)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            원
                        </span>
                        <span className="block text-center text-sm">
                            댓글 :{' '}
                            {(comments.length * 100)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            원
                        </span>
                    </span>
                </div>

                {/* 프로젝트팀 */}
                <div className="relative">
                    <div className="w-700 m-auto pt-8 pl-0 pr-0 pb-8">
                        <span className="block m-auto leading-7 text-xl text-slate-700 whitespace-pre-line break-all">
                            프로젝트팀 : {organization}
                        </span>
                        <span className="block mt-2 text-base text-slate-600  break-all">
                            모금기간: {createdDate} - {deadline}
                        </span>
                        <span className="block mt-2 text-base text-slate-600  break-all">
                            사업기간: {startDate} - {endDate}
                        </span>
                    </div>
                    <div className="w-700 m-auto">
                        <span className="block text-center text-lg  bg-green-600 text-white">
                            모금액 이렇게 사용합니다.
                        </span>
                        {usagePlan &&
                            usagePlan.map((value) => {
                                return (
                                    <span
                                        className="block text-center text-base mt-2"
                                        key={value.id}
                                    >
                                        {value.name} :{' '}
                                        {value.price
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )}{' '}
                                        원
                                    </span>
                                );
                            })}
                    </div>
                </div>

                {/* 댓글 */}
                <div className="cmt_type3 w-700 relative m-auto">
                    <CommentForm
                        money={comments.length * 100}
                        projectId={location.pathname.substring(16)}
                        fundrasingMoney={fundrasingMoney}
                        targetPrice={targetPrice}
                    />
                    <div>
                        <div className="wrap_info pt-0 border-t-0 mt-1">
                            <span>
                                댓글
                                <span className="emph_sign ml-1.5 relative text-green-600">
                                    {comments.length}
                                </span>
                            </span>
                        </div>
                    </div>
                    {commentLoading &&
                        comments.map((comment) => {
                            return (
                                <Comments
                                    key={comment.id}
                                    comments={comment}
                                    projectId={location.pathname.substring(16)}
                                />
                            );
                        })}
                </div>

                {/* 응원하기 하단 바 */}
                <div
                    className="z-100 fixed block left-1/2 bottom-2 w-700 h-14 -ml-350 bg-none text-center"
                    id="fund_float"
                >
                    <button
                        disabled=""
                        onClick={onSupportClick}
                        className="float-left overflow-hidden w-1/3 h-14 bg-[#434343] rounded-l-md cursor-pointer"
                    >
                        <span className="inline-block w-6 h-5 mr-3 ml-16 float-left">
                            <FaHeart size={24} color="#FF0032" />
                        </span>
                        <span className="text-xl text-[#fff] align-baseline float-left mx-2">
                            응원
                        </span>
                        <div className="text-[#d9d9d9] mr-16 text-base">
                            {support}
                        </div>
                        <div className="absolute top-2 right-0 w-01 h-9 bg-[#555]"></div>
                    </button>
                    {isPayModalOpen && (
                        <PayModal
                            setIsPayModalOpen={setIsPayModalOpen}
                            projectId={location.pathname.substring(16)}
                            fundrasingMoney={fundrasingMoney}
                            targetPrice={targetPrice}
                        />
                    )}
                    <button
                        onClick={showModal}
                        className=" overflow-hidden relative w-2/3 h-14 bg-green-600 rounded-r-md cursor-pointer text-center"
                    >
                        <span className="text-xl text-[#fff]">기부하기</span>
                    </button>
                </div>
            </div>
        </>
    );
}
export default ProjectDetail;
