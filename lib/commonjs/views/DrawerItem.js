"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawerItem = DrawerItem;
var _elements = require("@react-navigation/elements");
var _native = require("@react-navigation/native");
var _color = _interopRequireDefault(require("color"));
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * A component used to show an action item with an icon and a label in a navigation drawer.
 */
function DrawerItem(props) {
  const {
    colors,
    fonts
  } = (0, _native.useTheme)();
  const {
    href,
    icon,
    label,
    labelStyle,
    focused = false,
    allowFontScaling,
    activeTintColor = colors.primary,
    inactiveTintColor = (0, _color.default)(colors.text).alpha(0.68).rgb().string(),
    activeBackgroundColor = (0, _color.default)(activeTintColor).alpha(0.12).rgb().string(),
    inactiveBackgroundColor = 'transparent',
    style,
    onPress,
    pressColor,
    pressOpacity,
    testID,
    accessibilityLabel,
    ...rest
  } = props;
  const {
    borderRadius = 56
  } = _reactNative.StyleSheet.flatten(style || {});
  const color = focused ? activeTintColor : inactiveTintColor;
  const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;
  const iconNode = icon ? icon({
    size: 24,
    focused,
    color
  }) : null;
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({
    collapsable: false
  }, rest, {
    style: [styles.container, {
      borderRadius,
      backgroundColor
    }, style]
  }), /*#__PURE__*/React.createElement(_elements.PlatformPressable, {
    testID: testID,
    onPress: onPress,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    accessibilityState: {
      selected: focused
    },
    pressColor: pressColor,
    pressOpacity: pressOpacity,
    href: href
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.wrapper, {
      borderRadius
    }]
  }, iconNode, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.label, {
      marginStart: iconNode ? 16 : 0
    }]
  }, typeof label === 'string' ? /*#__PURE__*/React.createElement(_elements.Text, {
    numberOfLines: 1,
    allowFontScaling: allowFontScaling,
    style: [styles.labelText, {
      color
    }, fonts.medium, labelStyle]
  }, label) : label({
    color,
    focused
  })))));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 2,
    overflow: 'hidden'
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingStart: 16,
    paddingEnd: 24
  },
  label: {
    marginEnd: 12,
    marginVertical: 4,
    flex: 1
  },
  labelText: {
    lineHeight: 24,
    textAlignVertical: 'center'
  }
});
//# sourceMappingURL=DrawerItem.js.map