import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

function KakaoFail() {
    const [cookies, setCookies, removeCookies] = useCookies('token');
    useEffect(() => {
        axios
            .get('http://localhost:8080/donation-of-project/pay/cancel', {
                headers: { Authorization: `Bearer ${cookies.token}` },
            })
            .then((response) => {
                window.close();
            })
            .catch((error) => {
                window.close();
            });
    }, []);
}
export default KakaoFail;
