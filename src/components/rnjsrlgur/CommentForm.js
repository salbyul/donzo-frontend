import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';

function CommentForm({ money, projectId, targetPrice, fundrasingMoney }) {
    const [token, setToken] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [cookies, setCookies, removeCookies] = useCookies('token');
    const location = useLocation();

    useEffect(() => {
        setToken(cookies.token);
    }, []);

    const onContentChange = (e) => {
        setCommentContent(e.target.value);
    };
    const onSubmitClick = () => {
        if (targetPrice < fundrasingMoney + 100) {
            alert('모금액을 초과할 수 없습니다.');
            return;
        }
        if (token === '' || token === undefined || token === null) {
            alert('로그인을 해주세요.');
            window.location.href = `/login?re=${location.pathname}`;
        }
        const comment = {
            content: commentContent,
            projectId: projectId,
        };

        axios
            .post(
                'http://localhost:8080/comment-of-project/save-comment',
                comment,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                if (error.response.data.code === 'C001') {
                    alert('댓글은 한번만 입력이 가능합니다.');
                } else if (error.response.data.code === 'C002') {
                    alert('단체회원은 댓글 입력이 불가능합니다.');
                }
            });
    };

    return (
        <>
            <div className="pb-14 border-b-2">
                <div className="inner_write w-700 mt-5 mb-0 m-auto pr-0 pl-0">
                    <div className="mb-4 pl-0 pb-2 text-base border-b-2 ">
                        <span className="txt_heading mr-01">
                            Don 지원 댓글 기부금
                        </span>
                        <span className="ml-1.5 text-green-600">
                            {money
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            원
                        </span>
                    </div>
                    <div className="cmt_info ml-0 relative -top-2">
                        <div className="txt_cmt block relative mt-1 pt-3 pl-3 pr-3 pb-4 border-none rounded-lg text-[#444] text-base bg-[#f7f8f9] ">
                            <textarea
                                onChange={onContentChange}
                                className="w-full h- resize-none outline-0 block relative mt-1 pt-2 pl-3 pr-3 pb-2 border-none rounded-lg text-[#444] text-base bg-[#f7f8f9]"
                                name="txtCmt"
                                placeholder="댓글만 써도 Don이 대신 기부합니다. Doneasy 함께 해요!"
                                maxLength={500}
                                minLength={0}
                            ></textarea>
                            <button
                                onClick={onSubmitClick}
                                className="-w-9 absolute -bottom-10 right-0 w-88 h-8 rounded-sm text-base duration-150 leading-8 text-[#fff] bg-[#828282] hover:duration-150 hover:bg-gray-500"
                            >
                                등록
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CommentForm;
