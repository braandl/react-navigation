function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { getLabel, Label, PlatformPressable } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import Color from 'color';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { TabBarIcon } from './TabBarIcon';
export function BottomTabItem(_ref) {
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
      return /*#__PURE__*/React.createElement(PlatformPressable, _extends({}, rest, {
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
  } = useTheme();
  const activeTintColor = customActiveTintColor === undefined ? colors.primary : customActiveTintColor;
  const inactiveTintColor = customInactiveTintColor === undefined ? Color(colors.text).mix(Color(colors.card), 0.5).hex() : customInactiveTintColor;
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
      const children = getLabel({
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
    return /*#__PURE__*/React.createElement(Label, {
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
    return /*#__PURE__*/React.createElement(TabBarIcon, {
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
    accessibilityRole: Platform.select({
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
    children: /*#__PURE__*/React.createElement(React.Fragment, null, renderIcon(scene), renderLabel(scene))
  });
}
const styles = StyleSheet.create({
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