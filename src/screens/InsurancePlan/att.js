import React from 'react';
import * as routes from 'app/routes';
import Back from 'common/Back';
import styles from './InsurancePlan.module.css';
import { fetchValue } from '../../insurance/insurancePlans/api';
import PlanCard from '../../insurance/insurancePlans/PlanCard';

export class AttInsurancePlan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plans: [],
    }
  }

  componentDidMount() {
    fetchValue('something').then(plans => {
      this.setState({ plans: plans.data.results });
    });
  }

  render() {
    return (
      <div>
        <div className={styles.Back}>
          <Back to={routes.attSubscription(this.props.subId)} />
        </div>
        <h1>
          Select an insurance plan
        </h1>
        <div className={styles.plans}>
          {this.state.plans.map(plan => (
            <PlanCard
              insurancePlan={plan}
              key={plan.id}
              insuranceConfirmRoute={routes.attInsuranceConfirm}
              {...this.props} />
          ))}
        </div>
      </div>
    );
  }
}

export default AttInsurancePlan;
