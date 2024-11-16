import IcoMoon, { IconProps } from "react-icomoon";
import IconSet from "@/assets/icon.json";
import { Path, Svg } from "react-native-svg";
import { IconNames } from "@/lib/icon";

interface Props extends Omit<IconProps, "icon"> {
  icon: IconNames;
}

const Icon = (props: Props) => (
  <IcoMoon
    native
    SvgComponent={Svg}
    PathComponent={(pathProps) => <Path {...pathProps} fill={props.color} />} // Explicitly set the fill color
    iconSet={IconSet}
    {...props}
  />
);

export default Icon;
