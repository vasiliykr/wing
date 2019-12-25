import React from 'react';
import { connect } from 'react-redux';
import { fetchFiltered as fetchFilteredInsuranceContracts } from 'insurance/insuranceContracts/actions';
import { getFilteredInsuranceContracts, getSprintSubscription } from 'reducers';
import SubscriptionSwitcher from 'subscriptions/SubscriptionSwitcher';
import Box from 'common/Box';
import Link from 'common/Link';
import * as routes from 'app/routes';
import add_green_circle from 'common/img/add_green_circle.svg';
import styles from './Subscription.module.css';

export class SubscriptionScreen extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.props.fetchFilteredInsuranceContracts({ subscription: this.props.subId });
  }

  render() {
    const { insuranceContracts, subId, status } = this.props;
    const hasContracts = insuranceContracts.length;
    const insuranceEligibility = !hasContracts && status && status.sprint_status === 'active';

    return (
      <div className="Subscription">
        <SubscriptionSwitcher sprintSubId={subId} sprintRoute={routes.sprintSubscription} attRoute={routes.attSubscription} />
        { insuranceEligibility &&
          <div className={styles.linkList}>
            <Link className={styles.subscriptionLink} to={routes.sprintInsurance(subId)}>
              <Box>
                <img src={add_green_circle} alt={'add green circle'} />
                Insurance
              </Box>
            </Link>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, { subId }) => {
  return {
    insuranceContracts: getFilteredInsuranceContracts(state, { subscription: subId }),
    status: getSprintSubscription(state, subId),
  };
};

const mapDispatchToProps = {
  fetchFilteredInsuranceContracts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubscriptionScreen);
