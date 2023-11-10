interface LogoProps {
  width: string;
}
const Logo = ({ width = "100px" }: LogoProps) => {
  return <div className={`w-[${width}]`}>Logo</div>;
};

export default Logo;
