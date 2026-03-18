import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import 랜딩페이지Page from '@/pages/랜딩페이지Page';
import 가격책정페이지Page from '@/pages/가격책정페이지Page';
import 회원가입페이지Page from '@/pages/회원가입페이지Page';
import 로그인페이지Page from '@/pages/로그인페이지Page';
import 관리자대시보드Page from '@/pages/관리자대시보드Page';
import 직원관리페이지Page from '@/pages/직원관리페이지Page';
import 직원상세정보페이지Page from '@/pages/직원상세정보페이지Page';
import 근태관리페이지Page from '@/pages/근태관리페이지Page';
import 휴가및승인워크플로우페이지Page from '@/pages/휴가및승인워크플로우페이지Page';
import 급여관리및계산페이지Page from '@/pages/급여관리및계산페이지Page';
import 분석대시보드Page from '@/pages/분석대시보드Page';
import 역할및권한관리페이지Page from '@/pages/역할및권한관리페이지Page';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<랜딩페이지Page />} />
        <Route path="/pricing" element={<가격책정페이지Page />} />
        <Route path="/signup" element={<회원가입페이지Page />} />
        <Route path="/login" element={<로그인페이지Page />} />
        <Route path="/admin/dashboard" element={<관리자대시보드Page />} />
        <Route path="/admin/employees" element={<직원관리페이지Page />} />
        <Route path="/admin/employees/:employeeId" element={<직원상세정보페이지Page />} />
        <Route path="/admin/attendance" element={<근태관리페이지Page />} />
        <Route path="/admin/leave-management" element={<휴가및승인워크플로우페이지Page />} />
        <Route path="/admin/payroll" element={<급여관리및계산페이지Page />} />
        <Route path="/admin/analytics" element={<분석대시보드Page />} />
        <Route path="/admin/roles-permissions" element={<역할및권한관리페이지Page />} />
        <Route path="/" element={<Navigate to="/" replace />} />
        <Route path="*" element={<div style={{ padding: 24 }}>페이지를 찾을 수 없습니다.</div>} />
      </Routes>
    </AppLayout>
  );
}
