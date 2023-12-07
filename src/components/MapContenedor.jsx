/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import SetViewOnDataChange from './SetViewOnDataChange';

const MapContenedor = ({ data }) => {
    return (
        <MapContainer className='h-[55%] sm:h-[65%] w-full z-30' center={data.location ? [data.location.lat, data.location.lng] : [4.60971, -74.08175]} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={data.location ? [data.location.lat, data.location.lng] : [4.60971, -74.08175]} />
            <SetViewOnDataChange data={data} />
        </MapContainer>
    )
}

export default MapContenedor