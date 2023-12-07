/* eslint-disable react/prop-types */
import { useMap } from 'react-leaflet';

const SetViewOnDataChange = ({ data }) => {
    const map = useMap();
    map.setView(data?.location ? [data.location.lat, data.location.lng] : [4.60971, -74.08175], map.getZoom());

    return null;
}

export default SetViewOnDataChange
