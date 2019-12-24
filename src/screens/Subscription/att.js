import React from 'react';
import { connect } from 'react-redux';
import { fetchFiltered as fetchFilteredInsuranceContracts } from 'insurance/insuranceContracts/actions';
import { getFilteredInsuranceContracts } from 'reducers';
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
    return (
      <div className="Subscription">
        <SubscriptionSwitcher attSubId={this.props.subId} attRoute={routes.attSubscription} sprintRoute={routes.sprintSubscription} />
        { !this.props.insuranceContracts.length &&
          <div className={styles.linkList}>
            <Link className={styles.subscriptionLink} to={routes.attInsurance(this.props.subId)}>
              <Box>
                <img src={add_green_circle} alt={'add green circle'} />
                Insurance
              </Box>
            </Link>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, { subId }) => {
  return {
    insuranceContracts: getFilteredInsuranceContracts(state, { attSubscription: subId }),
  };
};

const mapDispatchToProps = {
  fetchFilteredInsuranceContracts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubscriptionScreen);
