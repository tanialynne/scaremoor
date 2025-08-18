import Image from "next/image";

import { List } from "@/app/constants/Lists";

import BackgroundImage from "../../../../public/images/infoCardBackground.png";

type InfoCardProps = List & {
  cardWidth?: string;
  descriptionTextSize?: string;
};

const InfoCard: React.FC<InfoCardProps> = ({ cardIcon, cardTitle, cardDescription, cardWidth = "max-w-xl", descriptionTextSize }) => {
  return (
    <div className={`relative flex flex-col justify-center items-center text-center text-white ${cardWidth} isolate pb-8 pt-15  px-8 space-y-3 mx-auto h-full min-h-60`}>
      <Image src={BackgroundImage} alt="background-image" className="absolute inset-0 -z-10 w-full h-full" />
      <div className="w-20 h-20 absolute -top-10 left-1/2 -translate-x-1/2">
        <Image src={cardIcon} alt="info-icon" className="inline-block w-full h-full" />
      </div>
      {cardTitle && <h4 className="font-medium text-xl">{cardTitle}</h4>}
      <p className={descriptionTextSize}>{cardDescription}</p>
    </div>
  );
};

export default InfoCard;
