function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { PlatformPressable, Text } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import Color from 'color';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
/**
 * A component used to show an action item with an icon and a label in a navigation drawer.
 */
export function DrawerItem(props) {
  const {
    colors,
    fonts
  } = useTheme();
  const {
    href,
    icon,
    label,
    labelStyle,
    focused = false,
    allowFontScaling,
    activeTintColor = colors.primary,
    inactiveTintColor = Color(colors.text).alpha(0.68).rgb().string(),
    activeBackgroundColor = Color(activeTintColor).alpha(0.12).rgb().string(),
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
  } = StyleSheet.flatten(style || {});
  const color = focused ? activeTintColor : inactiveTintColor;
  const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;
  const iconNode = icon ? icon({
    size: 24,
    focused,
    color
  }) : null;
  return /*#__PURE__*/React.createElement(View, _extends({
    collapsable: false
  }, rest, {
    style: [styles.container, {
      borderRadius,
      backgroundColor
    }, style]
  }), /*#__PURE__*/React.createElement(PlatformPressable, {
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
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.wrapper, {
      borderRadius
    }]
  }, iconNode, /*#__PURE__*/React.createElement(View, {
    style: [styles.label, {
      marginStart: iconNode ? 16 : 0
    }]
  }, typeof label === 'string' ? /*#__PURE__*/React.createElement(Text, {
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
const styles = StyleSheet.create({
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