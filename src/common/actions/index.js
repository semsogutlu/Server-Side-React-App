export const PEOPLE_LOADED = 'PEOPLE_LOADED';
export const PEOPLE_LOADING = 'PEOPLE_LOADING';

export const peopleLoaded = (people) => ({
  type: PEOPLE_LOADED,
  people
});

export const peopleLoading = (isLoading) => ({
  type: PEOPLE_LOADING,
  isLoading,
});
