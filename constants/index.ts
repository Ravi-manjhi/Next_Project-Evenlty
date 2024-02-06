export const headerLinks = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Create Event',
    path: '/event/create',
  },
  {
    label: 'My Profile',
    path: '/profile',
  },
];

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
};
