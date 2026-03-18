import React, { useState } from 'react';
import { Timeline, Select, Space, Empty, Tag, Button, Modal, Divider, Input } from 'antd';
import { EyeOutlined, RollbackOutlined } from '@ant-design/icons';
import type { Role } from '../types';

interface PermissionHistory {
  id: string;
  timestamp: Date;
  roleId: string;
  roleName: string;
  action: 'created' | 'modified' | 'deleted';
  changedFields: {
    fieldName: string;
    oldValue: string;
    newValue: string;
  }[];
  changedBy: string;
  reason?: string;
}

interface PermissionHistoryPanelProps {
  roles: Role[];
}

const PermissionHistoryPanel: React.FC<PermissionHistoryPanelProps> = ({ roles }) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('all');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');

  // Mock history data
  const mockHistory: PermissionHistory[] = [
    {
      id: 'hist_1',
      timestamp: new Date('2024-01-15T14:30:00'),
      roleId: '2',
      roleName: 'HR Manager',
      action: 'modified',
      changedFields: [
        {
          fieldName: '권한',
          oldValue: '직원 조회, 근태 조회',
          newValue: '직원 조회, 근태 조회, 급여 조회',
        },
      ],
      changedBy: 'admin_user',
      reason: '급여 정보 접근 필요',
    },
    {
      id: 'hist_2',
      timestamp: new Date('2024-01-12T10:15:00'),
      roleId: '5',
      roleName: 'Finance Officer',
      action: 'created',
      changedFields: [
        {
          fieldName: '역할 이름',
          oldValue: '-',
          newValue: 'Finance Officer',
        },
        {
          fieldName: '권한',
          oldValue: '-',
          newValue: '급여 조회, 급여 관리, 직원 조회',
        },
      ],
      changedBy: 'admin_user',
      reason: '재무 부서 신설',
    },
    {
      id: 'hist_3',
      timestamp: new Date('2024-01-10T09:45:00'),
      roleId: '3',
      roleName: 'Department Head',
      action: 'modified',
      changedFields: [
        {
          fieldName: '권한',
          oldValue: '직원 조회, 근태 조회, 휴가 승인',
          newValue: '직원 조회, 근태 조회, 휴가 승인, 급여 조회',
        },
      ],
      changedBy: 'hr_manager',
      reason: '부서장 책임 확대',
    },
    {
      id: 'hist_4',
      timestamp: new Date('2024-01-08T16:20:00'),
      roleId: '1',
      roleName: 'Admin',
      action: 'modified',
      changedFields: [
        {
          fieldName: '권한',
          oldValue: '모든 권한',
          newValue: '모든 권한 (감사 로그 추가)',
        },
      ],
      changedBy: 'system_admin',
      reason: '컴플라이언스 요구사항',
    },
  ];

  const filteredHistory = mockHistory.filter((item) => {
    const matchesRole = selectedRoleId === 'all' || item.roleId === selectedRoleId;
    const matchesAction = selectedAction === 'all' || item.action === selectedAction;
    const matchesSearch =
      item.roleName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.changedBy.toLowerCase().includes(searchText.toLowerCase()) ||
      item.reason?.toLowerCase().includes(searchText.toLowerCase());
    return matchesRole && matchesAction && matchesSearch;
  });

  const getActionLabel = (action: string) => {
    const actions: Record<string, { label: string; color: string }> = {
      created: { label: '생성', color: 'green' },
      modified: { label: '수정', color: 'blue' },
      deleted: { label: '삭제', color: 'red' },
    };
    return actions[action] || { label: 'Unknown', color: 'default' };
  };

  const handleViewDetails = (history: PermissionHistory) => {
    Modal.info({
      title: `${history.roleName} - ${getActionLabel(history.action).label}`,
      width: 700,
      content: (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <p>
              <strong>변경 시간:</strong> {new Date(history.timestamp).toLocaleString('ko-KR')}
            </p>
            <p>
              <strong>변경자:</strong> {history.changedBy}
            </p>
            {history.reason && (
              <p>
                <strong>변경 사유:</strong> {history.reason}
              </p>
            )}
          </div>
          <Divider />
          <h4 style={{ marginBottom: '12px' }}>변경 내용</h4>
          {history.changedFields.map((field, idx) => (
            <div
              key={idx}
              style={{
                padding: '12px',
                backgroundColor: '#F8FAFC',
                borderRadius: '6px',
                marginBottom: '12px',
              }}
            >
              <div style={{ fontWeight: 600, color: '#1E293B', marginBottom: '8px' }}>
                {field.fieldName}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>이전 값</div>
                  <div
                    style={{
                      padding: '8px',
                      backgroundColor: '#FEE2E2',
                      borderRadius: '4px',
                      marginTop: '4px',
                      color: '#7F1D1D',
                      fontSize: '13px',
                    }}
                  >
                    {field.oldValue}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>새로운 값</div>
                  <div
                    style={{
                      padding: '8px',
                      backgroundColor: '#DCFCE7',
                      borderRadius: '4px',
                      marginTop: '4px',
                      color: '#15803D',
                      fontSize: '13px',
                    }}
                  >
                    {field.newValue}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
      okText: '닫기',
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#1E293B' }}>
            역할 필터
          </label>
          <Select
            value={selectedRoleId}
            onChange={setSelectedRoleId}
            options={[
              { label: '모든 역할', value: 'all' },
              ...roles.map((r) => ({ label: r.name, value: r.id })),
            ]}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#1E293B' }}>
            작업 유형
          </label>
          <Select
            value={selectedAction}
            onChange={setSelectedAction}
            options={[
              { label: '모든 작업', value: 'all' },
              { label: '생성', value: 'created' },
              { label: '수정', value: 'modified' },
              { label: '삭제', value: 'deleted' },
            ]}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#1E293B' }}>
            검색
          </label>
          <Input
            placeholder="역할, 사용자, 사유로 검색..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <Empty description="변경 이력이 없습니다." />
      ) : (
        <Timeline
          items={filteredHistory.map((history) => {
            const actionInfo = getActionLabel(history.action);
            return {
              key: history.id,
              color: actionInfo.color,
              children: (
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '6px',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1E293B', marginBottom: '4px' }}>
                        {history.roleName}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Tag color={actionInfo.color}>{actionInfo.label}</Tag>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>
                          {new Date(history.timestamp).toLocaleString('ko-KR')}
                        </span>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>by {history.changedBy}</span>
                      </div>
                    </div>
                    <Button
                      type="text"
                      size="small"
                      icon={<EyeOutlined />}
                      onClick={() => handleViewDetails(history)}
                    >
                      상세보기
                    </Button>
                  </div>
                  {history.reason && (
                    <div style={{ marginTop: '8px', fontSize: '13px', color: '#64748B' }}>
                      사유: {history.reason}
                    </div>
                  )}
                </div>
              ),
            };
          })}
        />
      )}
    </div>
  );
};

export default PermissionHistoryPanel;