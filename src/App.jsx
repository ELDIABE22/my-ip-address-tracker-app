import { useState } from "react";
import MapContenedor from "./components/MapContenedor"
import axios from 'axios'
import Swal from "sweetalert2";

function App() {
  const [ipAdress, setIpAdress] = useState('');
  const [data, setData] = useState(JSON.parse(localStorage.getItem('dataIpAdress')) || {});

  const handleChange = (e) => {
    const { value } = e.target
    setIpAdress(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ipAdress === '') {
      return Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Ingresa una dirección ip o dominio válido!",
      });
    }

    const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_Bn37UteSjM7sSv7Hp3HJg2TNhivXW&ipAddress=`

    axios.get(apiUrl + ipAdress)
      .then(response => {
        setData(response.data);
        localStorage.setItem('dataIpAdress', JSON.stringify(response.data));
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: "La dirección ip o dominio no existe!",
        });
      })

    setIpAdress('');
  }

  return (
    <div className='relative h-screen overflow-auto'>

      <div className="bg-[url('./assets/pattern-bg-mobile.png')] bg-no-repeat sm:bg-[url('./assets/pattern-bg-desktop.png')] w-full h-[45%] sm:h-[35%] bg-cover bg-center " />

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full z-50 text-center p-4">
        <h1 className=" text-xl sm:text-2xl pb-4 sm:pb-6 font-medium text-white">Rastreador de direcciones IP</h1>

        <form className='flex pb-5 sm:pb-9 min-w-[250px] max-w-[450px] mx-auto' onSubmit={handleSubmit}>
          <label htmlFor="ip" className="flex bg-white py-2 px-4 rounded-tl-xl rounded-bl-xl w-full cursor-pointer">
            <input
              type="text"
              id="ip"
              placeholder="Busque cualquier dirección IP o dominio"
              className="text-sm outline-none w-full cursor-pointer"
              value={ipAdress}
              onChange={handleChange}
            />
          </label>
          <button className="bg-black p-[18px] hover:bg-very-dark-gray rounded-tr-xl rounded-br-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
              <path fill="none" stroke="white" strokeWidth="3" d="M2 1l6 6-6 6" />
            </svg>
          </button>
        </form>

        <div className="bg-white rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-5 p-4 sm:p-6 max-w-[1000px] mx-auto">
          <div className="sm:border-r border-dark-gray sm:pr-10 text-center sm:text-left">
            <span className="text-dark-gray text-[9px] lg:text-[11px] md:text-[10px] text-left font-medium tracking-widest">DIRECCIÓN IP</span>
            <p className="font-medium text-lg lg:text-2xl md:text-base sm:text-sm">
              {data?.ip || '192.212.174.101'}
            </p>
          </div>
          <div className="sm:border-r border-dark-gray sm:pr-10 text-center sm:text-left">
            <span className="text-dark-gray text-[9px] lg:text-[11px] md:text-[10px] font-medium tracking-widest">UBICACIÓN</span>
            <p className="font-medium text-lg lg:text-2xl md:text-base sm:text-sm ">
              {data?.location ? `${data.location.city}, ${data.location.region}` : 'Distrito Capital de Bogotá, Bogotá'}
            </p>
          </div>
          <div className="sm:border-r border-dark-gray sm:pr-10 text-center sm:text-left">
            <span className="text-dark-gray text-[9px] lg:text-[11px] md:text-[10px] font-medium tracking-widest">ZONA HORARIA</span>
            <p className="font-medium text-lg lg:text-2xl md:text-base sm:text-sm">
              UTC{data?.location ? data.location.timezone : '-05:00'}
            </p>
          </div>
          <div className="sm:text-left sm:pr-10 text-center">
            <span className="text-dark-gray text-[9px] lg:text-[11px] md:text-[10px] font-medium tracking-widest">IPS</span>
            <p className="font-medium text-lg lg:text-2xl md:text-base sm:text-sm">
              {data?.isp || 'Colombia Telecomunicaciones S.a. ESP'}
            </p>
          </div>
        </div>

      </div>

      <MapContenedor data={data} />
    </div>
  )
}

export default App
