import type { DefaultRouterOptions, NavigationRoute, NavigationState, ParamListBase, Router } from './types';
export type StackActionType = {
    type: 'REPLACE';
    payload: {
        name: string;
        params?: object;
    };
    source?: string;
    target?: string;
} | {
    type: 'PUSH';
    payload: {
        name: string;
        params?: object;
    };
    source?: string;
    target?: string;
} | {
    type: 'POP';
    payload: {
        count: number;
    };
    source?: string;
    target?: string;
} | {
    type: 'POP_TO_TOP';
    source?: string;
    target?: string;
} | {
    type: 'POP_TO';
    payload: {
        name: string;
        params?: object;
        merge?: boolean;
    };
    source?: string;
    target?: string;
} | {
    type: 'REMOVE';
    payload: {
        name: string;
        params?: object;
    };
    source?: string;
    target?: string;
} | {
    type: 'RETAIN';
    source?: string;
    target?: string;
};
export type StackRouterOptions = DefaultRouterOptions;
export type StackNavigationState<ParamList extends ParamListBase> = NavigationState<ParamList> & {
    /**
     * Type of the router, in this case, it's stack.
     */
    type: 'stack';
    /**
     * List of routes, which are supposed to be preloaded before navigating to.
     */
    preloadedRoutes: NavigationRoute<ParamList, keyof ParamList>[];
};
export type StackActionHelpers<ParamList extends ParamListBase> = {
    /**
     * Replace the current route with a new one.
     *
     * @param name Route name of the new route.
     * @param [params] Params object for the new route.
     */
    replace<RouteName extends keyof ParamList>(...args: undefined extends ParamList[RouteName] ? [screen: RouteName] | [screen: RouteName, params: ParamList[RouteName]] : [screen: RouteName, params: ParamList[RouteName]]): void;
    /**
     * Push a new screen onto the stack.
     *
     * @param name Name of the route for the tab.
     * @param [params] Params object for the route.
     */
    push<RouteName extends keyof ParamList>(...args: undefined extends ParamList[RouteName] ? [screen: RouteName] | [screen: RouteName, params: ParamList[RouteName]] : [screen: RouteName, params: ParamList[RouteName]]): void;
    /**
     * Pop a screen from the stack.
     */
    pop(count?: number): void;
    /**
     * Pop to the first route in the stack, dismissing all other screens.
     */
    popToTop(): void;
    /**
     * Pop any screens to go back to the specified screen.
     * If the specified screen doesn't exist, it'll be added to the stack.
     *
     * @param name Name of the route to navigate to.
     * @param [params] Params object for the route.
     * @param [merge] Whether to merge the params onto the route.
     */
    popTo<RouteName extends keyof ParamList>(...args: RouteName extends unknown ? undefined extends ParamList[RouteName] ? [screen: RouteName] | [screen: RouteName, params: ParamList[RouteName]] | [screen: RouteName, params: ParamList[RouteName], merge: boolean] : [screen: RouteName, params: ParamList[RouteName]] | [screen: RouteName, params: ParamList[RouteName], merge: boolean] : never): void;
    /**
     * Remove a screen from the preloaded list in the navigator.
     *
     * @param name Name of the route to remove preload.
     * @param [params] Params object for the route.
     */
    remove<RouteName extends keyof ParamList>(...args: RouteName extends unknown ? undefined extends ParamList[RouteName] ? [screen: RouteName] | [screen: RouteName, params: ParamList[RouteName]] : [screen: RouteName, params: ParamList[RouteName]] : never): void;
    /**
     * Removes a screen from the active routes, at the same time
     * retaining the screen in the preloaded screens list,
     * so it is not getting detached.
     */
    retain(): void;
};
export declare const StackActions: {
    replace(name: string, params?: object): StackActionType;
    push(name: string, params?: object): StackActionType;
    pop(count?: number): StackActionType;
    popToTop(): StackActionType;
    popTo(name: string, params?: object, merge?: boolean): StackActionType;
    remove(name: string, params?: object): StackActionType;
    retain(): StackActionType;
};
export declare function StackRouter(options: StackRouterOptions): Router<StackNavigationState<ParamListBase>, import("./CommonActions").Action | StackActionType>;
//# sourceMappingURL=StackRouter.d.ts.map