import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';

function Comments({ comments, projectId }) {
    const [project_id, setProject_id] = useState(0);
    const [member, setMember] = useState('');
    const [comment, setComment] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [cookies, setCookies, removeCookies] = useCookies('token');
    const [token, setToken] = useState('');
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
    }, [comment]);

    useEffect(() => {
        setToken(cookies.token);
        setProject_id(projectId);
        setMember(comments.member_id);
        setComment(comments.content);
        setCreatedDate(comments.created_date);
    }, []);

    const onReportClick = () => {
        if (token === '' || token === undefined || token === null) {
            alert('로그인을 해주세요.');
            window.location.href = `/login?re=${location.pathname}`;
        }
        const report = {
            member_id: comments.memberId,
            commentOfProject_id: comments.id,
        };
        axios
            .post(
                'http://localhost:8080/report-of-comment/save-report',
                report,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                alert('신고가 성공적으로 되었습니다.');
            })
            .catch((error) => {
                if (error.response.data.code === 'RC001') {
                    alert('신고는 한번만 가능합니다.');
                } else if (error.response.data.code === 'RC002') {
                    alert('개인회원만 신고가 가능합니다.');
                }
            });
    };

    return (
        <>
            {loading && (
                <ul className="pt-2 pb-0 bg-[#fff] inline-block float-none ml-0 mr-1">
                    <li className="w-700 mt-0 mb-0 m-auto pt-3 pl-0 pr-0 pb-3 bg-none">
                        <div className="cmt_info relative -top-2">
                            <span className="info_append pl-1 block">
                                <span className="font-normal text-base">
                                    {member}
                                </span>
                                <span className="text-green-600 relative text-sm pr-1 ml-1.5">
                                    100원
                                </span>
                            </span>
                            <span className="block mt-1 pt-3.5 pl-3 pr-3 pb-3.5 rounded-lg bg-[#fafafa] break-words break-all ">
                                <span className="block leading-6 whitespace-pre-line">
                                    {comment}
                                    <span className="text-red-600 font-semibold">
                                        {' '}
                                        ღ’ᴗ’ღ
                                    </span>
                                </span>
                            </span>
                            <span className="info_append pt-02">
                                <span className="text-[#9f9f9f]">
                                    {createdDate}
                                </span>
                                <button
                                    onClick={onReportClick}
                                    type="button"
                                    className="btn_report pr-0 pl-570 text-sm text-[#9f9f9f] align-[0] underline"
                                >
                                    신고
                                </button>
                            </span>
                        </div>
                    </li>
                </ul>
            )}
            <div>{/** 더보기 ? */}</div>
        </>
    );
}

export default Comments;
