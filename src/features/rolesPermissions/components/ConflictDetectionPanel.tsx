import React, { useState } from 'react';
import { Alert, Card, Space, Button, Modal, Empty, Tooltip, Progress, Tag } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { PermissionConflict } from '../types';

interface ConflictDetectionPanelProps {
  conflicts: PermissionConflict[];
}

const ConflictDetectionPanel: React.FC<ConflictDetectionPanelProps> = ({ conflicts }) => {
  const [selectedConflict, setSelectedConflict] = useState<PermissionConflict | null>(null);
  const [resolvedConflicts, setResolvedConflicts] = useState<string[]>([]);

  const errorCount = conflicts.filter((c) => c.severity === 'error').length;
  const warningCount = conflicts.filter((c) => c.severity === 'warning').length;
  const infoCount = conflicts.filter((c) => c.severity === 'info').length;

  const unResolvedConflicts = conflicts.filter((c) => !resolvedConflicts.includes(c.id));

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <ExclamationCircleOutlined style={{ color: '#EF4444' }} />;
      case 'warning':
        return <ExclamationCircleOutlined style={{ color: '#F59E0B' }} />;
      case 'info':
        return <InfoCircleOutlined style={{ color: '#0EA5E9' }} />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'red';
      case 'warning':
        return 'orange';
      case 'info':
        return 'blue';
      default:
        return 'default';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'error':
        return '오류';
      case 'warning':
        return '경고';
      case 'info':
        return '정보';
      default:
        return 'Unknown';
    }
  };

  const handleResolveConflict = (conflictId: string) => {
    Modal.confirm({
      title: '충돌 해결',
      content: '이 충돌을 해결됨으로 표시하시겠습니까? 실제로 권한 설정을 변경해야 충돌이 완전히 해결됩니다.',
      okText: '해결됨 표시',
      cancelText: '취소',
      onOk: () => {
        setResolvedConflicts([...resolvedConflicts, conflictId]);
      },
    });
  };

  const handleViewDetails = (conflict: PermissionConflict) => {
    Modal.info({
      title: `${getSeverityLabel(conflict.severity)} - ${conflict.description}`,
      width: 700,
      content: (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ marginBottom: '12px' }}>영향받는 역할</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {conflict.affectedRoles.map((role) => (
                <Tag key={role} color="blue">
                  {role}
                </Tag>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ marginBottom: '12px' }}>감지된 날짜</h4>
            <p>{new Date(conflict.detectedDate).toLocaleString('ko-KR')}</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '12px' }}>권장 조치</h4>
            <div
              style={{
