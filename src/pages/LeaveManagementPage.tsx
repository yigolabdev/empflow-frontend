import React, { useState } from 'react';
import { Layout, Tabs, Card, Row, Col, Space, Button, Badge, Statistic } from 'antd';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  SettingOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { LeaveRequestQueue } from '@/features/leave/components/LeaveRequestQueue';
import { ApprovalPanel } from '@/features/leave/components/ApprovalPanel';
import { LeaveBalanceChart } from '@/features/leave/components/LeaveBalanceChart';
import { LeaveHistoryTable } from '@/features/leave/components/LeaveHistoryTable';
import { PolicySettings } from '@/features/leave/components/PolicySettings';
import { AutoApprovalRuleEditor } from '@/features/leave/components/AutoApprovalRuleEditor';
import { BulkActionToolbar } from '@/features/leave/components/BulkActionToolbar';

const { Content } = Layout;

interface StatisticsData {
  pending: number;
  approved: number;
  rejected: number;
}

const LeaveManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('requests');
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [statistics, setStatistics] = useState<StatisticsData>({
    pending: 12,
    approved: 145,
    rejected: 8,
  });

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on ${selectedRequests.length} items`);
    setSelectedRequests([]);
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Content style={{ padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#1E293B', margin: 0 }}>
            휴가 및 승인 워크플로우
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B', marginTop: '8px' }}>
            휴가 신청, 승인, 거부, 취소 프로세스를 통합 관리합니다.
          </p>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={8}>
            <Card
              style={{
                borderLeft: '4px solid #F59E0B',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <Statistic
                title=<div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
                  <ClockCircleOutlined style={{ marginRight: '8px' }} />
                  승인 대기 중
                </div>
                value={statistics.pending}
                suffix="건"
                valueStyle={{ color: '#F59E0B', fontSize: '28px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              style={{
                borderLeft: '4px solid #10B981',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <Statistic
                title=<div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
                  <CheckCircleOutlined style={{ marginRight: '8px' }} />
                  승인 완료
                </div>
                value={statistics.approved}
                suffix="건"
                valueStyle={{ color: '#10B981', fontSize: '28px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              style={{
                borderLeft: '4px solid #EF4444',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <Statistic
                title=<div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
                  거부됨
                </div>
                value={statistics.rejected}
                suffix="건"
                valueStyle={{ color: '#EF4444', fontSize: '28px' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Bulk Actions Toolbar */}
        {selectedRequests.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <BulkActionToolbar
              selectedCount={selectedRequests.length}
              onApprove={() => handleBulkAction('approve')}
              onReject={() => handleBulkAction('reject')}
              onCancel={() => setSelectedRequests([])}
            />
          </div>
        )}

        {/* Main Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'requests',
              label: (
                <span>
                  <FileTextOutlined style={{ marginRight: '8px' }} />
                  휴가 신청 목록
                </span>
              ),
              children: (
                <div style={{ marginTop: '16px' }}>
                  <LeaveRequestQueue
                    selectedRequests={selectedRequests}
                    onSelectionChange={setSelectedRequests}
                  />
                </div>
              ),
            },
            {
              key: 'approval',
              label: (
                <span>
                  <CheckCircleOutlined style={{ marginRight: '8px' }} />
                  승인 처리
                </span>
              ),
              children: (
                <div style={{ marginTop: '16px' }}>
                  <ApprovalPanel
                    onApprovalComplete={(stats) => {
                      setStatistics((prev) => ({
                        ...prev,
                        pending: prev.pending - 1,
                        approved: prev.approved + 1,
                      }));
                    }}
                  />
                </div>
              ),
            },
            {
              key: 'balance',
              label: (
                <span>
                  <BarChartOutlined style={{ marginRight: '8px' }} />
                  잔여 휴가 현황
                </span>
              ),
              children: (
                <div style={{ marginTop: '16px' }}>
                  <LeaveBalanceChart />
                </div>
              ),
            },
            {
              key: 'history',
              label: (
                <span>
                  <CalendarOutlined style={{ marginRight: '8px' }} />
                  승인 이력
                </span>
              ),
              children: (
                <div style={{ marginTop: '16px' }}>
                  <LeaveHistoryTable />
                </div>
              ),
            },
            {
              key: 'policies',
              label: (
                <span>
                  <FileTextOutlined style={{ marginRight: '8px' }} />
                  휴가 정책
                </span>
              ),
              children: (
                <div style={{ marginTop: '16px' }}>
                  <PolicySettings />
                </div>
              ),
            },
            {
              key: 'auto-approval',
              label: (
                <span>
                  <SettingOutlined style={{ marginRight: '8px' }} />
                  자동 승인 규칙
                </span>
              ),
              children: (
                <div style={{ marginTop: '16px' }}>
                  <AutoApprovalRuleEditor />
                </div>
              ),
            },
          ]}
          style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '0' }}
        />
      </Content>
    </Layout>
  );
};

export default LeaveManagementPage;