import Image from "next/image";

import { List } from "@/app/constants/Lists";

import BackgroundImage from "../../../../public/images/icons/listCardBackground.png";

type ListCardProps = List;

const ListCard: React.FC<ListCardProps> = ({ cardIcon, cardTitle, cardDescription }) => {
  return (
    <div className="relative flex items-center text-white max-w-full min-h-35 isolate py-4 pl-18 pr-5 space-y-3">
      <Image src={BackgroundImage} alt="background-image" className="absolute inset-0 -z-10 w-full h-full" />
      <div className="flex text-start">
        <div className="w-20 h-20 absolute -left-6 top-1/2 -translate-y-1/2">
          <Image src={cardIcon} alt="info-icon" className="inline-block w-full h-full" />
        </div>
        <div>
          <h4 className="font-medium text-xl pb-2">{cardTitle}</h4>
          <p className="text-base">{cardDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
