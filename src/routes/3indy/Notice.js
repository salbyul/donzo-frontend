import axios from 'axios';
import { useEffect, useState } from 'react';
import NoticeList from '../../components/admin/NoticeList';

function Notice() {
    const [noticeList, setNoticeList] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:8080/admin/notice')
            .then((response) => {
                setNoticeList(response.data);
            })
            .catch((error) => {});
    }, []);
    return (
        <>
            <div className="w-9/12 shadow-lg h-fit mx-auto bg-gray-50 px-10 py-20">
                {noticeList &&
                    noticeList.map((value) => {
                        return <NoticeList key={value.id} value={value} />;
                    })}
            </div>
        </>
    );
}
export default Notice;
