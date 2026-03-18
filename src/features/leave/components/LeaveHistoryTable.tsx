import React, { useState } from 'react';
import { Table, Tag, Button, Space, Input, DatePicker, Select, Card, Row, Col, Tooltip } from 'antd';
import { DownloadOutlined, EyeOutlined, PrinterOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import dayjs from 'dayjs';

interface LeaveHistory {
  id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  approvedBy: string;
  approvedDate: string;
  status: 'approved' | 'rejected' | 'cancelled';
  reason?: string;
}

const mockHistoryData: LeaveHistory[] = [
  {
    id: 'LH001',
    employeeName: '김준호',
    leaveType: '연차',
    startDate: '2024-01-15',
    endDate: '2024-01-17',
    days: 3,
    approvedBy: '이순신',
    approvedDate: '2024-01-10',
    status: 'approved',
  },
  {
    id: 'LH002',
    employeeName: '박지은',
    leaveType: '병가',
    startDate: '2024-01-22',
    endDate: '2024-01-23',
    days: 2,
    approvedBy: '이순신',
    approvedDate: '2024-01-20',
    status: 'approved',
  },
  {
    id: 'LH003',
    employeeName: '최민수',
    leaveType: '특별휴가',
    startDate: '2024-01-25',
    endDate: '2024-01-26',
    days: 2,
    approvedBy: '강감찬',
    approvedDate: '2024-01-22',
    status: 'rejected',
    reason: '해당 기간 프로젝트 진행 중',
  },
  {
    id: 'LH004',
    employeeName: '정수현',
    leaveType: '연차',
    startDate: '2024-02-01',
    endDate: '2024-02-05',
    days: 5,
    approvedBy: '이순신',
    approvedDate: '2024-01-25',
    status: 'approved',
  },
  {
    id: 'LH005',
    employeeName: '서영희',
    leaveType: '무급휴가',
    startDate: '2024-02-10',
    endDate: '2024-02-12',
    days: 3,
    approvedBy: '강감찬',
    approvedDate: '2024-02-05',
    status: 'cancelled',
  },
];

const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    approved: 'green',
    rejected: 'red',
    cancelled: 'orange',
  };
  return colorMap[status] || 'default';
};

const getStatusLabel = (status: string): string => {
  const labelMap: Record<string, string> = {
    approved: '승인됨',
    rejected: '거부됨',
    cancelled: '취소됨',
  };
  return labelMap[status] || status;
};

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

export const LeaveHistoryTable: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [filterLeaveType, setFilterLeaveType] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  const filteredData = mockHistoryData.filter((item) => {
    const statusMatch = !filterStatus || item.status === filterStatus;
    const typeMatch = !filterLeaveType || item.leaveType === filterLeaveType;
    const searchMatch = item.employeeName.toLowerCase().includes(searchText.toLowerCase());
    const dateMatch = !dateRange || !dateRange[0] || !dateRange[1]
      ? true
      : dayjs(item.approvedDate).isAfter(dateRange[0]) && dayjs(item.approvedDate).isBefore(dateRange[1]);
    return statusMatch && typeMatch && searchMatch && dateMatch;
  });

  const columns: ColumnsType<LeaveHistory> = [
    {
      title: '직원명',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: 120,
      render: (text: string) => (
        <span style={{ fontWeight: '500', color: '#1E293B' }}>{text}</span>
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
      render: (_, record: LeaveHistory) => (
        <div style={{ fontSize: '13px', color: '#64748B' }}>
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
        <span style={{ fontWeight: '600', color: '#0EA5E9' }}>{days}일</span>
      ),
    },
    {
      title: '승인자',
      dataIndex: 'approvedBy',
      key: 'approvedBy',
      width: 100,
      render: (text: string) => (
        <span style={{ fontSize: '13px', color: '#64748B' }}>{text}</span>
      ),
    },
    {
      title: '승인일',
      dataIndex: 'approvedDate',
      key: 'approvedDate',
      width: 110,
      render: (date: string) => (
        <span style={{ fontSize: '13px', color: '#64748B' }}>{date}</span>
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
      title: '작업',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record: LeaveHistory) => (
        <Space size="small">
          <Tooltip title="상세보기">
            <Button type="text" size="small" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="다운로드">
            <Button type="text" size="small" icon={<DownloadOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const leaveTypes = Array.from(new Set(mockHistoryData.map((item) => item.leaveType)));

  return (
    <div>
      {/* Filters */}
      <Card
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          marginBottom: '16px',
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <label style={{ fontSize: '12px', color: '#64748B', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
              직원명 검색
            </label>
            <Input
              placeholder="직원명을 입력하세요"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12}>
            <label style={{ fontSize: '12px', color: '#64748B', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
              휴가 유형
            </label>
            <Select
              placeholder="모든 유형"
              value={filterLeaveType}
              onChange={setFilterLeaveType}
              allowClear
              options={leaveTypes.map((type) => ({ label: type, value: type }))}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12}>
            <label style={{ fontSize: '12px', color: '#64748B', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
              상태
            </label>
            <Select
              placeholder="모든 상태"
              value={filterStatus}
              onChange={setFilterStatus}
              allowClear
              options={[
                { label: '승인됨', value: 'approved' },
                { label: '거부됨', value: 'rejected' },
                { label: '취소됨', value: 'cancelled' },
              ]}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12}>
            <label style={{ fontSize: '12px', color: '#64748B', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
              승인일 범위
            </label>
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              onChange={(dates) => setDateRange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null] | null)}
            />
          </Col>
        </Row>
      </Card>

      {/* History Table */}
      <Card
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
        }}
      >
        <Table<LeaveHistory>
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={pagination}
          onChange={(newPagination) => setPagination(newPagination)}
          size="middle"
        />
      </Card>
    </div>
  );
};