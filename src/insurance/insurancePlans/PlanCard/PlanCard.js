import React from 'react';
import Link from 'common/Link';
import styles from './PlanCard.module.css';

const PlanCard = ({ insurancePlan: plan, insuranceConfirmRoute, subId, sku }) => {
  if (!plan) { return null; }

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <h4 className={styles.name}>
          {plan.name}
        </h4>
        <div className={styles.startingAt}>Starting at</div>
        <div className={styles.price}>{`$${plan.price}`}</div>
        <div className={styles.more}>Terms, fees, and more info</div>
        <Link className={styles.cardBtn} to={insuranceConfirmRoute(subId, sku, plan.id)}>
          Select
        </Link>
      </div>
      <div className={styles.cardBottom}>
        <p>Protects your device against</p>
        <ul className={styles.list}>
          {planInfo(plan.sku).map((item, index) => <li className={styles.listItem} key={index}>{item}</li>)}
        </ul>
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.info}>
          Repair Deductible: ${plan.repair_deductible}
        </div>
        <div className={styles.info}>
          Replacement Deductible: ${plan.replacement_deductible}
        </div>
      </div>
    </div>
  )
};

const planInfo = (planSku) => {
  switch (planSku) {
    case 'WEW':
      return ['Malfunction (after the original manufacturer\'s warranty expires)'];
    case 'WDP3P':
    case 'WDPP5P':
      return ['Accidental damage', 'Loss and theft', 'Malfunction', 'Water damage', 'Broken screens'];
    default:
      return [''];
  }
};

export default PlanCard;
