import React, { useState } from 'react';
import { Card, Row, Col, Progress, Statistic, Select, Table, Tag, Tooltip } from 'antd';
import { BarChartOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface LeaveBalance {
  employeeId: string;
  employeeName: string;
  department: string;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
  plannedDays: number;
}

const mockBalanceData: LeaveBalance[] = [
  {
    employeeId: 'EMP001',
    employeeName: '김준호',
    department: '개발팀',
    totalDays: 15,
    usedDays: 5,
    remainingDays: 10,
    plannedDays: 3,
  },
  {
    employeeId: 'EMP002',
    employeeName: '박지은',
    department: '개발팀',
    totalDays: 15,
    usedDays: 8,
    remainingDays: 7,
    plannedDays: 2,
  },
  {
    employeeId: 'EMP003',
    employeeName: '최민수',
    department: '인사팀',
    totalDays: 15,
    usedDays: 3,
    remainingDays: 12,
    plannedDays: 5,
  },
  {
    employeeId: 'EMP004',
    employeeName: '정수현',
    department: '영업팀',
    totalDays: 15,
    usedDays: 10,
    remainingDays: 5,
    plannedDays: 4,
  },
  {
    employeeId: 'EMP005',
    employeeName: '서영희',
    department: '개발팀',
    totalDays: 15,
    usedDays: 2,
    remainingDays: 13,
    plannedDays: 1,
  },
];

interface SummaryStats {
  averageRemaining: number;
  criticalCount: number;
  totalAllocated: number;
}

const calculateSummary = (): SummaryStats => {
  const total = mockBalanceData.reduce((sum, item) => sum + item.remainingDays, 0);
  const critical = mockBalanceData.filter((item) => item.remainingDays < 2).length;
  return {
    averageRemaining: Math.round((total / mockBalanceData.length) * 10) / 10,
    criticalCount: critical,
    totalAllocated: mockBalanceData.reduce((sum, item) => sum + item.totalDays, 0),
  };
};

export const LeaveBalanceChart: React.FC = () => {
  const [filterDepartment, setFilterDepartment] = useState<string | undefined>(undefined);
  const summary = calculateSummary();

  const filteredData = filterDepartment
    ? mockBalanceData.filter((item) => item.department === filterDepartment)
    : mockBalanceData;

  const departments = Array.from(new Set(mockBalanceData.map((item) => item.department)));

  const columns: ColumnsType<LeaveBalance> = [
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
      title: '부서',
      dataIndex: 'department',
      key: 'department',
      width: 100,
      render: (text: string) => (
        <Tag color="blue" style={{ borderRadius: '4px' }}>
          {text}
        </Tag>
      ),
    },
    {
      title: '잔여 휴가',
      dataIndex: 'remainingDays',
      key: 'remainingDays',
      width: 100,
      align: 'center',
      render: (days: number) => {
        const color = days < 2 ? '#EF4444' : days < 5 ? '#F59E0B' : '#10B981';
        return (
          <span style={{ fontWeight: '600', color, fontSize: '16px' }}>{days}일</span>
        );
      },
    },
    {
      title: '사용 현황',
      dataIndex: 'usedDays',
      key: 'progress',
      width: 200,
      render: (_, record: LeaveBalance) => {
        const percentage = Math.round((record.usedDays / record.totalDays) * 100);
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#64748B' }}>사용: {record.usedDays}일</span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>{percentage}%</span>
            </div>
            <Progress
              percent={percentage}
              size="small"
              strokeColor="#0EA5E9"
              format={() => ''}
            />
          </div>
        );
      },
    },
    {
      title: '예정',
      dataIndex: 'plannedDays',
      key: 'plannedDays',
      width: 80,
      align: 'center',
      render: (days: number) => (
        <Tooltip title="승인 대기 중인 휴가">
          <Tag color="orange" style={{ borderRadius: '4px' }}>
            {days}일
          </Tag>
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      {/* Summary Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Card
            style={{
              borderLeft: '4px solid #0EA5E9',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <Statistic
              title=<div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
                <CalendarOutlined style={{ marginRight: '8px' }} />
                평균 잔여 휴가
              </div>
              value={summary.averageRemaining}
              suffix="일"
              valueStyle={{ color: '#0EA5E9', fontSize: '28px' }}
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
                주의 필요 인원
              </div>
              value={summary.criticalCount}
              suffix="명"
              valueStyle={{ color: '#EF4444', fontSize: '28px' }}
            />
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '8px', margin: 0 }}>
              2일 이하 남음
            </p>
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
                <TeamOutlined style={{ marginRight: '8px' }} />
                총 할당 휴가
              </div>
              value={summary.totalAllocated}
              suffix="일"
              valueStyle={{ color: '#10B981', fontSize: '28px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filter */}
      <Card
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          marginBottom: '16px',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', color: '#64748B', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
            부서 필터
          </label>
          <Select
            placeholder="모든 부서"
            value={filterDepartment}
            onChange={setFilterDepartment}
            allowClear
            options={departments.map((dept) => ({ label: dept, value: dept }))}
            style={{ width: '100%' }}
          />
        </div>
      </Card>

      {/* Balance Table */}
      <Card
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
        }}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BarChartOutlined style={{ color: '#0EA5E9' }} />
            <span style={{ fontWeight: '600', color: '#1E293B' }}>직원별 휴가 잔여 현황</span>
          </div>
        }
      >
        <Table<LeaveBalance>
          columns={columns}
          dataSource={filteredData}
          rowKey="employeeId"
          pagination={{ pageSize: 10 }}
          size="middle"
        />
      </Card>
    </div>
  );
};