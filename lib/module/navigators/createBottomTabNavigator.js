function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { createNavigatorFactory, TabRouter, useNavigationBuilder } from '@react-navigation/native';
import * as React from 'react';
import { BottomTabView } from '../views/BottomTabView';
function BottomTabNavigator(_ref) {
  let {
    id,
    initialRouteName,
    backBehavior,
    children,
    layout,
    screenListeners,
    screenOptions,
    sceneContainerStyle,
    UNSTABLE_getStateForRouteNamesChange,
    ...rest
  } = _ref;
  const {
    state,
    descriptors,
    navigation,
    NavigationContent
  } = useNavigationBuilder(TabRouter, {
    id,
    initialRouteName,
    backBehavior,
    children,
    layout,
    screenListeners,
    screenOptions,
    UNSTABLE_getStateForRouteNamesChange
  });
  return /*#__PURE__*/React.createElement(NavigationContent, null, /*#__PURE__*/React.createElement(BottomTabView, _extends({}, rest, {
    state: state,
    navigation: navigation,
    descriptors: descriptors,
    sceneContainerStyle: sceneContainerStyle
  })));
}
export function createBottomTabNavigator(config) {
  return createNavigatorFactory(BottomTabNavigator)(config);
}
//# sourceMappingURL=createBottomTabNavigator.js.map