import { connect } from 'react-redux';
import * as routes from 'app/routes';
import InsuranceConfirm from './InsuranceConfirm';
import { getInsurancePlan } from 'reducers';
import { confirm as confirmInsuranceContract } from '../../insurance/insuranceContracts/actions';
import { navigate } from 'redux-saga-first-router';

const mapStateToProps = (state, { insPlanId }) => ({
  insurancePlan: getInsurancePlan(state, insPlanId),
  route: routes.attInsurancePlan,
});

const mapDispatchToProps = (dispatch, { subId }) => ({
  confirmInsuranceContract: (subId, sku, insPlanId) => dispatch(confirmInsuranceContract({ sub: { att_subscription: subId }, dev: { sku, insPlanId } })),
  goToSubscriptionPage: () => dispatch(navigate('ATT_SUBSCRIPTION', { subId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InsuranceConfirm);
