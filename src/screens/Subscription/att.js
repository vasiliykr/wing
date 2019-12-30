import React from 'react';
import { connect } from 'react-redux';
import { fetchFiltered as fetchFilteredInsuranceContracts } from 'insurance/insuranceContracts/actions';
import { getFilteredInsuranceContracts, getAttSubscription } from 'reducers';
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
    this.props.fetchFilteredInsuranceContracts({ attSubscription: this.props.subId });
  }

  render() {
    const { insuranceContracts, subId, subscription } = this.props;
    if (!subscription) {
      return null;
    }
    const { att_status: status, device_specs: sku } = subscription;
    const hasContracts = insuranceContracts.length;
    const insuranceEligibility = !hasContracts && status === 'active';

    return (
      <div className="Subscription">
        <SubscriptionSwitcher attSubId={subId} attRoute={routes.attSubscription} sprintRoute={routes.sprintSubscription} />
          <div className={styles.linkList}>
            { !hasContracts &&
              <Link className={styles.subscriptionLink} to={routes.attInsurance(subId)}>
                <Box>
                  <img src={add_green_circle} alt={'add green circle'} />
                  Insurance
                </Box>
              </Link>
            }
            { insuranceEligibility &&
              <Link className={styles.subscriptionLink} to={routes.attInsurancePlan(subId, sku)}>
                <Box>
                  <img src={add_green_circle} alt={'add green circle'} />
                  Select Plan
                </Box>
              </Link>
            }
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { subId }) => {
  return {
    insuranceContracts: getFilteredInsuranceContracts(state, { attSubscription: subId }),
    subscription: getAttSubscription(state, subId),
  };
};

const mapDispatchToProps = {
  fetchFilteredInsuranceContracts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubscriptionScreen);
