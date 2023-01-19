import axios from 'axios';
import { useEffect, useState } from 'react';

function CommentList({ value }) {
    const [id, setId] = useState(0);
    const [status, setStatus] = useState('');

    useEffect(() => {
        setId(Number.parseInt(value.id));
        setStatus(value.status);
    }, []);

    const onActiveClick = () => {
        axios
            .post('http://localhost:8080/admin/comment/blind', { id: id })
            .then((response) => {
                setStatus('BLIND');
            })
            .catch((error) => {});
    };

    const onBlindClick = () => {
        axios
            .post('http://localhost:8080/admin/comment/active', { id: id })
            .then((response) => {
                setStatus('ACTIVE');
            })
            .catch((error) => {});
    };
    return (
        <>
            <div className="flex border-b py-1">
                <div className="w-1/4 my-auto">{value.id}</div>
                <div className="w-1/4 my-auto">{value.contents}</div>
                <div className="w-1/4 my-auto">
                    {value.reports === null ? '0' : value.reports}
                </div>
                <div className="w-1/4 my-auto">{value.createdDate}</div>
                <div className="w-1/4 my-auto">
                    {status === 'ACTIVE' && (
                        <button
                            className="border rounded-lg px-3 py-1.5 bg-gray-50 duration-150 tracking-wider hover:duration-150 hover:bg-gray-200"
                            onClick={onActiveClick}
                        >
                            ACTIVE
                        </button>
                    )}
                    {status === 'BLIND' && (
                        <button
                            className="border rounded-lg px-3 py-1.5 bg-red-50 duration-150 tracking-wider hover:duration-150 hover:bg-red-200"
                            onClick={onBlindClick}
                        >
                            BLIND
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
export default CommentList;
