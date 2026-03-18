import React, { useState, useMemo } from 'react';
import { Table, Tag, Button, Space, Tooltip, Empty, Badge, Input, Select, Row, Col } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  approver: string;
}

interface LeaveRequestQueueProps {
  selectedRequests: string[];
  onSelectionChange: (ids: string[]) => void;
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'LR001',
    employeeName: '김준호',
    employeeId: 'EMP001',
    leaveType: '연차',
    startDate: '2024-02-15',
    endDate: '2024-02-17',
    days: 3,
    reason: '가족 휴양',
    status: 'pending',
    submittedDate: '2024-02-01',
    approver: '이순신',
  },
  {
    id: 'LR002',
    employeeName: '박지은',
    employeeId: 'EMP002',
    leaveType: '병가',
    startDate: '2024-02-10',
    endDate: '2024-02-12',
    days: 2,
    reason: '감기',
    status: 'pending',
    submittedDate: '2024-02-09',
    approver: '이순신',
  },
  {
    id: 'LR003',
    employeeName: '최민수',
    employeeId: 'EMP003',
    leaveType: '특별휴가',
    startDate: '2024-03-01',
    endDate: '2024-03-03',
    days: 3,
    reason: '결혼식 참석',
    status: 'pending',
    submittedDate: '2024-02-05',
    approver: '이순신',
  },
  {
    id: 'LR004',
    employeeName: '정수현',
    employeeId: 'EMP004',
    leaveType: '연차',
    startDate: '2024-02-20',
    endDate: '2024-02-25',
    days: 5,
    reason: '여행',
    status: 'approved',
    submittedDate: '2024-02-01',
    approver: '이순신',
  },
  {
    id: 'LR005',
    employeeName: '서영희',
    employeeId: 'EMP005',
    leaveType: '병가',
    startDate: '2024-02-05',
    endDate: '2024-02-06',
    days: 1,
    reason: '치과 진료',
    status: 'approved',
    submittedDate: '2024-02-04',
    approver: '이순신',
  },
];

const getLeaveTypeColor = (type: string): string => {
  const colorMap: Record<string, string> = {
    연차: 'blue',
    병가: 'red',
    특별휴가: 'green',
    무급휴가: 'orange',
    육아휴직: 'purple',
  };
  return colorMap[type] || 'default';
};

const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    pending: 'orange',
    approved: 'green',
    rejected: 'red',
  };
  return colorMap[status] || 'default';
};

const getStatusLabel = (status: string): string => {
  const labelMap: Record<string, string> = {
    pending: '승인 대기',
    approved: '승인됨',
    rejected: '거부됨',
  };
  return labelMap[status] || status;
};

export const LeaveRequestQueue: React.FC<LeaveRequestQueueProps> = ({
  selectedRequests,
  onSelectionChange,
}) => {
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>('');
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  const filteredData = useMemo(() => {
    return mockLeaveRequests.filter((item) => {
      const statusMatch = !filterStatus || item.status === filterStatus;
      const searchMatch =
        item.employeeName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(searchText.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [filterStatus, searchText]);

  const columns: ColumnsType<LeaveRequest> = [
    {
      title: '직원명',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: 120,
      render: (text: string, record: LeaveRequest) => (
        <Space size="small">
          <UserOutlined style={{ color: '#0EA5E9' }} />
          <span style={{ fontWeight: '500', color: '#1E293B' }}>{text}</span>
        </Space>
      ),
    },
    {
      title: '휴가 유형',
      dataIndex: 'leaveType',
      key: 'leaveType',
      width: 100,
      render: (text: string) => (
        <Tag color={getLeaveTypeColor(text)} style={{ borderRadius: '4px' }}>
          {text}
        </Tag>
      ),
    },
    {
      title: '기간',
      dataIndex: 'startDate',
      key: 'period',
      width: 150,
      render: (_, record: LeaveRequest) => (
        <div style={{ fontSize: '13px', color: '#64748B' }}>
          <CalendarOutlined style={{ marginRight: '6px' }} />
          {record.startDate} ~ {record.endDate}
        </div>
      ),
    },
    {
      title: '일수',
      dataIndex: 'days',
      key: 'days',
      width: 60,
      align: 'center',
      render: (days: number) => (
        <Badge
          count={days}
          style={{
            backgroundColor: '#0EA5E9',
            color: '#fff',
            fontSize: '12px',
            fontWeight: '600',
          }}
        />
      ),
    },
    {
      title: '사유',
      dataIndex: 'reason',
      key: 'reason',
      width: 150,
      render: (text: string) => (
        <Tooltip title={text}>
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={getStatusColor(status)} style={{ borderRadius: '4px' }}>
          {getStatusLabel(status)}
        </Tag>
      ),
    },
    {
      title: '신청일',
      dataIndex: 'submittedDate',
      key: 'submittedDate',
      width: 100,
      render: (date: string) => <span style={{ fontSize: '13px', color: '#64748B' }}>{date}</span>,
    },
    {
      title: '작업',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record: LeaveRequest) =>
        record.status === 'pending' ? (
          <Space size="small">
            <Tooltip title="승인">
              <Button
                type="text"
                size="small"
                icon={<CheckOutlined />}
                style={{ color: '#10B981' }}
                onClick={() => console.log('Approve:', record.id)}
              />
            </Tooltip>
            <Tooltip title="거부">
              <Button
                type="text"
                size="small"
                icon={<CloseOutlined />}
                style={{ color: '#EF4444' }}
                onClick={() => console.log('Reject:', record.id)}
              />
            </Tooltip>
          </Space>
        ) : (
          <Tooltip title="상세보기">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => console.log('View:', record.id)}
            />
          </Tooltip>
        ),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col xs={24} sm={12}>
          <Input
            placeholder="직원명 또는 ID로 검색"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ borderRadius: '6px' }}
          />
        </Col>
        <Col xs={24} sm={12}>
          <Select
            placeholder="상태 필터"
            value={filterStatus}
            onChange={setFilterStatus}
            allowClear
            options={[
              { label: '승인 대기', value: 'pending' },
              { label: '승인됨', value: 'approved' },
              { label: '거부됨', value: 'rejected' },
            ]}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>

      <Table<LeaveRequest>
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={pagination}
        onChange={(newPagination) => setPagination(newPagination)}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedRequests,
          onChange: (keys) => onSelectionChange(keys as string[]),
        }}
        locale={{
          emptyText:
            filteredData.length === 0 ? (
              <Empty description="휴가 신청이 없습니다" />
            ) : undefined,
        }}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
        size="middle"
      />
    </div>
  );
};