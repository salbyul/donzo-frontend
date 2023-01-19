function Error404() {
    return (
        <>
            <div className="w-9/12 h-screen mx-auto text-center py-16">
                <div className="w-fit h-fit py-10 px-10 shadow-lg mx-auto bg-green-50 mt-40 duration-150 hover:duration-150 hover:bg-green-100">
                    <div className="w-full py-10">
                        <img
                            src="/img/error404.png"
                            alt="logo"
                            className="mx-auto"
                        />
                    </div>
                    <div className="mt-5 pb-10">
                        <p className="text-gray-700 text-4xl font-bold tracking-wider duration-150 hover:duration-150 hover:text-green-600">
                            페이지를 찾을 수 없습니다.
                        </p>
                        <p className="text-green-600 text-3xl font-semibold tracking-wide duration-150 hover:duration-150 hover:text-gray-700">
                            404 Error Page
                        </p>
                        <p className="text-lg text-gray-700 tracking-wide">
                            잘못된 접근이거나 페이지가 장애에 있습니다.
                        </p>
                        <p className="text-md text-gray-700 tracking-wide">
                            관리자에게 연락해주세요. 010-8900-7846 김홍섭
                            (관리자)
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Error404;
