import {Status} from '../types';

export const SPACEX_API_ENDPOINT: string = 'https://api.spacexdata.com/v4';

export const STATUS_CONFIG: Status[] = [
    {
        name: 'Successful',
        identifier: 'success',
        style: 'success'
    },
    {
        name: 'Failed',
        identifier: 'failed',
        style: 'danger'
    },
    {
        name: 'Upcoming',
        identifier: 'upcoming',
        style: 'info'
    }
];