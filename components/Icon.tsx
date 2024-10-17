import IcoMoon, { IconProps } from 'react-icomoon';
import iconSet from '@/assets/icon/selection.json';
import { Path, Svg } from 'react-native-svg';

const Icon = (props: IconProps) => (
  <IcoMoon
    native
    SvgComponent={Svg}
    PathComponent={(pathProps) => <Path {...pathProps} fill={props.color} />} // Explicitly set the fill color
    iconSet={iconSet}
    {...props}
  />
);

export default Icon;
