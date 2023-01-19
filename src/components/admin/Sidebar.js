import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

function Sidebar({ focus }) {
    const [page, setPage] = useState('');
    const [loading, setLoading] = useState(false);
    const [cookies, setCookies, removeCookies] = useCookies('token');
    const [token, setToken] = useState('');
    useEffect(() => {
        if (
            cookies.token === '' ||
            cookies.token === null ||
            cookies.token === undefined
        ) {
            alert('잘못된 접근입니다.');
            window.location.href = '/';
        }
        if (!(token === '' || token === null || token === undefined)) {
            axios
                .get('http://localhost:8080/admin/is-admin', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                    alert('잘못된 접근입니다.');
                    window.location.href = '/';
                });
        }
    }, [token]);
    useEffect(() => {
        setPage(focus);
        setLoading(true);
        setToken(cookies.token);
    }, []);
    const onNoticeClick = () => {
        window.location.href = `/admin/notice`;
    };
    const onProjectClick = () => {
        window.location.href = `/admin/project`;
    };
    const onCommentClick = () => {
        window.location.href = `/admin/comment`;
    };
    return (
        <>
            {loading && (
                <div className="w-1/6 h-screen border-r mr-2 pt-20">
                    <button
                        className={`py-4 my-4 text-gray-400 hover:text-gray-700 hover:duration-150 hover:text-xl duration-150 block mx-auto tracking-wider ${
                            page === 'notice' ? 'text-gray-700 text-xl' : ''
                        }`}
                        onClick={onNoticeClick}
                    >
                        Notice
                    </button>
                    <button
                        className={`py-4 my-4 text-gray-400 hover:text-gray-700 hover:duration-150 hover:text-xl duration-150 block mx-auto tracking-wider ${
                            page === 'project' ? 'text-gray-700 text-xl' : ''
                        }`}
                        id="project"
                        onClick={onProjectClick}
                    >
                        Project
                    </button>
                    <button
                        className={`py-4 my-4 text-gray-400 hover:text-gray-700 hover:duration-150 hover:text-xl duration-150 block mx-auto tracking-wider ${
                            page === 'comment' ? 'text-gray-700 text-xl' : ''
                        }`}
                        onClick={onCommentClick}
                    >
                        Comment
                    </button>
                </div>
            )}
        </>
    );
}
export default Sidebar;
