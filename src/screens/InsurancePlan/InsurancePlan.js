import React from 'react';
import Back from 'common/Back';
import PlanCard from '../../insurance/insurancePlans/PlanCard';
import styles from './InsurancePlan.module.css';

export class InsurancePlan extends React.Component {
  componentDidMount() {
    this.props.fetchPlans('something');
  }

  render() {
    const { subId, insurancePlans, backRoute, confirmRoute } = this.props;
    
    return (
      <div>
        <div className={styles.Back}>
          <Back to={backRoute(subId)} />
        </div>
        <h1>
          Select an insurance plan
        </h1>
        <div className={styles.plans}>
          {insurancePlans.map(plan => (
            <PlanCard
              insurancePlan={plan}
              key={plan.id}
              insuranceConfirmRoute={confirmRoute}
              {...this.props} />
          ))}
        </div>
      </div>
    );
  }
}

export default InsurancePlan;
