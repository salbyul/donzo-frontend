import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function PayModal({
    setIsPayModalOpen,
    projectId,
    fundrasingMoney,
    targetPrice,
}) {
    const [value, setValue] = useState('');
    const [isNotNumber, setIsNotNumber] = useState(false);
    const [token, setToken] = useState('');
    const [cookies, setCookies, removeCookies] = useCookies('token');
    const [tid, setTid] = useState('');

    useEffect(() => {
        setToken(cookies.token);
    }, []);
    const closeModal = () => {
        setIsPayModalOpen(false);
    };
    const onValueChange = (e) => {
        const value = e.target.value.substring(e.target.value.length - 1);
        if (isNaN(value)) {
            setIsNotNumber(true);
            return;
        }
        setIsNotNumber(false);
        setValue(e.target.value);
    };

    const onSubmitClick = () => {
        if (Number.parseInt(value) === 0) {
            alert('0원을 기부할 수는 없습니다.');
            return;
        }
        if (targetPrice < fundrasingMoney + Number.parseInt(value)) {
            alert('모금액을 초과할 수 없습니다.');
            return;
        }
        axios
            .post(
                `http://localhost:8080/donation-of-project/pay/ready/${value}`,
                { projectId: projectId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                setTid(response.data.tid);
                window.open(
                    response.data.next_redirect_pc_url,
                    '결제',
                    'width=600, height=900, location=no, status=no, scrollbars=yes'
                );
                axios
                    .get(
                        'http://localhost:8080/donation-of-project/pay/get-result',
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then((response) => {
                        const status = response.data;
                        if (status === 'SUCCESS') {
                            window.location.reload();
                        } else if (status === 'CANCEL') {
                            alert('결제를 취소하였습니다.');
                            window.location.reload();
                        } else if (status === 'FAIL') {
                            alert('결제에 실패했습니다.');
                            window.location.reload();
                        }
                    })
                    .catch((error) => {});
            })
            .catch((error) => {
                console.log(error);
                if (error.response.data.code === 'M001') {
                    alert('한 프로젝트당 한 번 기부할 수 있습니다.');
                } else if (error.response.data.code === 'M003') {
                    alert('개인회원만 기부를 할 수 있습니다.');
                }
            });
    };
    return (
        <>
            <div className="w-1/2 h-300 z-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-700 bg-yellow-200 shadow-2xl">
                <div className="mt-10">
                    <span
                        className="text-2xl top-4 text-gray-600 tracking-wide
                    "
                    >
                        카카오 페이로 결제하기
                    </span>
                </div>
                <div className="mt-24">
                    <input
                        type="text"
                        placeholder="가격을 입력해주세요."
                        className="border-gray-300 rounded-xl px-4"
                        value={value}
                        onChange={onValueChange}
                    />
                    {isNotNumber && (
                        <div className="text-red-500 mt-3">
                            숫자만 입력해주세요.
                        </div>
                    )}
                </div>
                <div className="mt-10">
                    <button
                        type="button"
                        className="px-3 py-1.5 bg-blue-50 mr-4  rounded-lg duration-150 hover:duration-150 hover:bg-blue-200"
                        onClick={onSubmitClick}
                    >
                        입력
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-3 py-1.5 bg-blue-50 mr-4 rounded-lg duration-150 hover:duration-150 hover:bg-blue-200"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </>
    );
}
export default PayModal;
