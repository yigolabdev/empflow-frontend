import React, { useState, useEffect } from 'react';
import { Tabs, Button, Space, Input, message, Tooltip, Badge, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, HistoryOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import RoleListSection from '@/features/rolesPermissions/components/RoleListSection';
import RoleDetailModal from '@/features/rolesPermissions/components/RoleDetailModal';
import PermissionMatrixView from '@/features/rolesPermissions/components/PermissionMatrixView';
import PermissionHistoryPanel from '@/features/rolesPermissions/components/PermissionHistoryPanel';
import ConflictDetectionPanel from '@/features/rolesPermissions/components/ConflictDetectionPanel';
import { getRoles, createRole, updateRole, deleteRole } from '@/lib/api';
import type { Role, PermissionConflict } from '@/features/rolesPermissions/types';

const RolesPermissionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('roles');
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [isDetailModalVisible, setIsDetailModalVisible] = useState<boolean>(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [conflicts, setConflicts] = useState<PermissionConflict[]>([]);
  const [conflictCount, setConflictCount] = useState<number>(0);

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    detectConflicts();
  }, [roles]);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const mockRoles: Role[] = [
        {
          id: '1',
          name: 'Admin',
          description: '시스템 전체 관리자',
          type: 'system',
          isBuiltIn: true,
          permissions: [
            { id: 'emp_view', name: '직원 조회', category: 'employees', canView: true, canEdit: true, canDelete: true, canApprove: true },
            { id: 'emp_manage', name: '직원 관리', category: 'employees', canView: true, canEdit: true, canDelete: true, canApprove: true },
            { id: 'att_view', name: '근태 조회', category: 'attendance', canView: true, canEdit: true, canDelete: true, canApprove: true },
            { id: 'leave_approve', name: '휴가 승인', category: 'leave', canView: true, canEdit: true, canDelete: false, canApprove: true },
            { id: 'payroll_view', name: '급여 조회', category: 'payroll', canView: true, canEdit: true, canDelete: false, canApprove: true },
            { id: 'payroll_manage', name: '급여 관리', category: 'payroll', canView: true, canEdit: true, canDelete: true, canApprove: true },
            { id: 'role_manage', name: '역할 관리', category: 'system', canView: true, canEdit: true, canDelete: true, canApprove: true },
            { id: 'audit_view', name: '감사 로그 조회', category: 'system', canView: true, canEdit: false, canDelete: false, canApprove: false },
          ],
          memberCount: 2,
          lastModified: new Date('2024-01-15'),
          modifiedBy: 'system_admin',
        },
        {
          id: '2',
          name: 'HR Manager',
          description: '인사 담당 관리자',
          type: 'custom',
          isBuiltIn: true,
          permissions: [
            { id: 'emp_view', name: '직원 조회', category: 'employees', canView: true, canEdit: true, canDelete: false, canApprove: false },
            { id: 'emp_manage', name: '직원 관리', category: 'employees', canView: true, canEdit: true, canDelete: false, canApprove: true },
            { id: 'att_view', name: '근태 조회', category: 'attendance', canView: true, canEdit: true, canDelete: false, canApprove: false },
            { id: 'leave_approve', name: '휴가 승인', category: 'leave', canView: true, canEdit: false, canDelete: false, canApprove: true },
            { id: 'payroll_view', name: '급여 조회', category: 'payroll', canView: true, canEdit: false, canDelete: false, canApprove: false },
          ],
          memberCount: 5,
          lastModified: new Date('2024-01-10'),
          modifiedBy: 'admin_user',
        },
        {
          id: '3',
          name: 'Department Head',
          description: '부서장',
          type: 'custom',
          isBuiltIn: true,
          permissions: [
            { id: 'emp_view', name: '직원 조회', category: 'employees', canView: true, canEdit: false, canDelete: false, canApprove: false },
            { id: 'att_view', name: '근태 조회', category: 'attendance', canView: true, canEdit: false, canDelete: false, canApprove: false },
            { id: 'leave_approve', name: '휴가 승인', category: 'leave', canView: true, canEdit: false, canDelete: false, canApprove: true },
          ],
          memberCount: 12,
          lastModified: new Date('2024-01-08'),
          modifiedBy: 'hr_manager',
        },
        {
          id: '4',
          name: 'Employee',
          description: '일반 직원',
          type: 'custom',
          isBuiltIn: true,
          permissions: [
            { id: 'emp_view', name: '직원 조회', category: 'employees', canView: true, canEdit: false, canDelete: false, canApprove: false },
            { id: 'leave_request', name: '휴가 신청', category: 'leave', canView: true, canEdit: true, canDelete: false, canApprove: false },
            { id: 'payroll_view', name: '급여 조회', category: 'payroll', canView: true, canEdit: false, canDelete: false, canApprove: false },
          ],
          memberCount: 1250,
          lastModified: new Date('2024-01-05'),
          modifiedBy: 'system_admin',
        },
        {
          id: '5',
          name: 'Finance Officer',
          description: '재무 담당자',
          type: 'custom',
          isBuiltIn: false,
          permissions: [
            { id: 'payroll_view', name: '급여 조회', category: 'payroll', canView: true, canEdit: true, canDelete: false, canApprove: false },
            { id: 'payroll_manage', name: '급여 관리', category: 'payroll', canView: true, canEdit: true, canDelete: false, canApprove: true },
            { id: 'emp_view', name: '직원 조회', category: 'employees', canView: true, canEdit: false, canDelete: false, canApprove: false },
          ],
          memberCount: 3,
          lastModified: new Date('2024-01-12'),
          modifiedBy: 'admin_user',
        },
      ];
      setRoles(mockRoles);
    } catch (error) {
      message.error('역할 목록 조회 실패');
    } finally {
      setLoading(false);
    }
  };

  const detectConflicts = () => {
    const detectedConflicts: PermissionConflict[] = [];
    let count = 0;

    // Mock conflict detection logic
    const mockConflicts: PermissionConflict[] = [
      {
        id: 'conflict_1',
        type: 'permission_override',
        severity: 'warning',
        description: 'Finance Officer 역할이 급여 삭제 권한이 없으면서 급여 관리 권한을 가지고 있습니다.',
        affectedRoles: ['Finance Officer'],
        suggestion: '급여 삭제 권한을 추가하거나 급여 관리 권한을 검토하세요.',
        detectedDate: new Date('2024-01-15'),
      },
      {
        id: 'conflict_2',
        type: 'permission_redundancy',
        severity: 'info',
        description: 'Department Head와 Employee 역할이 모두 휴가 신청 권한을 가지고 있습니다.',
        affectedRoles: ['Department Head', 'Employee'],
        suggestion: 'Employee 역할의 권한 범위를 재검토하세요.',
        detectedDate: new Date('2024-01-15'),
      },
    ];

    setConflicts(mockConflicts);
    setConflictCount(mockConflicts.length);
  };

  const handleCreateRole = () => {
    setEditingRole(null);
    setIsDetailModalVisible(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsDetailModalVisible(true);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isBuiltIn) {
      message.error('기본 역할은 삭제할 수 없습니다.');
      return;
    }
    const newRoles = roles.filter(r => r.id !== roleId);
    setRoles(newRoles);
    message.success('역할이 삭제되었습니다.');
  };

  const handleSaveRole = (role: Role) => {
    if (editingRole) {
      const updatedRoles = roles.map(r => (r.id === role.id ? role : r));
      setRoles(updatedRoles);
      message.success('역할이 수정되었습니다.');
    } else {
      const newRole = { ...role, id: `${Date.now()}` };
      setRoles([...roles, newRole]);
      message.success('역할이 생성되었습니다.');
    }
    setIsDetailModalVisible(false);
    setEditingRole(null);
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchText.toLowerCase()) ||
    role.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: '24px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, color: '#1E293B', fontSize: '28px', fontWeight: 600 }}>역할 및 권한 관리</h1>
            <p style={{ margin: '8px 0 0 0', color: '#64748B', fontSize: '14px' }}>조직의 역할 기반 접근제어(RBAC)를 설정하고 관리합니다.</p>
          </div>
          <Space>
            {conflictCount > 0 && (
              <Tooltip title="권한 충돌 감지">
                <Badge
                  count={conflictCount}
                  style={{
                    backgroundColor: '#F59E0B',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                />
              </Tooltip>
            )}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateRole}
              style={{
                backgroundColor: '#1E3A8A',
                borderColor: '#1E3A8A',
              }}
            >
              새 역할 생성
            </Button>
          </Space>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'roles',
            label: (
              <span>
                <span style={{ marginRight: '8px' }}>📋</span>
                역할 목록
              </span>
            ),
            children: (
              <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <Input
                    placeholder="역할 이름 또는 설명으로 검색..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ maxWidth: '400px' }}
                  />
                </div>
                <RoleListSection
                  roles={filteredRoles}
                  loading={loading}
                  onEdit={handleEditRole}
                  onDelete={handleDeleteRole}
                />
              </div>
            ),
          },
          {
            key: 'matrix',
            label: (
              <span>
                <span style={{ marginRight: '8px' }}>🔐</span>
                권한 매트릭스
              </span>
            ),
            children: (
              <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px' }}>
                <PermissionMatrixView roles={roles} />
              </div>
            ),
          },
          {
            key: 'conflicts',
            label: (
              <span>
                <ExclamationCircleOutlined style={{ marginRight: '8px' }} />
                권한 충돌 검토
                {conflictCount > 0 && (
                  <Badge
                    count={conflictCount}
                    style={{
                      marginLeft: '8px',
                      backgroundColor: '#F59E0B',
                      color: '#fff',
                    }}
                  />
                )}
              </span>
            ),
            children: (
              <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px' }}>
                <ConflictDetectionPanel conflicts={conflicts} />
              </div>
            ),
          },
          {
            key: 'history',
            label: (
              <span>
                <HistoryOutlined style={{ marginRight: '8px' }} />
                변경 이력
              </span>
            ),
            children: (
              <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px' }}>
                <PermissionHistoryPanel roles={roles} />
              </div>
            ),
          },
        ]}
        style={{
          borderColor: '#E2E8F0',
        }}
      />

      <RoleDetailModal
        visible={isDetailModalVisible}
        onClose={() => setIsDetailModalVisible(false)}
        onSave={handleSaveRole}
        initialRole={editingRole}
      />
    </div>
  );
};

export default RolesPermissionsPage;