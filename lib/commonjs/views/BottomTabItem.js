"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomTabItem = BottomTabItem;
var _elements = require("@react-navigation/elements");
var _native = require("@react-navigation/native");
var _color = _interopRequireDefault(require("color"));
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _TabBarIcon = require("./TabBarIcon");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function BottomTabItem(_ref) {
  let {
    route,
    href,
    focused,
    descriptor,
    label,
    icon,
    badge,
    badgeStyle,
    button = _ref2 => {
      let {
        href,
        children,
        style,
        onPress,
        accessibilityRole,
        ...rest
      } = _ref2;
      return /*#__PURE__*/_react.default.createElement(_elements.PlatformPressable, _extends({}, rest, {
        android_ripple: {
          borderless: true
        },
        pressOpacity: 1,
        href: href,
        accessibilityRole: accessibilityRole,
        onPress: onPress,
        style: style
      }), children);
    },
    accessibilityLabel,
    testID,
    onPress,
    onLongPress,
    horizontal,
    activeTintColor: customActiveTintColor,
    inactiveTintColor: customInactiveTintColor,
    activeBackgroundColor = 'transparent',
    inactiveBackgroundColor = 'transparent',
    showLabel = true,
    allowFontScaling,
    labelStyle,
    iconStyle,
    style
  } = _ref;
  const {
    colors
  } = (0, _native.useTheme)();
  const activeTintColor = customActiveTintColor === undefined ? colors.primary : customActiveTintColor;
  const inactiveTintColor = customInactiveTintColor === undefined ? (0, _color.default)(colors.text).mix((0, _color.default)(colors.card), 0.5).hex() : customInactiveTintColor;
  const renderLabel = _ref3 => {
    let {
      focused
    } = _ref3;
    if (showLabel === false) {
      return null;
    }
    const color = focused ? activeTintColor : inactiveTintColor;
    if (typeof label !== 'string') {
      const {
        options
      } = descriptor;
      const children = (0, _elements.getLabel)({
        label: typeof options.tabBarLabel === 'string' ? options.tabBarLabel : undefined,
        title: options.title
      }, route.name);
      return label({
        focused,
        color,
        position: horizontal ? 'beside-icon' : 'below-icon',
        children
      });
    }
    return /*#__PURE__*/_react.default.createElement(_elements.Label, {
      style: [horizontal ? styles.labelBeside : styles.labelBeneath, labelStyle],
      allowFontScaling: allowFontScaling,
      tintColor: color
    }, label);
  };
  const renderIcon = _ref4 => {
    let {
      focused
    } = _ref4;
    if (icon === undefined) {
      return null;
    }
    const activeOpacity = focused ? 1 : 0;
    const inactiveOpacity = focused ? 0 : 1;
    return /*#__PURE__*/_react.default.createElement(_TabBarIcon.TabBarIcon, {
      route: route,
      horizontal: horizontal,
      badge: badge,
      badgeStyle: badgeStyle,
      activeOpacity: activeOpacity,
      inactiveOpacity: inactiveOpacity,
      activeTintColor: activeTintColor,
      inactiveTintColor: inactiveTintColor,
      renderIcon: icon,
      style: iconStyle
    });
  };
  const scene = {
    route,
    focused
  };
  const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;
  return button({
    href,
    onPress,
    onLongPress,
    testID,
    accessibilityLabel,
    // FIXME: accessibilityRole: 'tab' doesn't seem to work as expected on iOS
    accessibilityRole: _reactNative.Platform.select({
      ios: 'button',
      default: 'tab'
    }),
    accessibilityState: {
      selected: focused
    },
    // @ts-expect-error: keep for compatibility with older React Native versions
    accessibilityStates: focused ? ['selected'] : [],
    style: [styles.tab, {
      backgroundColor
    }, horizontal ? styles.tabLandscape : styles.tabPortrait, style],
    children: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderIcon(scene), renderLabel(scene))
  });
}
const styles = _reactNative.StyleSheet.create({
  tab: {
    alignItems: 'center'
  },
  tabPortrait: {
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },
  tabLandscape: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  labelBeneath: {
    fontSize: 10
  },
  labelBeside: {
    fontSize: 13,
    marginStart: 20
  }
});
//# sourceMappingURL=BottomTabItem.js.map