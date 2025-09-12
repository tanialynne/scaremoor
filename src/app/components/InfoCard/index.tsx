import Image, { StaticImageData } from "next/image";

import BackgroundImage from "../../../../public/images/infoCardBackground.png";
import CircleYellow from "../../../../public/images/circle-yellow.svg";

type InfoCardProps = {
  cardIcon?: StaticImageData;
  cardIconFa?: string;
  cardTitle?: string;
  cardDescription: string;
  cardWidth?: string;
  descriptionTextSize?: string;
};

const InfoCard: React.FC<InfoCardProps> = ({ cardIcon, cardIconFa, cardTitle, cardDescription, cardWidth = "max-w-xl", descriptionTextSize }) => {
  return (
    <div className={`relative flex flex-col justify-start items-center text-center text-white ${cardWidth} isolate pb-8 pt-15 px-8 space-y-3 mx-auto h-full`}>
      <Image src={BackgroundImage} alt="background-image" className="absolute inset-0 -z-10 w-full h-full" />
      <div className="w-20 h-20 absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center">
        {cardIcon ? (
          <Image src={cardIcon} alt="info-icon" className="w-full h-full" />
        ) : cardIconFa ? (
          <>
            <Image src={CircleYellow} alt="circle background" className="w-full h-full" />
            <i className={`${cardIconFa} absolute text-black text-xl`}></i>
          </>
        ) : null}
      </div>
      {cardTitle && <h4 className="font-trickordead font-medium text-lg">{cardTitle}</h4>}
      <p className={descriptionTextSize || "text-white"}>{cardDescription}</p>
    </div>
  );
};

export default InfoCard;
