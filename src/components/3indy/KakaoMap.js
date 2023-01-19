/*global kakao*/
import React, { useEffect } from 'react';

const KakaoMap = () => {
    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(
                37.404950813901166,
                127.10595519976732
            ),
            level: 3,
        };

        var map = new kakao.maps.Map(container, options);
        var markerPosition = new kakao.maps.LatLng(
            37.404950813901166,
            127.10595519976732
        );
        var marker = new kakao.maps.Marker({
            position: markerPosition,
        });
        marker.setMap(map);
    }, []);

    return (
        <div>
            <div
                id="map"
                style={{ width: '400px', height: '300px' }}
                className="mx-auto"
            ></div>
        </div>
    );
};

export default KakaoMap;
