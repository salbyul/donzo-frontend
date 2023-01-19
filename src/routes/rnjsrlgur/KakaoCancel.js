import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

function KakaoCancel() {
    const [cookies, setCookies, removeCookies] = useCookies('token');
    useEffect(() => {
        axios
            .get('http://localhost:8080/donation-of-project/pay/fail', {
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
export default KakaoCancel;
