function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { getHeaderTitle, Header, SafeAreaProviderCompat, Screen } from '@react-navigation/elements';
import * as React from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { FadeTransition, ShiftTransition } from '../TransitionConfigs/TransitionPresets';
import { BottomTabBarHeightCallbackContext } from '../utils/BottomTabBarHeightCallbackContext';
import { BottomTabBarHeightContext } from '../utils/BottomTabBarHeightContext';
import { useAnimatedHashMap } from '../utils/useAnimatedHashMap';
import { BottomTabBar, getTabBarHeight } from './BottomTabBar';
import { MaybeScreen, MaybeScreenContainer } from './ScreenFallback';
const EPSILON = 1e-5;
const STATE_INACTIVE = 0;
const STATE_TRANSITIONING_OR_BELOW_TOP = 1;
const STATE_ON_TOP = 2;
const NAMED_TRANSITIONS_PRESETS = {
  fade: FadeTransition,
  shift: ShiftTransition,
  none: {
    sceneStyleInterpolator: undefined,
    transitionSpec: {
      animation: 'timing',
      config: {
        duration: 0
      }
    }
  }
};
const hasAnimation = options => {
  const {
    animation,
    transitionSpec
  } = options;
  if (animation) {
    return animation !== 'none';
  }
  return !transitionSpec;
};
export function BottomTabView(props) {
  const {
    tabBar = props => /*#__PURE__*/React.createElement(BottomTabBar, props),
    state,
    navigation,
    descriptors,
    safeAreaInsets,
    detachInactiveScreens = Platform.OS === 'web' || Platform.OS === 'android' || Platform.OS === 'ios',
    sceneContainerStyle
  } = props;
  const focusedRouteKey = state.routes[state.index].key;

  /**
   * List of loaded tabs, tabs will be loaded when navigated to.
   */
  const [loaded, setLoaded] = React.useState([focusedRouteKey]);
  if (!loaded.includes(focusedRouteKey)) {
    // Set the current tab to be loaded if it was not loaded before
    setLoaded([...loaded, focusedRouteKey]);
  }
  const previousRouteKeyRef = React.useRef(focusedRouteKey);
  const tabAnims = useAnimatedHashMap(state);
  React.useEffect(() => {
    const previousRouteKey = previousRouteKeyRef.current;
    previousRouteKeyRef.current = focusedRouteKey;
    const animateToIndex = () => {
      Animated.parallel(state.routes.map((route, index) => {
        const {
          options
        } = descriptors[route.key];
        const {
          animation = 'none',
          transitionSpec = NAMED_TRANSITIONS_PRESETS[animation].transitionSpec
        } = options;
        let spec = transitionSpec;
        if (route.key !== previousRouteKey && route.key !== focusedRouteKey) {
          // Don't animate if the screen is not previous one or new one
          // This will avoid flicker for screens not involved in the transition
          spec = NAMED_TRANSITIONS_PRESETS.none.transitionSpec;
        }
        spec = spec ?? NAMED_TRANSITIONS_PRESETS.none.transitionSpec;
        const toValue = index === state.index ? 0 : index >= state.index ? 1 : -1;
        return Animated[spec.animation](tabAnims[route.key], {
          ...spec.config,
          toValue,
          useNativeDriver: true
        });
      }).filter(Boolean)).start();
    };
    animateToIndex();
  }, [descriptors, focusedRouteKey, state.index, state.routes, tabAnims]);
  const dimensions = SafeAreaProviderCompat.initialMetrics.frame;
  const [tabBarHeight, setTabBarHeight] = React.useState(() => getTabBarHeight({
    state,
    descriptors,
    dimensions,
    layout: {
      width: dimensions.width,
      height: 0
    },
    insets: {
      ...SafeAreaProviderCompat.initialMetrics.insets,
      ...props.safeAreaInsets
    },
    style: descriptors[state.routes[state.index].key].options.tabBarStyle
  }));
  const renderTabBar = () => {
    return /*#__PURE__*/React.createElement(SafeAreaInsetsContext.Consumer, null, insets => tabBar({
      state: state,
      descriptors: descriptors,
      navigation: navigation,
      insets: {
        top: safeAreaInsets?.top ?? insets?.top ?? 0,
        right: safeAreaInsets?.right ?? insets?.right ?? 0,
        bottom: safeAreaInsets?.bottom ?? insets?.bottom ?? 0,
        left: safeAreaInsets?.left ?? insets?.left ?? 0
      }
    }));
  };
  const {
    routes
  } = state;

  // If there is no animation, we only have 2 states: visible and invisible
  const hasTwoStates = !routes.some(route => hasAnimation(descriptors[route.key].options));
  const {
    tabBarPosition = 'bottom'
  } = descriptors[focusedRouteKey].options;
  return /*#__PURE__*/React.createElement(SafeAreaProviderCompat, {
    style: tabBarPosition === 'left' ? styles.start : tabBarPosition === 'right' ? styles.end : null
  }, tabBarPosition === 'top' ? /*#__PURE__*/React.createElement(BottomTabBarHeightCallbackContext.Provider, {
    value: setTabBarHeight
  }, renderTabBar()) : null, /*#__PURE__*/React.createElement(MaybeScreenContainer, {
    enabled: detachInactiveScreens,
    hasTwoStates: hasTwoStates,
    style: styles.screens
  }, routes.map((route, index) => {
    const descriptor = descriptors[route.key];
    const {
      lazy = true,
      unmountOnBlur,
      animation = 'none',
      sceneStyleInterpolator = NAMED_TRANSITIONS_PRESETS[animation].sceneStyleInterpolator
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
      header = _ref => {
        let {
          layout,
          options
        } = _ref;
        return /*#__PURE__*/React.createElement(Header, _extends({}, options, {
          layout: layout,
          title: getHeaderTitle(options, route.name)
        }));
      },
      headerShown,
      headerStatusBarHeight,
      headerTransparent
    } = descriptor.options;
    const {
      sceneStyle
    } = sceneStyleInterpolator?.({
      current: {
        progress: tabAnims[route.key]
      }
    }) ?? {};
    const animationEnabled = hasAnimation(descriptor.options);
    const activityState = isFocused ? STATE_ON_TOP // the screen is on top after the transition
    : animationEnabled // is animation is not enabled, immediately move to inactive state
    ? tabAnims[route.key].interpolate({
      inputRange: [0, 1 - EPSILON, 1],
      outputRange: [STATE_TRANSITIONING_OR_BELOW_TOP,
      // screen visible during transition
      STATE_TRANSITIONING_OR_BELOW_TOP, STATE_INACTIVE // the screen is detached after transition
      ],

      extrapolate: 'extend'
    }) : STATE_INACTIVE;
    return /*#__PURE__*/React.createElement(MaybeScreen, {
      key: route.key,
      style: [StyleSheet.absoluteFill, {
        zIndex: isFocused ? 0 : -1
      }],
      active: activityState,
      enabled: detachInactiveScreens,
      freezeOnBlur: freezeOnBlur
    }, /*#__PURE__*/React.createElement(BottomTabBarHeightContext.Provider, {
      value: tabBarPosition === 'bottom' ? tabBarHeight : 0
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
      style: [sceneContainerStyle, animationEnabled && sceneStyle]
    }, descriptor.render())));
  })), tabBarPosition !== 'top' ? /*#__PURE__*/React.createElement(BottomTabBarHeightCallbackContext.Provider, {
    value: setTabBarHeight
  }, renderTabBar()) : null);
}
const styles = StyleSheet.create({
  start: {
    flexDirection: 'row-reverse'
  },
  end: {
    flexDirection: 'row'
  },
  screens: {
    flex: 1,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=BottomTabView.js.map