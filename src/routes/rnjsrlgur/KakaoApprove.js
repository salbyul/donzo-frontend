import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';

function KakaoApprove() {
    const location = useLocation();
    const [cookies, setCookies, removeCookies] = useCookies('token');

    useEffect(() => {
        const pgToken = location.search.substring(10);
        axios
            .post(
                'http://localhost:8080/donation-of-project/pay/completed',
                {
                    pgToken,
                },
                { headers: { Authorization: `Bearer ${cookies.token}` } }
            )
            .then((response) => {
                window.close();
            })
            .catch((error) => {});
        console.log(location);
    }, []);
}
export default KakaoApprove;
