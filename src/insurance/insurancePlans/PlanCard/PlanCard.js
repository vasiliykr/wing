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
        <div className={styles.info}>
          Repair Deductible: ${plan.repair_deductible}
        </div>
        <div className={styles.info}>
          Replacement Deductible: ${plan.replacement_deductible}
        </div>
      </div>
    </div>
  )
}

export default PlanCard;
