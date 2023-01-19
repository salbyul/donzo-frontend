import { useEffect, useState } from 'react';

//나중에 test 지우기
function DonationLayout({ projectList }) {
    //PROJECTPROPOSAL DB에서 꺼내올 내용
    const [projectId, setProjectId] = useState(0);
    const [title, setTitle] = useState('');
    const [targetPrice, setTargetPrice] = useState(0);
    const [organizationId, setOrganizationId] = useState(0); // organizationID로 단체 명 찾아오세요

    //Project DB에서 꺼내오는 status! 진행중(active)인지 아닌지(done)
    const [status, setStatus] = useState('');

    // ContentOfProject DB에서 꺼내올 이미지.. PROJECTPROPOSAL의 id로 찾아올듯? 이미지 자체를 보내주세요 이름말고
    const [image, setImage] = useState('');

    //프로젝트 기부, 프로젝트 응원, 프로젝트 댓글 db에서 price 다 뽑아와서 합치세요ㅎㅎ
    const [donationPrice, setDonationPrice] = useState(0);

    //나중에 데이터 받아오면 이거 살리세요 밑에거 지우고
    useEffect(() => {
        setProjectId(projectList.project_id);
        setTitle(projectList.project_title);
        setTargetPrice(projectList.target_price);
        setOrganizationId(projectList.organization_nickname);
        setStatus(projectList.project_status);
        setImage(projectList.project_image);
        setDonationPrice(projectList.present_price);
    }, []);

    return (
        <>
            <li className="w-300 mt-6 mb-6">
                <div className="relative">
                    <button
                        className="py-2 absolute mt-3 mx-3 w-24 shadow-md rounded-2xl bg-black opacity-60 text-white text-center whitespace-nowrap font-medium"
                        alt="진행 상태"
                        hidden={status !== 'DONE'}
                    >
                        종료
                    </button>
                    <a
                        href={
                            status === 'DONE'
                                ? `/project-review/detail/${projectId}`
                                : `/project/detail/${projectId}`
                        }
                    >
                        <img
                            alt="대표 이미지"
                            src={`data:image/*;base64,${image}`} //이거 살려서 쓰세요 위에거 지우고
                            className="h-48 w-80 mt-8 rounded-xl"
                        ></img>
                    </a>
                </div>
                <div
                    className="my-2 w-80 whitespace-nowrap text-lg font-bold text-gray-500"
                    alt="프로젝트 명"
                >
                    {title}
                </div>
                <div
                    className="my-2 w-80 whitespace-nowrap text-sm font-medium text-gray-400"
                    alt="단체 이름"
                >
                    {organizationId}
                </div>
                <div
                    className="my-2 w-80 text-right whitespace-nowrap text-sm font-medium text-gray-900"
                    alt="달성 금액 / 목표금액 "
                >
                    {' '}
                    <div className="text-green-500 inline-block">
                        {donationPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </div>{' '}
                    /{' '}
                    {targetPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    원
                </div>
            </li>
        </>
    );
}
export default DonationLayout;
