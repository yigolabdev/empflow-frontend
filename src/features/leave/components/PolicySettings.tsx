import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Button, Space, Table, Tag, Modal, message, Row, Col, Select, Divider } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface LeavePolicy {
  id: string;
  name: string;
  description: string;
  daysPerYear: number;
  carryOverDays: number;
  expirationMonths: number;
  requiresApproval: boolean;
  applicableEmployees: string;
}

const mockPolicies: LeavePolicy[] = [
  {
    id: 'P001',
    name: '연차',
    description: '일반 직원의 연간 휴가',
    daysPerYear: 15,
    carryOverDays: 5,
    expirationMonths: 12,
    requiresApproval: true,
    applicableEmployees: '정규직',
  },
  {
    id: 'P002',
    name: '병가',
    description: '질병으로 인한 휴가',
    daysPerYear: 10,
    carryOverDays: