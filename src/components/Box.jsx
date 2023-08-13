import { useWindowSize } from "@uidotdev/usehooks";

const Box = ({ title, value, border }) => {
  const size = useWindowSize();
  return (
    <div
      className={`${
        border && size.width > 1024 ? "border-r-2 border-grays" : ""
      }`}
    >
      <h4 className=' font-medium  text-grays'>{title}</h4>
      <h1 className='text-2xl font-medium py-2'>{value}</h1>
    </div>
  );
};

export default Box;
