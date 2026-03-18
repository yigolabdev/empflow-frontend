import React from 'react';
import { Collapse, Empty } from 'antd';
import { FAQItem } from '@/features/pricing/data/pricingData';
import styles from '@/features/pricing/styles/FAQAccordion.module.css';

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return <Empty description="자주 묻는 질문이 없습니다." />;
  }

  const collapseItems = items.map((item) => ({
    key: item.id,
    label: (
      <span className={styles.questionLabel}>
        {item.category && (
          <span className={styles.category}>{item.category}</span>
        )}
        {item.question}
      </span>
    ),
    children: (
      <div className={styles.answerContent}>
        <p>{item.answer}</p>
        {item.details && (
          <ul className={styles.detailsList}>
            {item.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        )}
      </div>
    ),
  }));

  return (
    <Collapse
      items={collapseItems}
      className={styles.faqAccordion}
      accordion
      style={{
        backgroundColor: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: 8,
      }}
    />
  );
};

export default FAQAccordion;