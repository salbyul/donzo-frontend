import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ContentOfProject from '../../components/rnjsrlgur/ContentOfProject';
import Comments from '../../components/rnjsrlgur/Comments';

function ProjectReviewDetail() {
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
    const location = useLocation();

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
        const projectId = location.pathname.substring(23);
        const formData = new FormData();
        formData.append('projectId', projectId);
        axios
            .post('http://localhost:8080/project-review/get-project', formData)
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
            .post('http://localhost:8080/project-review/get-content', formData)
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
            .post('http://localhost:8080/project-review/get-comment', formData)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {});

        axios
            .post('http://localhost:8080/project-review/get-support', formData)
            .then((response) => {
                setSupport(response.data.length);
            })
            .catch((error) => {});

        axios
            .post('http://localhost:8080/project-review/get-donation', formData)
            .then((response) => {
                setDonationList(response.data);
                donationList.sort((a, b) => {
                    return a.id - b.id;
                });
            })
            .catch((error) => {});
    }, []);

    return (
        <>
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
                </div>

                {/* 댓글 */}
                <div className="cmt_type3 w-700 relative m-auto">
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
                    <div className="pb-1 border-b-2"></div>
                    {commentLoading &&
                        comments.map((comment) => {
                            return (
                                <Comments
                                    key={comment.id}
                                    comments={comment}
                                    projectId={location.pathname.substring(9)}
                                />
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default ProjectReviewDetail;
