import { combineReducers } from '@reduxjs/toolkit';
import faqs from './faqsSlice';
import faqsMost from './faqsMostSlice';
import guides from './guidesSlice';
import guide from './guideSlice';
import faqCategories from './faqCategoriesSlice';
import guideCategories from './guideCategoriesSlice';
import support from './supportSlice';

const reducer = combineReducers({
  guide,
  guides,
  guideCategories,
  faqs,
  faqCategories,
  faqsMost,
  support
});

export default reducer;
