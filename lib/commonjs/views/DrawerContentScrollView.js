"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawerContentScrollView = void 0;
var _native = require("@react-navigation/native");
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _DrawerPositionContext = require("../utils/DrawerPositionContext");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function DrawerContentScrollViewInner(_ref, ref) {
  let {
    contentContainerStyle,
    style,
    children,
    ...rest
  } = _ref;
  const drawerPosition = React.useContext(_DrawerPositionContext.DrawerPositionContext);
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    direction
  } = (0, _native.useLocale)();
  const isRight = direction === 'rtl' ? drawerPosition === 'left' : drawerPosition === 'right';
  return /*#__PURE__*/React.createElement(_reactNative.ScrollView, _extends({}, rest, {
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
const DrawerContentScrollView = exports.DrawerContentScrollView = /*#__PURE__*/React.forwardRef(DrawerContentScrollViewInner);
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=DrawerContentScrollView.js.map