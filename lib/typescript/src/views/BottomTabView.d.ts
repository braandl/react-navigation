import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import * as React from 'react';
import type { BottomTabDescriptorMap, BottomTabNavigationConfig, BottomTabNavigationHelpers } from '../types';
type Props = BottomTabNavigationConfig & {
    state: TabNavigationState<ParamListBase>;
    navigation: BottomTabNavigationHelpers;
    descriptors: BottomTabDescriptorMap;
};
export declare function BottomTabView(props: Props): React.JSX.Element;
export {};
//# sourceMappingURL=BottomTabView.d.ts.map