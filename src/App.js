import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminNotice from './routes/admin/AdminNotice';
import NoticeCreate from './routes/admin/NoticeCreate';
import Project from './routes/admin/Project';
import Comment from './routes/admin/Comment';
import AdminNoticeDetail from './routes/admin/AdminNoticeDetail';
import ProjectProposal from './routes/admin/ProjectProposal';
import ProjectProposalDetail from './routes/admin/ProjectProposalDetail';
import NoticeModify from './routes/admin/NoticeModify';
import Main from './routes/3indy/Main';
import Header from './components/3indy/layouts/Header';
import Footer from './components/3indy/layouts/Footer';
import Login from './routes/3indy/Login';
import Intro from './routes/3indy/Intro';
import MyPage from './routes/3indy/MyPage';
import GroupPage from './routes/3indy/GroupPage';
import Notice from './routes/3indy/Notice';
import Join from './routes/3indy/Join';
import SignUpPersonal from './routes/hong/SignUpPersonal';
import SignUpOrganization from './routes/hong/SignUpOrganization';
import ProjectDetail from './routes/rnjsrlgur/ProjectDetail';
import ProjectReviewDetail from './routes/rnjsrlgur/ProjectReviewDetail';
import ProjectProposalWrite from './routes/daniel/ProjectProposalWrite';
import ProjectReviewWrite from './routes/daniel/ProjectReivewWrite';
import Donation from './routes/3indy/Donation';
import DonationReview from './routes/3indy/DonationReview';
import Search from './routes/3indy/Search';
import KakaoApprove from './routes/rnjsrlgur/KakaoApprove';
import KakaoCancel from './routes/rnjsrlgur/KakaoCancel';
import KakaoFail from './routes/rnjsrlgur/KakaoFail';
import NoticeDetail from './routes/3indy/NoticeDetail';
import GroupModify from './routes/3indy/GroupModify';
import PersonalModify from './routes/3indy/PersonalModify';
import Error404 from './routes/admin/Error404';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {/* MAIN */}
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />
                <Route path="/intro" element={<Intro />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/notice/detail/:id" element={<NoticeDetail />} />
                <Route path="/search" element={<Search />} />

                {/* USER */}
                <Route path="/join/personal" element={<SignUpPersonal />} />
                <Route path="/join/group" element={<SignUpOrganization />} />
                <Route path="/profile/personal" element={<MyPage />} />
                <Route path="/profile/group" element={<GroupPage />} />
                <Route
                    path="/profile/personal/modify"
                    element={<PersonalModify />}
                />
                <Route path="/profile/group/modify" element={<GroupModify />} />

                {/* PROJECT */}
                <Route path="/project-list/:category" element={<Donation />} />
                <Route
                    path="/project-review/:category"
                    element={<DonationReview />}
                />
                <Route
                    path="/project-review-list/:category"
                    element={<DonationReview />}
                />
                <Route path="/project/detail/:id" element={<ProjectDetail />} />
                <Route
                    path="/project-review/detail/:id"
                    element={<ProjectReviewDetail />}
                />
                <Route
                    path="/project/post"
                    element={<ProjectProposalWrite />}
                />
                <Route
                    path="project-review/post/:title"
                    element={<ProjectReviewWrite />}
                />

                {/* ADMIN */}
                <Route path="/admin" element={<AdminNotice />} />
                <Route path="/admin/notice" element={<AdminNotice />} />
                <Route path="/admin/notice/create" element={<NoticeCreate />} />
                <Route
                    path="/admin/notice/detail/:id"
                    element={<AdminNoticeDetail />}
                />
                <Route
                    path="/admin/notice/:id/modify"
                    element={<NoticeModify />}
                />
                <Route path="/admin/project" element={<Project />} />
                <Route
                    path="/admin/project/proposal"
                    element={<ProjectProposal />}
                />
                <Route
                    path="/admin/project/proposal/detail/:id"
                    element={<ProjectProposalDetail />}
                />
                <Route path="/admin/comment" element={<Comment />} />
                {/* 결제 */}
                <Route path="/kakaopay/approve" element={<KakaoApprove />} />
                <Route path="/kakaopay/cancel" element={<KakaoCancel />} />
                <Route path="/kakaopay/fail" element={<KakaoFail />} />

                {/* 에러페이지 */}
                <Route path="/*" element={<Error404 />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
