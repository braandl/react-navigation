import { type DefaultNavigatorOptions, type NavigatorTypeBagBase, type ParamListBase, type StaticConfig, type TabNavigationState, type TabRouterOptions, type TypedNavigator } from '@react-navigation/native';
import * as React from 'react';
import type { BottomTabNavigationConfig, BottomTabNavigationEventMap, BottomTabNavigationOptions, BottomTabNavigationProp } from '../types';
type Props = DefaultNavigatorOptions<ParamListBase, string | undefined, TabNavigationState<ParamListBase>, BottomTabNavigationOptions, BottomTabNavigationEventMap, BottomTabNavigationProp<ParamListBase>> & TabRouterOptions & BottomTabNavigationConfig;
declare function BottomTabNavigator({ id, initialRouteName, backBehavior, children, layout, screenListeners, screenOptions, sceneContainerStyle, UNSTABLE_getStateForRouteNamesChange, ...rest }: Props): React.JSX.Element;
export declare function createBottomTabNavigator<ParamList extends ParamListBase, NavigatorID extends string | undefined = undefined, TypeBag extends NavigatorTypeBagBase = {
    ParamList: ParamList;
    NavigatorID: NavigatorID;
    State: TabNavigationState<ParamList>;
    ScreenOptions: BottomTabNavigationOptions;
    EventMap: BottomTabNavigationEventMap;
    NavigationList: {
        [RouteName in keyof ParamList]: BottomTabNavigationProp<ParamList, RouteName, NavigatorID>;
    };
    Navigator: typeof BottomTabNavigator;
}, Config extends StaticConfig<TypeBag> | undefined = StaticConfig<TypeBag> | undefined>(config?: Config): TypedNavigator<TypeBag, Config>;
export {};
//# sourceMappingURL=createBottomTabNavigator.d.ts.map