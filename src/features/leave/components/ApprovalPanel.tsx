import React, { useState } from 'react';
import { Card, Form, Input, Button, Space, Divider, Alert, Steps, Tag, Row, Col, Empty } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

interface ApprovalRequest {
  id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  days: number;
  currentApprover: string;
  nextApprover?: string;
}

interface ApprovalPanelProps {
  onApprovalComplete?: (stats: any) => void;
}

const mockCurrentRequest: ApprovalRequest = {
  id: 'LR001',
  employeeName: '김준호',
  leaveType: '연차',
  startDate: '2024-02-15',
  endDate: '2024-02-17',
  reason: '가족 휴양',
  days: 3,
  currentApprover: '이순신',
  nextApprover: '강감찬',
};

export const ApprovalPanel: React.FC<ApprovalPanelProps> = ({ onApprovalComplete }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [approvalStep, setApprovalStep] = useState<'review' | 'decision' | 'comment'>('review');
  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null);
  const [showApprovalChain, setShowApprovalChain] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    setTimeout(() => {
      setApprovalStep('decision');
      setDecision('approved');
      setLoading(false);
      onApprovalComplete?.({
        status: 'success',
        requestId: mockCurrentRequest.id,
      });
    }, 1500);
  };

  const handleReject = async () => {
    setApprovalStep('comment');
    setDecision('rejected');
  };

  const handleSubmitComment = async () => {
    const comment = form.getFieldValue('comment');
    setLoading(true);
    setTimeout(() => {
      setApprovalStep('decision');
      setLoading(false);
      onApprovalComplete?.({
        status: 'rejected',
        requestId: mockCurrentRequest.id,
        comment,
      });
    }, 1500);
  };

  const handleReset = () => {
    setApprovalStep('review');
    setDecision(null);
    form.resetFields();
  };

  if (!mockCurrentRequest) {
    return (
      <Card
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
        }}
      >
        <Empty description="승인 대기 중인 요청이 없습니다" />
      </Card>
    );
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          {/* Main Approval Card */}
          <Card
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              marginBottom: '16px',
            }}
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileTextOutlined style={{ color: '#0EA5E9' }} />
                <span style={{ fontWeight: '600', color: '#1E293B' }}>휴가 신청 검토</span>
              </div>
            }
          >
            <div style={{ marginBottom: '24px' }}>
              <Steps
                current={approvalStep === 'review' ? 0 : approvalStep === 'comment' ? 1 : 2}
                items={[
                  { title: '신청 검토', status: 'finish' },
                  {
                    title: decision === 'rejected' ? '거부 사유' : '결과 확인',
                    status: approvalStep === 'comment' ? 'process' : approvalStep === 'decision' ? 'finish' : 'wait',
                  },
                  {
                    title: '완료',
                    status: approvalStep === 'decision' ? 'finish' : 'wait',
                  },
                ]}
              />
            </div>

            {approvalStep === 'review' && (
              <div>
                <Alert
                  message="신규 휴가 신청이 있습니다"
                  description="승인 대기 중인 신청을 검토하고 결정해주세요."
                  type="info"
                  showIcon
                  style={{ marginBottom: '20px', borderRadius: '6px' }}
                />

                <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '6px', marginBottom: '20px' }}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <div>
                        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>
                          <UserOutlined style={{ marginRight: '6px' }} />
                          직원명
                        </span>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', margin: '8px 0 0 0' }}>
                          {mockCurrentRequest.employeeName}
                        </p>
                      </div>
                    </Col>
                    <Col xs={24} sm={12}>
                      <div>
                        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>
                          휴가 유형
                        </span>
                        <p style={{ margin: '8px 0 0 0' }}>
                          <Tag color="blue" style={{ borderRadius: '4px' }}>
                            {mockCurrentRequest.leaveType}
                          </Tag>
                        </p>
                      </div>
                    </Col>
                    <Col xs={24} sm={12}>
                      <div>
                        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>
                          <CalendarOutlined style={{ marginRight: '6px' }} />
                          기간
                        </span>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', margin: '8px 0 0 0' }}>
                          {mockCurrentRequest.startDate} ~ {mockCurrentRequest.endDate}
                        </p>
                      </div>
                    </Col>
                    <Col xs={24} sm={12}>
                      <div>
                        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>휴가 일수</span>
                        <p style={{ fontSize: '20px', fontWeight: '700', color: '#0EA5E9', margin: '8px 0 0 0' }}>
                          {mockCurrentRequest.days}일
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '12px', color: '#64748B', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
                    신청 사유
                  </label>
                  <div
                    style={{
                      backgroundColor: '#F8FAFC',
                      padding: '12px',
                      borderRadius: '6px',
                      color: '#1E293B',
                      fontSize: '14px',
                      borderLeft: '3px solid #0EA5E9',
                    }}
                  >
                    {mockCurrentRequest.reason}
                  </div>
                </div>

                <Space style={{ width: '100%' }} direction="vertical">
                  <Button
                    type="primary"
                    size="large"
                    icon={<CheckCircleOutlined />}
                    onClick={handleApprove}
                    loading={loading}
                    style={{
                      backgroundColor: '#10B981',
                      borderColor: '#10B981',
                      width: '100%',
                      fontWeight: '600',
                    }}
                  >
                    승인
                  </Button>
                  <Button
                    danger
                    size="large"
                    icon={<CloseCircleOutlined />}
                    onClick={handleReject}
                    style={{ width: '100%', fontWeight: '600' }}
                  >
                    거부
                  </Button>
                </Space>
              </div>
            )}

            {approvalStep === 'comment' && decision === 'rejected' && (
              <Form form={form} layout="vertical">
                <Alert
                  message="거부 사유를 입력해주세요"
                  description="직원에게 거부 사유가 전달됩니다."
                  type="warning"
                  showIcon
                  style={{ marginBottom: '20px', borderRadius: '6px' }}
                />
                <Form.Item
                  label="거부 사유"
                  name="comment"
                  rules={[
                    {
                      required: true,
                      message: '거부 사유를 입력해주세요',
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="거부 사유를 입력하세요..."
                    rows={4}
                    maxLength={500}
                    showCount
                  />
                </Form.Item>
                <Space style={{ width: '100%' }}>
                  <Button type="primary" danger onClick={handleSubmitComment} loading={loading}>
                    거부 제출
                  </Button>
                  <Button onClick={() => setApprovalStep('review')}>뒤로</Button>
                </Space>
              </Form>
            )}

            {approvalStep === 'decision' && (
              <div>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    backgroundColor: decision === 'approved' ? '#ECFDF5' : '#FEF2F2',
                    borderRadius: '8px',
                    marginBottom: '20px',
                  }}
                >
                  {decision === 'approved' ? (
                    <>
                      <CheckCircleOutlined style={{ fontSize: '48px', color: '#10B981' }} />
                      <h3 style={{ color: '#10B981', marginTop: '12px' }}>승인되었습니다</h3>
                      <p style={{ color: '#64748B', margin: '8px 0 0 0' }}>
                        {mockCurrentRequest.employeeName}님의 휴가 신청이 승인되었습니다.
                      </p>
                    </>
                  ) : (
                    <>
                      <CloseCircleOutlined style={{ fontSize: '48px', color: '#EF4444' }} />
                      <h3 style={{ color: '#EF4444', marginTop: '12px' }}>거부되었습니다</h3>
                      <p style={{ color: '#64748B', margin: '8px 0 0 0' }}>
                        {mockCurrentRequest.employeeName}님께 거부 사유가 전달되었습니다.
                      </p>
                    </>
                  )}
                </div>
                <Button type="primary" onClick={handleReset} style={{ width: '100%' }}>
                  다음 신청 검토
                </Button>
              </div>
            )}
          </Card>
        </Col>

        {/* Sidebar - Approval Chain */}
        <Col xs={24} lg={8}>
          <Card
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
            }}
            title={
              <span style={{ fontWeight: '600', color: '#1E293B' }}>승인 단계</span>
            }
          >
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: '#F0F9FF',
                  borderRadius: '6px',
                  marginBottom: '8px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#0EA5E9',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    marginRight: '12px',
                  }}
                >
                  1
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>현재 승인자</p>
                  <p style={{ margin: '4px 0 0 0', fontWeight: '600', color: '#1E293B' }}>
                    {mockCurrentRequest.currentApprover}
                  </p>
                </div>
              </div>

              {mockCurrentRequest.nextApprover && (
                <>
                  <div style={{ textAlign: 'center', margin: '12px 0' }}>
                    <ArrowRightOutlined
                      style={{
                        color: '#CBD5E1',
                        fontSize: '18px',
                        transform: 'rotate(90deg)',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#CBD5E1',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '600',
                        marginRight: '12px',
                      }}
                    >
                      2
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>최종 승인자</p>
                      <p style={{ margin: '4px 0 0 0', fontWeight: '600', color: '#64748B' }}>
                        {mockCurrentRequest.nextApprover}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};