import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
import DonationLayout from '../../components/3indy/DonationLayout';
import { ScaleLoader } from 'react-spinners';

function Search() {
    //이걸로 프로젝트 db에서 title로 검색해서 빼오기
    const [inputSearch, setInputSearch] = useState('');
    const [loading, setLoading] = useState(false);

    //내용들 하나의 배열로 만들어서 받아오세요! 뭐 가져와야하는지는 donationlayout에 있음
    const [projectList, setProjectList] = useState([]);

    // 나중에 이거 살리세요!!
    useEffect(() => {
        axios
            .get('http://localhost:8080/project-board/search')
            .then((response) => {
                setProjectList(response.data);
            })
            .catch((error) => {});
    }, []);

    const onSearchChange = (e) => {
        setInputSearch(e.target.value);
    };

    const onEnterKeyDown = (e) => {
        if (e.code === 'Enter') {
            onSubmitClick();
        }
    };

    const onSubmitClick = () => {
        setLoading(true);
        axios
            .get(`http://localhost:8080/project-board/search?s=${inputSearch}`)
            .then((response) => {
                setProjectList(response.data);
                setLoading(false);
            })
            .catch((error) => {});
    };

    return (
        <>
            <div className="py-12 min-h-screen">
                <div className="w-1200 mx-auto border-b-2">
                    <label htmlFor="search" className="relative">
                        <div className="bg-gray-100 rounded-full w-full my-12 h-20 border-gray-100 text-2xl mx-auto">
                            <button
                                onClick={onSubmitClick}
                                className="absolute mt-6 mx-8"
                            >
                                <BsSearch size="30" />
                            </button>
                            <input
                                id="search"
                                placeholder="검색어를 입력하세요."
                                value={inputSearch}
                                onChange={onSearchChange}
                                onKeyDown={onEnterKeyDown}
                                className="focus:outline-none bg-gray-100 w-5/6 mx-20 h-20 border-gray-100 text-2xl"
                            ></input>
                        </div>
                    </label>
                </div>
                <div className=" w-9/12 mx-auto">
                    <div className="my-4">
                        <div className="text-center">
                            {loading && <ScaleLoader color="#36d7b7" />}
                        </div>
                        <div className="mx-auto">
                            <ul className="flex flex-col flex-wrap mt-4 font-medium lg:flex-row lg:mt-0 w-1200 mx-auto">
                                {!loading &&
                                    projectList.map((value) => {
                                        return (
                                            <DonationLayout
                                                projectList={value}
                                                key={projectList.indexOf(value)}
                                            />
                                        );
                                    })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Search;
