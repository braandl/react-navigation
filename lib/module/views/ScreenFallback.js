function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { ResourceSavingView } from '@react-navigation/elements';
import * as React from 'react';
import { View } from 'react-native';
let Screens;
try {
  Screens = require('react-native-screens');
} catch (e) {
  // Ignore
}
export const MaybeScreenContainer = _ref => {
  let {
    enabled,
    ...rest
  } = _ref;
  if (Screens?.screensEnabled?.()) {
    return /*#__PURE__*/React.createElement(Screens.ScreenContainer, _extends({
      enabled: enabled
    }, rest));
  }
  return /*#__PURE__*/React.createElement(View, rest);
};
export function MaybeScreen(_ref2) {
  let {
    visible,
    children,
    ...rest
  } = _ref2;
  if (Screens?.screensEnabled?.()) {
    return /*#__PURE__*/React.createElement(Screens.Screen, _extends({
      activityState: visible ? 2 : 0
    }, rest), children);
  }
  return /*#__PURE__*/React.createElement(ResourceSavingView, _extends({
    visible: visible
  }, rest), children);
}
//# sourceMappingURL=ScreenFallback.js.map