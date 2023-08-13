import { BiSolidArrowToRight } from "react-icons/bi";
import { useWindowSize } from "@uidotdev/usehooks";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Box from "./Box";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
const IpForm = ({ setLocation }) => {
  const [data, setData] = useState({
    ip: "",
    location: "",
    timezone: "",
    isp: "",
  });
  const [loading, setLoading] = useState(false);
  const [IpAddress, setIpAddrress] = useState("");

  async function IpInfo() {
    try {
      const ipInfoResponse = await fetch(
        `https://ipinfo.io/json?token=${import.meta.env.VITE_TOKEN_API}`
      );
      const ipInfoResult = await ipInfoResponse.json();
      fetchingCurrentData(ipInfoResult, ipInfoResult.ip);
    } catch (error) {
      console.error("Something wrong:", error);
      setLoading(true);
    }
  }

  async function fetchingCurrentData(result, ipAdd) {
    try {
      const coordinates = result.loc;
      const coordinatesArray = coordinates.split(",");

      const ipLocationResponse = await fetch(
        `https://api.iplocation.net/?ip=${ipAdd}`
      );
      const ipLocationResult = await ipLocationResponse.json();
      const timeZoneFromAPI = result.timezone;

      const localDateTime = DateTime.now().setZone(timeZoneFromAPI);
      const utcOffset = localDateTime.toFormat("ZZZZ");
      setLocation((prev) => {
        return {
          ...prev,
          latitude: coordinatesArray[0],
          longitude: coordinatesArray[1],
        };
      });
      setData((prev) => {
        return {
          ...prev,
          ip: result.ip,
          location: result.city,
          isp: ipLocationResult.isp,
          timezone: utcOffset,
        };
      });
      setLoading(false);
    } catch (error) {
      console.error("Something wrong:", error);

      setLoading(true);
    }
  }

  async function searchIp() {
    try {
      const searchIp = await fetch(
        `https://ipinfo.io/${IpAddress}/json?token=${
          import.meta.env.VITE_TOKEN_API
        }`
      );

      const searchIpResult = await searchIp.json();
      fetchingCurrentData(searchIpResult, IpAddress);
    } catch (error) {
      console.error("Something wrong:", error);

      setLoading(true);
    }
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    searchIp();
  };

  useEffect(() => {
    // fetchLocationData();
    IpInfo();
  }, []);

  return (
    <>
      <div className='container z-10   h-full relative text-center py-3 gap-4 mx-auto'>
        <div className='mt-4'>
          <h1 className='font-bold text-3xl text-white'>IP Address Tracker</h1>
        </div>
        <form onSubmit={handleSumbit}>
          <div className='flex mt-5 justify-center items-center'>
            <input
              placeholder='type IP here 192.168.xxx.xxx'
              className=' w-[65%] lg:w-[380px]  rounded-tl-md rounded-bl-md outline-none px-4 py-[8px]'
              type='text'
              onChange={(e) => setIpAddrress(e.target.value)}
            />
            <button
              type='submit'
              className='px-4 text-2xl text-white py-[8px] bg-black rounded-tr-md rounded-br-md'
            >
              <BiSolidArrowToRight />
            </button>
          </div>
        </form>

        {loading ? (
          <button
            type='button'
            className=' bg-black p-2  rounded-md text-white my-8 ...'
            disabled
          >
            <AiOutlineLoading3Quarters className=' text-2xl  my-2 animate-spin' />
            Processing...
          </button>
        ) : (
          <div className='box-info hover:opacity-40 cursor-pointer  gap-3 text-center lg:text-left rounded-md w-[80%] mx-auto mt-8 grid grid-cols-1 lg:grid-cols-4 p-6 delay-500 duration-500 transition bg-white shadow-xl'>
            <Box title={"IP Address"} value={data.ip} border={true} />
            <Box title={"Location"} value={data.location} border={true} />
            <Box title={"TimeZone"} value={data.timezone} border={true} />
            <Box title={"ISP"} value={data.isp} />
          </div>
        )}
      </div>
    </>
  );
};

export default IpForm;
