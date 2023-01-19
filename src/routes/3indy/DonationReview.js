import TitleForReview from '../../components/3indy/TitleForReview';
import DonationLayoutForReview from '../../components/3indy/DonationLayoutForReview';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

function DonationReview() {
    const [category, setCategory] = useState('ALL');
    //내용들 하나의 배열로 만들어서 받아오세요! 뭐 가져와야하는지는 donationlayout에 있음
    const [projectList, setProjectList] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (projectList.length >= 1) {
            setLoading(true);
        }
    }, [projectList]);
    useEffect(() => {
        const categoryId = location.pathname.substring(21);
        if (categoryId === '1') {
            setCategory('ALL');
        } else if (categoryId === '2') {
            setCategory('CHILDREN');
        } else if (categoryId === '3') {
            setCategory('TEENAGER');
        } else if (categoryId === '4') {
            setCategory('ELDER_PEOPLE');
        } else if (categoryId === '5') {
            setCategory('THE_DISABLED');
        } else if (categoryId === '6') {
            setCategory('ENVIRONMENT');
        } else if (categoryId === '7') {
            setCategory('SOCIETY');
        }
    }, [location.pathname]);
    useEffect(() => {
        axios
            .post(
                `http://localhost:8080/project-board/find-all-donated/${category}`
            )
            .then((response) => {
                setProjectList(response.data);
            })
            .catch((error) => {});
    }, [category]);

    return (
        <>
            <TitleForReview />
            {!loading ? (
                <div className="text-center">
                    <ScaleLoader color="#36d7b7" />
                </div>
            ) : (
                <div>
                    <div className="hidden">{category}</div>
                    <div className="py-6">
                        <div className=" w-9/12 mx-auto">
                            <div className="my-4">
                                <div className="mx-auto">
                                    <ul className="flex flex-col flex-wrap mt-4 font-medium lg:flex-row lg:mt-0 w-1200 mx-auto">
                                        {loading &&
                                            projectList.map((value) => {
                                                return (
                                                    <DonationLayoutForReview
                                                        projectList={value}
                                                        key={value.project_id}
                                                    />
                                                );
                                            })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default DonationReview;
