import type { NavigationState, PartialState, Route } from './types';
type ResetState = PartialState<NavigationState> | NavigationState | (Omit<NavigationState, 'routes'> & {
    routes: Omit<Route<string>, 'key'>[];
});
export type Action = {
    type: 'GO_BACK';
    source?: string;
    target?: string;
} | {
    type: 'NAVIGATE';
    payload: {
        name: string;
        params?: object;
        path?: string;
        merge?: boolean;
    };
    source?: string;
    target?: string;
} | {
    type: 'NAVIGATE_DEPRECATED';
    payload: {
        name: string;
        params?: object;
        merge?: boolean;
    };
    source?: string;
    target?: string;
} | {
    type: 'RESET';
    payload: ResetState | undefined;
    source?: string;
    target?: string;
} | {
    type: 'SET_PARAMS';
    payload: {
        params?: object;
    };
    source?: string;
    target?: string;
} | {
    type: 'PRELOAD';
    payload: {
        name: string;
        params?: object;
    };
    source?: string;
    target?: string;
};
export declare function goBack(): Action;
export declare function navigate(options: {
    name: string;
    params?: object;
    path?: string;
    merge?: boolean;
}): Action;
export declare function navigate(name: string, params?: object): Action;
export declare function navigateDeprecated(...args: [name: string] | [name: string, params: object | undefined] | [route: {
    name: string;
    params?: object;
}]): Action;
export declare function reset(state: ResetState | undefined): Action;
export declare function setParams(params: object): Action;
export declare function preload(name: string, params?: object): Action;
export {};
//# sourceMappingURL=CommonActions.d.ts.map