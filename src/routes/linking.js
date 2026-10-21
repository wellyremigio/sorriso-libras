import { getPathFromState } from '@react-navigation/native';

// Keep transient screen data in navigation state, rather than in the URL.
const getUrlState = (state) => ({
  ...state,
  routes: state.routes.map((route) => ({
    ...route,
    params: route.params
      ? Object.fromEntries(
          Object.entries(route.params).filter(
            ([, value]) => ['string', 'number', 'boolean'].includes(typeof value)
          )
        )
      : undefined,
    ...(route.state ? { state: getUrlState(route.state) } : {}),
  })),
});

const linking = {
  config: {
    screens: {
      Home: '',
      ChildMenu: 'crianca',
      DentistMenu: 'dentista',
      CaregiverMenu: 'responsavel',
      ChildLesson: {
        path: 'crianca/aula',
        parse: { initialIndex: Number },
      },
      WeeklyGoals: 'crianca/metas',
      AdultLesson: {
        path: 'responsavel/aula',
        parse: { initialIndex: Number },
      },
      StickerGallery: 'crianca/figurinhas',
      StickerAchievementScreen: {
        path: 'crianca/conquista',
        parse: {
          isFinalAchievement: (value) => value === 'true',
          showModuleFinalAchievement: (value) => value === 'true',
        },
      },
    },
  },
  getPathFromState: (state, options) => getPathFromState(getUrlState(state), options),
};

export default linking;
