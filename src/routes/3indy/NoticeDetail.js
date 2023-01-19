import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailContent from '../../components/admin/notice/DetailContent';

function NoticeDetail() {
    const [id, setId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [contentList, setContentList] = useState([]);
    const location = useLocation();

    useEffect(() => {
        setId(location.pathname.substring(15));
    }, []);

    useEffect(() => {
        if (id !== 0) {
            axios
                .get(`http://localhost:8080/admin/notice/detail/${id}`)
                .then((response) => {
                    setTitle(response.data.title);
                    setContentList(response.data.contentOfNoticeDetailDtoList);
                })
                .catch((error) => {});
        }
    }, [id]);

    useEffect(() => {
        if (contentList.length !== 0) {
            setLoading(true);
        }
    }, [contentList]);

    const onListClick = () => {
        window.location.href = '/notice';
    };
    return (
        <>
            <div className="bg-[#fefefe] w-9/12 mx-auto h-full min-h-screen">
                <div className="w-3/5 mx-auto">
                    <div className="border-t-2 border-b py-5 text-center tracking-wider text-4xl my-2 mt-3">
                        <div
                            className="absolute bg-green-100 text-xl rounded-lg px-3 py-1.5 duration-150 hover:duration-150 hover:bg-green-200 hover:cursor-pointer"
                            onClick={onListClick}
                        >
                            목록으로
                        </div>
                        {title}
                    </div>
                    <div>
                        {loading &&
                            contentList.map((value) => {
                                return (
                                    <DetailContent
                                        value={value}
                                        key={value.index}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}
export default NoticeDetail;
