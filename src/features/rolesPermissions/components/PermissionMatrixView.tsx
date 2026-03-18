import React, { useState } from 'react';
import { Table, Select, Space, Tooltip, Badge, Button, Segmented } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { Role } from '../types';

interface PermissionMatrixViewProps {
  roles: Role[];
}

const PERMISSION_CATEGORIES = [
  { label: '전체', value: 'all' },
  { label: '직원 관리', value: 'employees' },
  { label: '근태 관리', value: 'attendance' },
  { label: '휴가 관리', value: 'leave' },
  { label: '급여 관리', value: 'payroll' },
  { label: '시스템', value: 'system' },
];

const PermissionMatrixView: React.FC<PermissionMatrixViewProps> = ({ roles }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'matrix' | 'list'>('matrix');

  // Get all unique permissions from all roles
  const allPermissions = Array.from(
    new Map(
      roles
        .flatMap((role) => role.permissions)
        .map((perm) => [perm.id, perm])
    ).values()
  ).filter((perm) => selectedCategory === 'all' || perm.category === selectedCategory);

  const permissionTypes = ['조회', '수정', '삭제', '승인'];
  const permissionFields: Array<'canView' | 'canEdit' | 'canDelete' | 'canApprove'> = ['canView', 'canEdit', 'canDelete', 'canApprove'];

  const renderCheckmark = (hasPermission: boolean) => {
    return hasPermission ? (
      <CheckCircleOutlined style={{ color: '#10B981', fontSize: '16px' }} />
    ) : (
      <CloseCircleOutlined style={{ color: '#CBD5E1', fontSize: '16px' }} />
    );
  };

  if (viewMode === 'list') {
    const columns = [
      {
        title: '권한',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
        render: (text: string, record: any) => (
          <div>
            <div style={{ fontWeight: 600, color: '#1E293B' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
              {PERMISSION_CATEGORIES.find((c) => c.value === record.category)?.label}
            </div>
          </div>
        ),
      },
      ...permissionTypes.map((type, idx) => ({
        title: type,
        dataIndex: ['permissions', idx],
        key: `type-${type}`,
        width: `${(75 / (permissionTypes.length * 2))}%`,
        render: (_: any, record: any) => {
          const rolesWithPermission = roles.filter((role) =>
            role.permissions.some(
              (p) =>
                p.id === record.id &&
                (permissionFields[idx] as keyof typeof p)[permissionFields[idx] as never]
            )
          );
          return (
            <Tooltip
              title={rolesWithPermission.length > 0 ? rolesWithPermission.map((r) => r.name).join(', ') : '없음'}
            >
              <Badge
                count={rolesWithPermission.length}
                style={{
                  backgroundColor: rolesWithPermission.length > 0 ? '#10B981' : '#CBD5E1',
                  color: '#fff',
                  fontSize: '11px',
                }}
              />
            </Tooltip>
          );
        },
      })),
    ];

    const dataSource = allPermissions.map((perm) => ({ ...perm, key: perm.id }));

    return (
      <div>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}
        >
          <Select
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={PERMISSION_CATEGORIES}
            style={{ width: '200px' }}
          />
          <Segmented
            value={viewMode}
            onChange={(value) => setViewMode(value as 'matrix' | 'list')}
            options={[
              { label: '매트릭스 뷰', value: 'matrix' },
              { label: '목록 뷰', value: 'list' },
            ]}
          />
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={PERMISSION_CATEGORIES}
          style={{ width: '200px' }}
        />
        <Segmented
          value={viewMode}
          onChange={(value) => setViewMode(value as 'matrix' | 'list')}
          options={[
            { label: '매트릭스 뷰', value: 'matrix' },
            { label: '목록 뷰', value: 'list' },
          ]}
        />
      </div>

      <div
        style={{
          overflowX: 'auto',
          borderRadius: '6px',
          border: '1px solid #E2E8F0',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#F1F5F9', borderBottom: '2px solid #E2E8F0' }}>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: 600,
                  color: '#1E293B',
                  borderRight: '1px solid #E2E8F0',
                  minWidth: '200px',
                }}
              >
                권한
              </th>
              {roles.map((role) => (
                <th
                  key={role.id}
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#1E293B',
                    borderRight: '1px solid #E2E8F0',
                    minWidth: '120px',
                  }}
                >
                  <Tooltip title={role.description}>
                    <div>{role.name}</div>
                  </Tooltip>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPermissions.map((permission, idx) => (
              <tr
                key={permission.id}
                style={{
                  borderBottom: '1px solid #E2E8F0',
                  backgroundColor: idx % 2 === 0 ? '#F8FAFC' : '#fff',
                }}
              >
                <td
                  style={{
                    padding: '12px',
                    fontWeight: 500,
                    color: '#1E293B',
                    borderRight: '1px solid #E2E8F0',
                  }}
                >
                  <div>
                    <div style={{ marginBottom: '4px' }}>{permission.name}</div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: '#64748B',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '4px',
                      }}
                    >
                      {permissionTypes.map((type) => (
                        <span key={type}>• {type}</span>
                      ))}
                    </div>
                  </div>
                </td>
                {roles.map((role) => {
                  const rolePermission = role.permissions.find((p) => p.id === permission.id);
                  const hasAnyPermission = rolePermission &&
                    (rolePermission.canView ||
                      rolePermission.canEdit ||
                      rolePermission.canDelete ||
                      rolePermission.canApprove);

                  return (
                    <td
                      key={`${role.id}-${permission.id}`}
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        borderRight: '1px solid #E2E8F0',
                        backgroundColor: hasAnyPermission ? '#F0FDF4' : '#F8FAFC',
                      }}
                    >
                      {rolePermission ? (
                        <Tooltip
                          title={
                            <div style={{ textAlign: 'left' }}>
                              {permissionFields.map((field, pidx) => (
                                <div key={field}>
                                  {permissionTypes[pidx]}:{' '}
                                  {rolePermission[field as keyof typeof rolePermission] ? '✓' : '✗'}
                                </div>
                              ))}
                            </div>
                          }
                        >
                          {renderCheckmark(hasAnyPermission as boolean)}
                        </Tooltip>
                      ) : (
                        renderCheckmark(false)
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionMatrixView;