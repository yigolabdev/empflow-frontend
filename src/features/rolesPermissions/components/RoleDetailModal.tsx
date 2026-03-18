import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Checkbox, Button, Divider, Space, message, Tabs } from 'antd';
import type { Role, Permission } from '../types';

const PERMISSION_CATEGORIES = [
  { label: '직원 관리', value: 'employees' },
  { label: '근태 관리', value: 'attendance' },
  { label: '휴가 관리', value: 'leave' },
  { label: '급여 관리', value: 'payroll' },
  { label: '시스템', value: 'system' },
];

const DEFAULT_PERMISSIONS: Permission[] = [
  {
    id: 'emp_view',
    name: '직원 조회',
    category: 'employees',
    canView: false,
    canEdit: false,
    canDelete: false,
    canApprove: false,
  },
  {
    id: 'emp_manage',
    name: '직원 관리',
    category: 'employees',
    canView: false,
    canEdit: false,
    canDelete: false,
    canApprove: false,
  },
  {
    id: 'att_view',
    name: '근태 조회',
    category: 'attendance',
    canView: false,
    canEdit: false,
    canDelete: false,
    canApprove: false,
  },
  {
    id: 'leave_request',
    name: '휴가 신청',
    category: 'leave',
    canView: false,
    canEdit: false,
    canDelete: false,
    canApprove: false,
  },
  {
    id: 'leave_approve',
    name: '휴가 승인',
    category: 'leave',
    canView: false,
    canEdit: false,
    canDelete: false,
    canApprove: false,
  },
  {
    id: 'payroll_view',
    name: '급여 조회',
    category: 'payroll',
    canView: false,
    canEdit: false,
    canDelete: false,
    canApprove: false,
  },
  {
    id: 'payroll_manage',
    name: '급여 관리',
    category: 'payroll',
    canView: false,
    canEdit: false,
    canDelete: false,
    canApprove: false,
  },
  {
    id: 'role_manage',
    name: '역할 관리',
    category: 'system',
    canView: false,
    canEdit: false,
    canDelete: false,
    canApprove: false,
  },
  {
    id: 'audit_view',
    name: '감사 로그 조회',
    category: 'system',
    canView: false,
    canEdit: false,
    canDelete: false,
    canApprove: false,
  },
];

interface RoleDetailModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (role: Role) => void;
  initialRole: Role | null;
}

const RoleDetailModal: React.FC<RoleDetailModalProps> = ({
  visible,
  onClose,
  onSave,
  initialRole,
}) => {
  const [form] = Form.useForm();
  const [permissions, setPermissions] = useState<Permission[]>(DEFAULT_PERMISSIONS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      if (initialRole) {
        form.setFieldsValue({
          name: initialRole.name,
          description: initialRole.description,
        });
        setPermissions(initialRole.permissions);
      } else {
        form.resetFields();
        setPermissions(DEFAULT_PERMISSIONS.map((p) => ({ ...p })));
      }
    }
  }, [visible, initialRole, form]);

  const handlePermissionChange = (
    permissionId: string,
    field: keyof Omit<Permission, 'id' | 'name' | 'category'>,
    value: boolean
  ) => {
    setPermissions((prev) =>
      prev.map((p) =>
        p.id === permissionId ? { ...p, [field]: value } : p
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const role: Role = {
        id: initialRole?.id || `${Date.now()}`,
        name: values.name,
        description: values.description,
        type: initialRole?.type || 'custom',
        isBuiltIn: initialRole?.isBuiltIn || false,
        permissions,
        memberCount: initialRole?.memberCount || 0,
        lastModified: new Date(),
        modifiedBy: 'current_user',
      };

      onSave(role);
      setLoading(false);
    } catch (error) {
      message.error('입력 값을 확인해주세요.');
    }
  };

  const groupedPermissions = PERMISSION_CATEGORIES.map((category) => ({
    ...category,
    permissions: permissions.filter((p) => p.category === category.value),
  }));

  return (
    <Modal
      title={initialRole ? '역할 편집' : '새 역할 생성'}
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={900}
      okText={initialRole ? '저장' : '생성'}
      cancelText="취소"
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
      >
        <Form.Item
          name="name"
          label="역할 이름"
          rules={[{ required: true, message: '역할 이름을 입력해주세요.' }]}
        >
          <Input
            placeholder="예: Sales Manager"
            disabled={initialRole?.isBuiltIn}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="설명"
          rules={[{ required: true, message: '역할 설명을 입력해주세요.' }]}
        >
          <Input.TextArea
            rows={2}
            placeholder="이 역할의 목적과 책임을 설명해주세요."
            disabled={initialRole?.isBuiltIn}
          />
        </Form.Item>
      </Form>

      <Divider style={{ margin: '24px 0' }} />

      <h3 style={{ marginBottom: '16px', color: '#1E293B', fontWeight: 600 }}>권한 설정</h3>

      <Tabs
        items={groupedPermissions.map((category) => ({
          key: category.value,
          label: category.label,
          children: (
            <div style={{ marginTop: '16px' }}>
              {category.permissions.length === 0 ? (
                <p style={{ color: '#64748B' }}>이 카테고리에 권한이 없습니다.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  {category.permissions.map((perm) => (
                    <div
                      key={perm.id}
                      style={{
                        padding: '12px',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        backgroundColor: '#F8FAFC',
                      }}
                    >
                      <div style={{ fontWeight: 500, color: '#1E293B', marginBottom: '12px' }}>
                        {perm.name}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
                        <Checkbox
                          checked={perm.canView}
                          onChange={(e) =>
                            handlePermissionChange(perm.id, 'canView', e.target.checked)
                          }
                        >
                          <span style={{ fontSize: '12px' }}>조회</span>
                        </Checkbox>
                        <Checkbox
                          checked={perm.canEdit}
                          onChange={(e) =>
                            handlePermissionChange(perm.id, 'canEdit', e.target.checked)
                          }
                        >
                          <span style={{ fontSize: '12px' }}>수정</span>
                        </Checkbox>
                        <Checkbox
                          checked={perm.canDelete}
                          onChange={(e) =>
                            handlePermissionChange(perm.id, 'canDelete', e.target.checked)
                          }
                        >
                          <span style={{ fontSize: '12px' }}>삭제</span>
                        </Checkbox>
                        <Checkbox
                          checked={perm.canApprove}
                          onChange={(e) =>
                            handlePermissionChange(perm.id, 'canApprove', e.target.checked)
                          }
                        >
                          <span style={{ fontSize: '12px' }}>승인</span>
                        </Checkbox>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ),
        }))}
      />
    </Modal>
  );
};

export default RoleDetailModal;