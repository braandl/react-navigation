"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBottomTabNavigator = createBottomTabNavigator;
var _native = require("@react-navigation/native");
var React = _interopRequireWildcard(require("react"));
var _BottomTabView = require("../views/BottomTabView");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  } = (0, _native.useNavigationBuilder)(_native.TabRouter, {
    id,
    initialRouteName,
    backBehavior,
    children,
    layout,
    screenListeners,
    screenOptions,
    UNSTABLE_getStateForRouteNamesChange
  });
  return /*#__PURE__*/React.createElement(NavigationContent, null, /*#__PURE__*/React.createElement(_BottomTabView.BottomTabView, _extends({}, rest, {
    state: state,
    navigation: navigation,
    descriptors: descriptors,
    sceneContainerStyle: sceneContainerStyle
  })));
}
function createBottomTabNavigator(config) {
  return (0, _native.createNavigatorFactory)(BottomTabNavigator)(config);
}
//# sourceMappingURL=createBottomTabNavigator.js.map