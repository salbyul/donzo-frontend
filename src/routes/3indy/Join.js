import { Link } from 'react-router-dom';

function Join() {
    return (
        <>
            <div className="bg-gray-50">
                <div className="bg-gray-50 py-12 w-9/12 h-screen mx-auto">
                    <div className="text-center">
                        <div className="font-extrabold text-green-700 text-3xl mt-12">
                            {' '}
                            Welcome!{' '}
                        </div>
                        <div className="text-xl mt-2">
                            {' '}
                            Doneasy에 오신것을 환영합니다.{' '}
                        </div>
                        <div className="mx-auto mt-12 w-1/2 mb-12">
                            <ul className="flex flex-col mt-4 justify-center font-medium lg:flex-row lg:space-x-2 lg:mt-0">
                                <Link to={'/join/personal'} className="w-fit">
                                    <img
                                        alt=""
                                        className="object-center w-300 mx-auto"
                                        src="/img/one.png"
                                    ></img>
                                </Link>
                                <Link to={'/join/group'} className="w-fit">
                                    <img
                                        alt=""
                                        className="object-center w-300 mx-auto"
                                        src="/img/all.png"
                                    ></img>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Join;
