import Image from "next/image";

const TokenLogo = ({ identifier }: { identifier: string }) => {
  const logoUrl =
    identifier === "EGLD"
      ? "/rebalance/public/logo/logo_egld.svg"
      : `https://raw.githubusercontent.com/multiversx/mx-assets/master/tokens/${identifier}/logo.svg`;

  return (
    <div>
      <Image src={logoUrl} alt={identifier} />
    </div>
  );
};

export default TokenLogo;
