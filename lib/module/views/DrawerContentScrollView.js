function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { useLocale } from '@react-navigation/native';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerPositionContext } from '../utils/DrawerPositionContext';
function DrawerContentScrollViewInner(_ref, ref) {
  let {
    contentContainerStyle,
    style,
    children,
    ...rest
  } = _ref;
  const drawerPosition = React.useContext(DrawerPositionContext);
  const insets = useSafeAreaInsets();
  const {
    direction
  } = useLocale();
  const isRight = direction === 'rtl' ? drawerPosition === 'left' : drawerPosition === 'right';
  return /*#__PURE__*/React.createElement(ScrollView, _extends({}, rest, {
    ref: ref,
    contentContainerStyle: [{
      paddingTop: insets.top + 10,
      paddingBottom: insets.bottom + 10,
      paddingStart: !isRight ? insets.left : 0,
      paddingEnd: isRight ? insets.right : 0
    }, contentContainerStyle],
    style: [styles.container, style]
  }), children);
}
export const DrawerContentScrollView = /*#__PURE__*/React.forwardRef(DrawerContentScrollViewInner);
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=DrawerContentScrollView.js.map