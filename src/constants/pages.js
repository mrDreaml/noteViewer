import AllNotes from '@/views/AllNotes';

export default [
    {
        path: '/',
        name: 'All Notes',
        component: AllNotes,
    },
    {
        path: '/editNote',
        name: 'Edit Note',
        component: () => import('@/views/About.vue'),
    },
];
