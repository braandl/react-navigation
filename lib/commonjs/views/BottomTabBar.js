"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomTabBar = BottomTabBar;
exports.getTabBarHeight = void 0;
var _elements = require("@react-navigation/elements");
var _native = require("@react-navigation/native");
var _color = _interopRequireDefault(require("color"));
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _BottomTabBarHeightCallbackContext = require("../utils/BottomTabBarHeightCallbackContext");
var _useIsKeyboardShown = require("../utils/useIsKeyboardShown");
var _BottomTabItem = require("./BottomTabItem");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DEFAULT_TABBAR_HEIGHT = 49;
const COMPACT_TABBAR_HEIGHT = 32;
const DEFAULT_MAX_TAB_ITEM_WIDTH = 125;
const SPACING = 5;
const useNativeDriver = _reactNative.Platform.OS !== 'web';
const shouldUseHorizontalLabels = _ref => {
  let {
    state,
    descriptors,
    layout,
    dimensions
  } = _ref;
  const {
    tabBarLabelPosition
  } = descriptors[state.routes[state.index].key].options;
  if (tabBarLabelPosition) {
    switch (tabBarLabelPosition) {
      case 'beside-icon':
        return true;
      case 'below-icon':
        return false;
    }
  }
  if (layout.width >= 768) {
    // Screen size matches a tablet
    const maxTabWidth = state.routes.reduce((acc, route) => {
      const {
        tabBarItemStyle
      } = descriptors[route.key].options;
      const flattenedStyle = _reactNative.StyleSheet.flatten(tabBarItemStyle);
      if (flattenedStyle) {
        if (typeof flattenedStyle.width === 'number') {
          return acc + flattenedStyle.width;
        } else if (typeof flattenedStyle.maxWidth === 'number') {
          return acc + flattenedStyle.maxWidth;
        }
      }
      return acc + DEFAULT_MAX_TAB_ITEM_WIDTH;
    }, 0);
    return maxTabWidth <= layout.width;
  } else {
    return dimensions.width > dimensions.height;
  }
};
const getPaddingBottom = insets => Math.max(insets.bottom - _reactNative.Platform.select({
  ios: 4,
  default: 0
}), 0);
const getTabBarHeight = _ref2 => {
  let {
    state,
    descriptors,
    dimensions,
    insets,
    style,
    ...rest
  } = _ref2;
  const flattenedStyle = _reactNative.StyleSheet.flatten(style);
  const customHeight = flattenedStyle && 'height' in flattenedStyle ? flattenedStyle.height : undefined;
  if (typeof customHeight === 'number') {
    return customHeight;
  }
  const isLandscape = dimensions.width > dimensions.height;
  const horizontalLabels = shouldUseHorizontalLabels({
    state,
    descriptors,
    dimensions,
    ...rest
  });
  const paddingBottom = getPaddingBottom(insets);
  if (_reactNative.Platform.OS === 'ios' && !_reactNative.Platform.isPad && isLandscape && horizontalLabels) {
    return COMPACT_TABBAR_HEIGHT + paddingBottom;
  }
  return DEFAULT_TABBAR_HEIGHT + paddingBottom;
};
exports.getTabBarHeight = getTabBarHeight;
function BottomTabBar(_ref3) {
  let {
    state,
    navigation,
    descriptors,
    insets,
    style
  } = _ref3;
  const {
    colors
  } = (0, _native.useTheme)();
  const {
    buildHref
  } = (0, _native.useLinkBuilder)();
  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;
  const {
    tabBarPosition = 'bottom',
    tabBarShowLabel,
    tabBarHideOnKeyboard = false,
    tabBarVisibilityAnimationConfig,
    tabBarStyle,
    tabBarBackground,
    tabBarActiveTintColor,
    tabBarInactiveTintColor,
    tabBarActiveBackgroundColor = tabBarPosition !== 'bottom' && tabBarPosition !== 'top' ? (0, _color.default)(tabBarActiveTintColor ?? colors.primary).alpha(0.12).rgb().string() : undefined,
    tabBarInactiveBackgroundColor
  } = focusedOptions;

  // FIXME: useSafeAreaFrame doesn't update values when window is resized on Web
  const dimensions = (0, _reactNative.useWindowDimensions)();
  const isKeyboardShown = (0, _useIsKeyboardShown.useIsKeyboardShown)();
  const onHeightChange = _react.default.useContext(_BottomTabBarHeightCallbackContext.BottomTabBarHeightCallbackContext);
  const shouldShowTabBar = !(tabBarHideOnKeyboard && isKeyboardShown);
  const visibilityAnimationConfigRef = _react.default.useRef(tabBarVisibilityAnimationConfig);
  _react.default.useEffect(() => {
    visibilityAnimationConfigRef.current = tabBarVisibilityAnimationConfig;
  });
  const [isTabBarHidden, setIsTabBarHidden] = _react.default.useState(!shouldShowTabBar);
  const [visible] = _react.default.useState(() => new _reactNative.Animated.Value(shouldShowTabBar ? 1 : 0));
  _react.default.useEffect(() => {
    const visibilityAnimationConfig = visibilityAnimationConfigRef.current;
    if (shouldShowTabBar) {
      const animation = visibilityAnimationConfig?.show?.animation === 'spring' ? _reactNative.Animated.spring : _reactNative.Animated.timing;
      animation(visible, {
        toValue: 1,
        useNativeDriver,
        duration: 250,
        ...visibilityAnimationConfig?.show?.config
      }).start(_ref4 => {
        let {
          finished
        } = _ref4;
        if (finished) {
          setIsTabBarHidden(false);
        }
      });
    } else {
      setIsTabBarHidden(true);
      const animation = visibilityAnimationConfig?.hide?.animation === 'spring' ? _reactNative.Animated.spring : _reactNative.Animated.timing;
      animation(visible, {
        toValue: 0,
        useNativeDriver,
        duration: 200,
        ...visibilityAnimationConfig?.hide?.config
      }).start();
    }
    return () => visible.stopAnimation();
  }, [visible, shouldShowTabBar]);
  const [layout, setLayout] = _react.default.useState({
    height: 0,
    width: dimensions.width
  });
  const handleLayout = e => {
    const {
      height,
      width
    } = e.nativeEvent.layout;
    onHeightChange?.(height);
    setLayout(layout => {
      if (height === layout.height && width === layout.width) {
        return layout;
      } else {
        return {
          height,
          width
        };
      }
    });
  };
  const {
    routes
  } = state;
  const paddingBottom = getPaddingBottom(insets);
  const tabBarHeight = getTabBarHeight({
    state,
    descriptors,
    insets,
    dimensions,
    layout,
    style: [tabBarStyle, style]
  });
  const hasHorizontalLabels = shouldUseHorizontalLabels({
    state,
    descriptors,
    dimensions,
    layout
  });
  const tabBarBackgroundElement = tabBarBackground?.();
  const tabBarIsHorizontal = tabBarPosition === 'bottom' || tabBarPosition === 'top';
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [tabBarPosition === 'left' ? styles.start : tabBarPosition === 'right' ? styles.end : styles.bottom, {
      backgroundColor: tabBarBackgroundElement != null ? 'transparent' : colors.card,
      borderColor: colors.border
    }, tabBarIsHorizontal ? [{
      transform: [{
        translateY: visible.interpolate({
          inputRange: [0, 1],
          outputRange: [layout.height + paddingBottom + _reactNative.StyleSheet.hairlineWidth, 0]
        })
      }],
      // Absolutely position the tab bar so that the content is below it
      // This is needed to avoid gap at bottom when the tab bar is hidden
      position: isTabBarHidden ? 'absolute' : undefined
    }, {
      height: tabBarHeight,
      paddingBottom,
      paddingHorizontal: Math.max(insets.left, insets.right)
    }] : {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingStart: tabBarPosition === 'left' ? insets.left : 0,
      paddingEnd: tabBarPosition === 'right' ? insets.right : 0,
      minWidth: hasHorizontalLabels ? (0, _elements.getDefaultSidebarWidth)(dimensions) : 0
    }, tabBarStyle],
    pointerEvents: isTabBarHidden ? 'none' : 'auto',
    onLayout: tabBarIsHorizontal ? handleLayout : undefined
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    pointerEvents: "none",
    style: _reactNative.StyleSheet.absoluteFill
  }, tabBarBackgroundElement), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    accessibilityRole: "tablist",
    style: tabBarIsHorizontal ? styles.bottomContent : styles.sideContent
  }, routes.map((route, index) => {
    const focused = index === state.index;
    const {
      options
    } = descriptors[route.key];
    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true
      });
      if (!focused && !event.defaultPrevented) {
        navigation.dispatch({
          ..._native.CommonActions.navigate(route),
          target: state.key
        });
      }
    };
    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key
      });
    };
    const label = typeof options.tabBarLabel === 'function' ? options.tabBarLabel : (0, _elements.getLabel)({
      label: options.tabBarLabel,
      title: options.title
    }, route.name);
    const accessibilityLabel = options.tabBarAccessibilityLabel !== undefined ? options.tabBarAccessibilityLabel : typeof label === 'string' && _reactNative.Platform.OS === 'ios' ? `${label}, tab, ${index + 1} of ${routes.length}` : undefined;
    return /*#__PURE__*/_react.default.createElement(_native.NavigationContext.Provider, {
      key: route.key,
      value: descriptors[route.key].navigation
    }, /*#__PURE__*/_react.default.createElement(_native.NavigationRouteContext.Provider, {
      value: route
    }, /*#__PURE__*/_react.default.createElement(_BottomTabItem.BottomTabItem, {
      href: buildHref(route.name, route.params),
      route: route,
      descriptor: descriptors[route.key],
      focused: focused,
      horizontal: hasHorizontalLabels,
      onPress: onPress,
      onLongPress: onLongPress,
      accessibilityLabel: accessibilityLabel,
      testID: options.tabBarButtonTestID,
      allowFontScaling: options.tabBarAllowFontScaling,
      activeTintColor: tabBarActiveTintColor,
      inactiveTintColor: tabBarInactiveTintColor,
      activeBackgroundColor: tabBarActiveBackgroundColor,
      inactiveBackgroundColor: tabBarInactiveBackgroundColor,
      button: options.tabBarButton,
      icon: options.tabBarIcon ?? (_ref5 => {
        let {
          color,
          size
        } = _ref5;
        return /*#__PURE__*/_react.default.createElement(_elements.MissingIcon, {
          color: color,
          size: size
        });
      }),
      badge: options.tabBarBadge,
      badgeStyle: options.tabBarBadgeStyle,
      label: label,
      showLabel: tabBarShowLabel,
      labelStyle: options.tabBarLabelStyle,
      iconStyle: options.tabBarIconStyle,
      style: [tabBarIsHorizontal ? styles.bottomItem : [styles.sideItem, hasHorizontalLabels ? {
        justifyContent: 'flex-start'
      } : null], options.tabBarItemStyle]
    })));
  })));
}
const styles = _reactNative.StyleSheet.create({
  start: {
    top: 0,
    bottom: 0,
    start: 0,
    borderEndWidth: _reactNative.StyleSheet.hairlineWidth
  },
  end: {
    top: 0,
    bottom: 0,
    end: 0,
    borderStartWidth: _reactNative.StyleSheet.hairlineWidth
  },
  bottom: {
    start: 0,
    end: 0,
    bottom: 0,
    borderTopWidth: _reactNative.StyleSheet.hairlineWidth,
    elevation: 8
  },
  bottomContent: {
    flex: 1,
    flexDirection: 'row'
  },
  sideContent: {
    flex: 1,
    flexDirection: 'column',
    padding: SPACING
  },
  bottomItem: {
    flex: 1
  },
  sideItem: {
    margin: SPACING,
    padding: SPACING * 2,
    borderRadius: 4
  }
});
//# sourceMappingURL=BottomTabBar.js.map