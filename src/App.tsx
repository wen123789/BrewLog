import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { BeansPage } from './pages/BeansPage';
import { EquipmentPage } from './pages/EquipmentPage';
import { RecommendPage } from './pages/RecommendPage';
import { TimerPage } from './pages/TimerPage';
import { RecordsPage } from './pages/RecordsPage';
import { NewRecordPage } from './pages/NewRecordPage';
import { RecordDetailPage } from './pages/RecordDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { CommunityPage } from './pages/CommunityPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/beans" element={<BeansPage />} />
        <Route path="/equipment" element={<EquipmentPage />} />
        <Route path="/recommend" element={<RecommendPage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/records/new" element={<NewRecordPage />} />
        <Route path="/records/:id" element={<RecordDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;