import { type DefaultNavigatorOptions, type DrawerNavigationState, type DrawerRouterOptions, type NavigatorTypeBagBase, type ParamListBase, type StaticConfig, type TypedNavigator } from '@react-navigation/native';
import * as React from 'react';
import type { DrawerNavigationConfig, DrawerNavigationEventMap, DrawerNavigationOptions, DrawerNavigationProp } from '../types';
type Props = DefaultNavigatorOptions<ParamListBase, string | undefined, DrawerNavigationState<ParamListBase>, DrawerNavigationOptions, DrawerNavigationEventMap, DrawerNavigationProp<ParamListBase>> & DrawerRouterOptions & DrawerNavigationConfig;
declare function DrawerNavigator({ id, initialRouteName, defaultStatus, backBehavior, children, layout, screenListeners, screenOptions, screenLayout, UNSTABLE_getStateForRouteNamesChange, ...rest }: Props): React.JSX.Element;
export declare function createDrawerNavigator<ParamList extends ParamListBase, NavigatorID extends string | undefined = undefined, TypeBag extends NavigatorTypeBagBase = {
    ParamList: ParamList;
    NavigatorID: NavigatorID;
    State: DrawerNavigationState<ParamList>;
    ScreenOptions: DrawerNavigationOptions;
    EventMap: DrawerNavigationEventMap;
    NavigationList: {
        [RouteName in keyof ParamList]: DrawerNavigationProp<ParamList, RouteName, NavigatorID>;
    };
    Navigator: typeof DrawerNavigator;
}, Config extends StaticConfig<TypeBag> | undefined = StaticConfig<TypeBag> | undefined>(config?: Config): TypedNavigator<TypeBag, Config>;
export {};
//# sourceMappingURL=createDrawerNavigator.d.ts.map