import { CommonActions, type ParamListBase } from '@react-navigation/core';
/**
 * Helpers to build href or action based on the linking options.
 * @returns `buildHref` to build an `href` for screen and `buildAction` to build an action from an `href`.
 */
export declare function useLinkBuilder(): {
    buildHref: (name: string, params?: object) => string | undefined;
    buildAction: (href: string) => {
        type: "NAVIGATE";
        payload: {
            name: string;
            params?: import("@react-navigation/core").NavigatorScreenParams<Readonly<{
                key: string;
                index: number;
                routeNames: string[];
                history?: unknown[] | undefined;
                routes: import("@react-navigation/core").NavigationRoute<ParamListBase, string>[];
                type: string;
                stale: false;
            }>>;
            path?: string | undefined;
        };
    } | CommonActions.Action;
};
//# sourceMappingURL=useLinkBuilder.d.ts.map