"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabBarIcon = TabBarIcon;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _Badge = require("./Badge");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ICON_SIZE = 25;
function TabBarIcon(_ref) {
  let {
    route: _,
    horizontal,
    badge,
    badgeStyle,
    activeOpacity,
    inactiveOpacity,
    activeTintColor,
    inactiveTintColor,
    renderIcon,
    style
  } = _ref;
  // We render the icon twice at the same position on top of each other:
  // active and inactive one, so we can fade between them.
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [horizontal ? styles.iconHorizontal : styles.iconVertical, style]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.icon, {
      opacity: activeOpacity
    }]
  }, renderIcon({
    focused: true,
    size: ICON_SIZE,
    color: activeTintColor
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.icon, {
      opacity: inactiveOpacity
    }]
  }, renderIcon({
    focused: false,
    size: ICON_SIZE,
    color: inactiveTintColor
  })), /*#__PURE__*/_react.default.createElement(_Badge.Badge, {
    visible: badge != null,
    style: [styles.badge, badgeStyle],
    size: ICON_SIZE * 0.75
  }, badge));
}
const styles = _reactNative.StyleSheet.create({
  icon: {
    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them:
    // Cover the whole iconContainer:
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    // Workaround for react-native >= 0.54 layout bug
    minWidth: ICON_SIZE
  },
  iconVertical: {
    width: ICON_SIZE,
    height: ICON_SIZE
  },
  iconHorizontal: {
    width: ICON_SIZE,
    height: ICON_SIZE
  },
  badge: {
    position: 'absolute',
    end: -5,
    top: -5
  }
});
//# sourceMappingURL=TabBarIcon.js.map