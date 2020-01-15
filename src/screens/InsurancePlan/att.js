import { connect } from 'react-redux';
import * as routes from 'app/routes';
import { fetchValue as fetchPlans } from '../../insurance/insurancePlans/actions';
import InsurancePlan from './InsurancePlan';
import { getInsurancePlans } from '../../reducers';

const mapStateToProps = (state) => ({
  insurancePlans: Object.values(getInsurancePlans(state)),
  backRoute: routes.attSubscription,
  confirmRoute: routes.attInsuranceConfirm,
});

const mapDispatchToProps = {
  fetchPlans,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InsurancePlan);
