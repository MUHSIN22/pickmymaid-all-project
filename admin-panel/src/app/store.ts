import { configureStore } from '@reduxjs/toolkit';
// Reducers importing
import authReducer from '../features/manageAuth/manageAuthSlice';
import manageTeamReducer from '../features/manageTeam/manageTeamSlice';
import manageMaidReducer from '../features/manageMaids/ManageMaidSlice';
import ApprovedMaidsReducer from '../features/approvedMaids/ApprovedMaidsSlice';
import contactReducer from '../features/contactSupport/contactSupportSlice';
import customerReducer from '../features/manageCustomers/manageCustomerSlice';
import findJobsSlice from '../features/findJobs/findJobsSlice';
import paymentSlice from '../features/payments/paymentSlice';
import utilsSlice from '../features/utilSlice/utilsSlice'
import blogSlice from '../features/manageBlogs/manageBlogSlice'
import dashboardSlice from '../features/dashboard/dashboardSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    team: manageTeamReducer,
    maids: manageMaidReducer,
    approvedMaids: ApprovedMaidsReducer,
    contact: contactReducer,
    customers: customerReducer,
    findJob: findJobsSlice,
    payments: paymentSlice,
    utils: utilsSlice,
    blogs: blogSlice,
    dashboard: dashboardSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Exporting the store by default
export default store;
