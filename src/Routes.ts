const mainRoutes = [
  {
    title: 'Home',
    link: '/',
    icon: 'home',
    caption: 'praystorm. Beamer Home',
    appbar: true,
    showInList: false,
    exact: true,
  },
  {
    title: 'Editor',
    link: '/editor',
    icon: 'edit',
    caption: 'Erstelle und bearbeite Songs und Abläufe',
    appbar: true,
    showInList: true,
    exact: false,
  },
  {
    title: 'Presenter',
    link: '/presenter',
    icon: 'settings_remote',
    caption: 'Präsentiere Abläufe über Handy oder Tablet',
    appbar: true,
    showInList: true,
    exact: false,
  },
  {
    title: 'Beamer',
    link: '/beamer',
    icon: 'reorder',
    caption: 'Lass den Beamer die Arbeit machen',
    appbar: false,
    showInList: true,
    exact: false,
  },
  {
    title: 'Stage',
    link: '/stage',
    icon: 'playlist_play',
    caption: 'Nutze die Folien und Abläufe auf der Stage',
    appbar: false,
    showInList: true,
    exact: false,
  },
];

export default mainRoutes;
