function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { getDefaultSidebarWidth, getHeaderTitle, Header, SafeAreaProviderCompat, Screen } from '@react-navigation/elements';
import { DrawerActions, useLocale, useTheme } from '@react-navigation/native';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import useLatestCallback from 'use-latest-callback';
import { addCancelListener } from '../utils/addCancelListener';
import { DrawerPositionContext } from '../utils/DrawerPositionContext';
import { DrawerStatusContext } from '../utils/DrawerStatusContext';
import { getDrawerStatusFromState } from '../utils/getDrawerStatusFromState';
import { DrawerContent } from './DrawerContent';
import { DrawerToggleButton } from './DrawerToggleButton';
import { MaybeScreen, MaybeScreenContainer } from './ScreenFallback';
const DRAWER_BORDER_RADIUS = 16;
function DrawerViewBase(_ref) {
  let {
    state,
    navigation,
    descriptors,
    defaultStatus,
    drawerContent = props => /*#__PURE__*/React.createElement(DrawerContent, props),
    detachInactiveScreens = Platform.OS === 'web' || Platform.OS === 'android' || Platform.OS === 'ios'
  } = _ref;
  const {
    direction
  } = useLocale();
  const focusedRouteKey = state.routes[state.index].key;
  const {
    drawerHideStatusBarOnOpen,
    drawerPosition = direction === 'rtl' ? 'right' : 'left',
    drawerStatusBarAnimation,
    drawerStyle,
    drawerType = Platform.select({
      ios: 'slide',
      default: 'front'
    }),
    configureGestureHandler,
    keyboardDismissMode,
    overlayColor = 'rgba(0, 0, 0, 0.5)',
    swipeEdgeWidth,
    swipeEnabled = Platform.OS !== 'web' && Platform.OS !== 'windows' && Platform.OS !== 'macos',
    swipeMinDistance,
    overlayAccessibilityLabel
  } = descriptors[focusedRouteKey].options;
  const [loaded, setLoaded] = React.useState([focusedRouteKey]);
  if (!loaded.includes(focusedRouteKey)) {
    setLoaded([...loaded, focusedRouteKey]);
  }
  const dimensions = useSafeAreaFrame();
  const {
    colors
  } = useTheme();
  const drawerStatus = getDrawerStatusFromState(state);
  const handleDrawerOpen = useLatestCallback(() => {
    navigation.dispatch({
      ...DrawerActions.openDrawer(),
      target: state.key
    });
  });
  const handleDrawerClose = useLatestCallback(() => {
    navigation.dispatch({
      ...DrawerActions.closeDrawer(),
      target: state.key
    });
  });
  const handleGestureStart = useLatestCallback(() => {
    navigation.emit({
      type: 'gestureStart',
      target: state.key
    });
  });
  const handleGestureEnd = useLatestCallback(() => {
    navigation.emit({
      type: 'gestureEnd',
      target: state.key
    });
  });
  const handleGestureCancel = useLatestCallback(() => {
    navigation.emit({
      type: 'gestureCancel',
      target: state.key
    });
  });
  const handleTransitionStart = useLatestCallback(closing => {
    navigation.emit({
      type: 'transitionStart',
      data: {
        closing
      },
      target: state.key
    });
  });
  const handleTransitionEnd = useLatestCallback(closing => {
    navigation.emit({
      type: 'transitionEnd',
      data: {
        closing
      },
      target: state.key
    });
  });
  React.useEffect(() => {
    if (drawerStatus === defaultStatus || drawerType === 'permanent') {
      return;
    }
    const handleHardwareBack = () => {
      // We shouldn't handle the back button if the parent screen isn't focused
      // This will avoid the drawer overriding event listeners from a focused screen
      if (!navigation.isFocused()) {
        return false;
      }
      if (defaultStatus === 'open') {
        handleDrawerOpen();
      } else {
        handleDrawerClose();
      }
      return true;
    };

    // We only add the listeners when drawer opens
    // This way we can make sure that the listener is added as late as possible
    // This will make sure that our handler will run first when back button is pressed
    return addCancelListener(handleHardwareBack);
  }, [defaultStatus, drawerStatus, drawerType, handleDrawerClose, handleDrawerOpen, navigation]);
  const renderDrawerContent = () => {
    return /*#__PURE__*/React.createElement(DrawerPositionContext.Provider, {
      value: drawerPosition
    }, drawerContent({
      state: state,
      navigation: navigation,
      descriptors: descriptors
    }));
  };
  const renderSceneContent = () => {
    return /*#__PURE__*/React.createElement(MaybeScreenContainer, {
      enabled: detachInactiveScreens,
      hasTwoStates: true,
      style: styles.content
    }, state.routes.map((route, index) => {
      const descriptor = descriptors[route.key];
      const {
        lazy = true,
        unmountOnBlur
      } = descriptor.options;
      const isFocused = state.index === index;
      if (unmountOnBlur && !isFocused) {
        return null;
      }
      if (lazy && !loaded.includes(route.key) && !isFocused && !state.preloadedRouteKeys.includes(route.key)) {
        // Don't render a lazy screen if we've never navigated to it or it wasn't preloaded
        return null;
      }
      const {
        freezeOnBlur,
        header = _ref2 => {
          let {
            layout,
            options
          } = _ref2;
          return /*#__PURE__*/React.createElement(Header, _extends({}, options, {
            layout: layout,
            title: getHeaderTitle(options, route.name),
            headerLeft: options.headerLeft ?? (props => /*#__PURE__*/React.createElement(DrawerToggleButton, props))
          }));
        },
        headerShown,
        headerStatusBarHeight,
        headerTransparent,
        sceneContainerStyle
      } = descriptor.options;
      return /*#__PURE__*/React.createElement(MaybeScreen, {
        key: route.key,
        style: [StyleSheet.absoluteFill, {
          zIndex: isFocused ? 0 : -1
        }],
        visible: isFocused,
        enabled: detachInactiveScreens,
        freezeOnBlur: freezeOnBlur
      }, /*#__PURE__*/React.createElement(Screen, {
        focused: isFocused,
        route: descriptor.route,
        navigation: descriptor.navigation,
        headerShown: headerShown,
        headerStatusBarHeight: headerStatusBarHeight,
        headerTransparent: headerTransparent,
        header: header({
          layout: dimensions,
          route: descriptor.route,
          navigation: descriptor.navigation,
          options: descriptor.options
        }),
        style: sceneContainerStyle
      }, descriptor.render()));
    }));
  };
  return /*#__PURE__*/React.createElement(DrawerStatusContext.Provider, {
    value: drawerStatus
  }, /*#__PURE__*/React.createElement(Drawer, {
    open: drawerStatus !== 'closed',
    onOpen: handleDrawerOpen,
    onClose: handleDrawerClose,
    onGestureStart: handleGestureStart,
    onGestureEnd: handleGestureEnd,
    onGestureCancel: handleGestureCancel,
    onTransitionStart: handleTransitionStart,
    onTransitionEnd: handleTransitionEnd,
    layout: dimensions,
    configureGestureHandler: configureGestureHandler,
    swipeEnabled: swipeEnabled,
    swipeEdgeWidth: swipeEdgeWidth,
    swipeMinDistance: swipeMinDistance,
    hideStatusBarOnOpen: drawerHideStatusBarOnOpen,
    statusBarAnimation: drawerStatusBarAnimation,
    keyboardDismissMode: keyboardDismissMode,
    drawerType: drawerType,
    overlayAccessibilityLabel: overlayAccessibilityLabel,
    drawerPosition: drawerPosition,
    drawerStyle: [{
      backgroundColor: colors.card,
      width: getDefaultSidebarWidth(dimensions)
    }, drawerType === 'permanent' && (drawerPosition === 'left' ? {
      borderEndColor: colors.border,
      borderEndWidth: StyleSheet.hairlineWidth
    } : {
      borderStartColor: colors.border,
      borderStartWidth: StyleSheet.hairlineWidth
    }), drawerType === 'front' && (drawerPosition === 'left' ? {
      borderTopRightRadius: DRAWER_BORDER_RADIUS,
      borderBottomRightRadius: DRAWER_BORDER_RADIUS
    } : {
      borderTopLeftRadius: DRAWER_BORDER_RADIUS,
      borderBottomLeftRadius: DRAWER_BORDER_RADIUS
    }), drawerStyle],
    overlayStyle: {
      backgroundColor: overlayColor
    },
    renderDrawerContent: renderDrawerContent
  }, renderSceneContent()));
}
export function DrawerView(_ref3) {
  let {
    navigation,
    ...rest
  } = _ref3;
  return /*#__PURE__*/React.createElement(SafeAreaProviderCompat, null, /*#__PURE__*/React.createElement(DrawerViewBase, _extends({
    navigation: navigation
  }, rest)));
}
const styles = StyleSheet.create({
  content: {
    flex: 1
  }
});
//# sourceMappingURL=DrawerView.js.map