type IRouteNames =
    'users' |
    'authenticate' |
    'farm' |
    'referrals' |
    'code-redeem'

export type IRouteMethods =
    'post' |
    'get'

type IApiRoutes = Record<IRouteNames, (data: any, path?: any) => {
    method: IRouteMethods
    path: string,
    data?: any
}>

export const apiRoutes: IApiRoutes = {
    users: () => ({
        method: 'get',
        path: `/users`,
    }),

    authenticate: (data: any) => ({
        method: 'post',
        path: '/users/authenticate',
        data,
    }),

    farm: (data: any, path: 'harvest' | 'create' | 'update' | 'info' | '' = '') => ({
        data,
        method: 'post',
        path: `/points-farm/${path}`
    }),

    referrals: (data: any, path: 'remove' | 'ping-person' | '' = '') => ({
        data,
        method: 'post',
        path: `/referrals/${path}`
    }),
    'code-redeem': (data: any, path: 'claim' | '' = '') => ({
        data,
        method: 'post',
        path: `/code-redeem/${path}`
    })
};