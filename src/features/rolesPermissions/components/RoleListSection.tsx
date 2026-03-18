import React from 'react';
import { Table, Button, Space, Tag, Tooltip, Modal, Empty } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import type { Role } from '../types';

interface RoleListSectionProps {
  roles: Role[];
  loading: boolean;
  onEdit: (role: Role) => void;
  onDelete: (roleId: string) => void;
}

const RoleListSection: React.FC<RoleListSectionProps> = ({
  roles,
  loading,
  onEdit,
  onDelete,
}) => {
  const handleDelete = (role: Role) => {
    if (role.isBuiltIn) {
      Modal.error({
        title: '삭제 불가',
        content: '기본 역할은 삭제할 수 없습니다.',
      });
      return;
    }
    Modal.confirm({
      title: '역할 삭제',
      content: `"${role.name}" 역할을 삭제하시겠습니까? 이 역할에 속한 사용자들은 역할이 제거됩니다.`,
      okText: '삭제',
      cancelText: '취소',
      okButtonProps: { danger: true },
      onOk: () => onDelete(role.id),
    });
  };

  const columns = [
    {
      title: '역할 이름',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      render: (text: string, record: Role) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1E293B', marginBottom: '4px' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#64748B' }}>{record.description}</div>
          {record.isBuiltIn && (
            <Tag color="blue" style={{ marginTop: '4px' }}>
              기본 역할
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: '유형',
      dataIndex: 'type',
      key: 'type',
      width: '15%',
      render: (type: string) => {
        const tagColor = type === 'system' ? 'purple' : 'cyan';
        const tagLabel = type === 'system' ? '시스템' : '커스텀';
        return <Tag color={tagColor}>{tagLabel}</Tag>;
      },
    },
    {
      title: '권한 수',
      dataIndex: 'permissions',
      key: 'permissionCount',
      width: '12%',
      render: (permissions: any[]) => (
        <span style={{ color: '#0EA5E9', fontWeight: 600 }}>{permissions?.length || 0}</span>
      ),
    },
    {
      title: '사용자 수',
      dataIndex: 'memberCount',
      key: 'memberCount',
      width: '15%',
      render: (count: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserOutlined style={{ color: '#10B981' }} />
          <span>{count}명</span>
        </div>
      ),
    },
    {
      title: '마지막 수정',
      dataIndex: 'lastModified',
      key: 'lastModified',
      width: '15%',
      render: (date: Date) => (
        <div>
          <div style={{ color: '#1E293B' }}>{new Date(date).toLocaleDateString('ko-KR')}</div>
          <div style={{ fontSize: '12px', color: '#64748B' }}>{new Date(date).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      ),
    },
    {
      title: '작업',
      key: 'action',
      width: '18%',
      render: (_: any, record: Role) => (
        <Space>
          <Tooltip title="편집">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              style={{ color: '#0EA5E9' }}
            />
          </Tooltip>
          <Tooltip title={record.isBuiltIn ? '기본 역할은 삭제할 수 없습니다' : '삭제'}>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
              disabled={record.isBuiltIn}
              style={{ color: record.isBuiltIn ? '#CBD5E1' : '#EF4444' }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (roles.length === 0 && !loading) {
    return <Empty description="역할이 없습니다." />;
  }

  return (
    <Table
      columns={columns}
      dataSource={roles.map((role) => ({ ...role, key: role.id }))}
      loading={loading}
      pagination={{
        pageSize: 10,
        total: roles.length,
        showSizeChanger: true,
        showTotal: (total) => `총 ${total}개의 역할`,
        position: ['bottomRight'],
      }}
      style={{
        borderColor: '#E2E8F0',
      }}
      rowHoverable
    />
  );
};

export default RoleListSection;