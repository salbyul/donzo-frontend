import { useEffect, useState } from 'react';

function DetailContent({ value }) {
    const [subtitle, setSubtitle] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
    }, [imageSrc]);
    useEffect(() => {
        setSubtitle(value.subtitle);
        setImageSrc(value.image);
        setContent(value.content);
    }, []);
    return (
        <>
            {loading && (
                <div className="w-full mx-auto">
                    <div className="text-2xl tracking-wide my-4">
                        {subtitle}
                    </div>
                    <div className="w-5/12 max-w-fit mx-auto my-4">
                        <img
                            src={`data:image/jpeg;base64,${imageSrc}`}
                            alt="error"
                        />
                    </div>
                    <textarea
                        className="text-xl tracking-wide text-gray-700 mb-20 border-none resize-none w-full h-fit hover:cursor-text"
                        disabled
                        value={content}
                    />
                </div>
            )}
        </>
    );
}
export default DetailContent;
