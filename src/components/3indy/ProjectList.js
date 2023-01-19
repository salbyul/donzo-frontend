import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function ProjectList({ projectList }) {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [cookies, setCookies, removeCoolies] = useCookies('token');

    useEffect(() => {
        setTitle(projectList.title);
        setStatus(projectList.status);
    }, []);

    function onClickReview() {
        if (status === 'DONE') {
            axios
                .get(
                    `http://localhost:8080/project-review/can-write/${projectList.id}`,
                    {
                        headers: { Authorization: `Bearer ${cookies.token}` },
                    }
                )
                .then((response) => {
                    window.location.href = `/project-review/post/${projectList.id}`;
                })
                .catch((error) => {
                    if (error.response.data.code === 'PR001') {
                        alert('이미 작성하셨습니다.');
                    }
                });
            // window.location.href = `/project-review/post/${title}`;
        } else {
            alert('프로젝트가 진행 중 입니다.');
        }
    }

    return (
        <>
            <tr className="border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    프로젝트 명 : {title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    진행 상태 : {status}
                </td>
                <td>
                    <button
                        type="button"
                        onClick={onClickReview}
                        className="rounded-2xl bg-gray-50 px-2 py-2  mx-2 my-2 whitespace-nowrap text-sm font-medium text-gray-900 border"
                    >
                        후기작성
                    </button>
                </td>
            </tr>
        </>
    );
}
export default ProjectList;
