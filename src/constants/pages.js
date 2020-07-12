import AllNotes from '@/views/AllNotes';

export default [
    {
        path: '/',
        name: 'All Notes',
        component: AllNotes,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
    },
];
