function NoticeList({ value }) {
    const onNoticeClick = () => {
        window.location.href = `/notice/detail/${value.id}`;
    };
    return (
        <>
            <div className="my-10">
                <div
                    className="duration-150 shadow-lg h-28 w-9/12 text-center mx-auto hover:cursor-pointer hover:bg-gray-200 hover:duration-150"
                    onClick={onNoticeClick}
                >
                    <p className="text-gray-700 tracking-wide text-xl translate-y-5">
                        {value.title}
                    </p>
                    <p className="text-md text-gray-400 text-right mr-3 mt-4 translate-y-8">
                        &lt;{value.created_date.substring(0, 10)}&gt;
                    </p>
                </div>
            </div>
        </>
    );
}

export default NoticeList;
