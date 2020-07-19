import AllNotes from '@/views/AllNotes';

export default [
    {
        path: '/',
        name: 'All Notes',
        isVisibleAtHeader: true,
        component: AllNotes,
    },
    {
        path: '/editNote',
        isVisibleAtHeader: false,
        name: 'Edit Note',
        component: () => import('@/views/EditNote'),
    },
];
