import "./Background.css";
import { useMantineTheme } from "@mantine/core";

import blue2 from "../assets/Cards/Blue_2.png";
import green5 from "../assets/Cards/Green_5.png";
import red9 from "../assets/Cards/Red_9.png";
import yellow0 from "../assets/Cards/Yellow_0.png";
import blue3 from "../assets/Cards/Blue_3.png";
import green4 from "../assets/Cards/Green_4.png";
import red7 from "../assets/Cards/Red_7.png";
import yellow1 from "../assets/Cards/Yellow_1.png";
import wild from "../assets/Cards/Wild.png";
import wild4 from "../assets/Cards/Wild_Draw.png";
import yellow8 from "../assets/Cards/Yellow_8.png";
import blue6 from "../assets/Cards/Blue_6.png";

const cardsPics = [
  blue2,
  green5,
  red9,
  yellow0,
  blue3,
  green4,
  red7,
  yellow1,
  wild,
  wild4,
  yellow8,
  blue6,
  wild,
];

function Background() {
  const theme = useMantineTheme();

  return (
    <div
      className="area"
      style={{
        backgroundColor: theme.colors.red[8],
      }}
    >
      <div className="cards">
        {cardsPics.map((card, i) => {
          return <img key={i} src={card} alt="uno card pics" />;
        })}
      </div>
    </div>
  );
}

export default Background;
