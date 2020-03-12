import { Route } from "../models/Route";

const mainRoutes: Route[] = [
  {
    title: 'Home',
    link: '/',
    icon: 'home',
    img: '/media/praystorm-logo.png',
    caption: 'praystorm. Beamer Home',
    appbar: true,
    showInList: false,
    exact: true,
  },
  {
    title: 'Editor',
    link: '/editor',
    icon: 'edit',
    img: '/media/home/edit-card.jpg',
    caption: 'Erstelle neue Abläufe für kommende Events und fülle diese mit deinen Songs',
    appbar: true,
    showInList: true,
    exact: false,
  },
  {
    title: 'Presenter',
    link: '/presenter',
    icon: 'settings_remote',
    img: '/media/home/presenter-card.jpg',
    caption: 'Präsentiere deine Erstellten Abläufe remote mit deinem Handy oder Tablet',
    appbar: true,
    showInList: true,
    exact: false,
  },
  {
    title: 'Beamer',
    link: '/beamer',
    icon: 'reorder',
    img: '/media/home/beamer-card.jpg',
    caption: 'Lass einfach den Beamer arbeiten, du kannst ihr mit einem anderen Gerät nun fernsteuern',
    appbar: false,
    showInList: true,
    exact: false,
  },
  {
    title: 'Stage',
    link: '/stage',
    icon: 'playlist_play',
    img: '/media/home/stage-card.jpg',
    caption: 'Lass dir deine Abläufe und Songs auf der Stage anzeigen',
    appbar: false,
    showInList: true,
    exact: false,
  },
];

export default mainRoutes;
