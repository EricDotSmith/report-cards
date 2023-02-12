import styles from "./DotLoader.module.css";

interface DotLoaderProps {
  color?: string;
}

const DotLoader: React.FC<DotLoaderProps> = (props) => {
  const { color } = props;
  return (
    <div className={`${styles.loaderDots} relative block h-5 w-20`}>
      <div
        className={`absolute top-0 mt-1 h-3 w-3 rounded-full ${
          color ?? "bg-white"
        }`}
      ></div>
      <div
        className={`absolute top-0 mt-1 h-3 w-3 rounded-full ${
          color ?? "bg-white"
        }`}
      ></div>
      <div
        className={`absolute top-0 mt-1 h-3 w-3 rounded-full ${
          color ?? "bg-white"
        }`}
      ></div>
      <div
        className={`absolute top-0 mt-1 h-3 w-3 rounded-full ${
          color ?? "bg-white"
        }`}
      ></div>
    </div>
  );
};

export default DotLoader;
