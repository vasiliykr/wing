import React from 'react';
import Back from 'common/Back';
import styles from './InsuranceConfirm.module.css';

import BottomButton from 'forms/BottomButton/link';
import DeviceInfo from 'devices/DeviceInfo';
import Box from 'common/Box';
import PlanInfo from 'insurance/insurancePlans/PlanInfo';

class InsuranceConfirm extends React.Component {
  handleConfirm = () => {
    const { subId, sku, insPlanId, confirmInsuranceContract, goToSubscriptionPage } = this.props;

    confirmInsuranceContract(subId, sku, insPlanId);
    goToSubscriptionPage();
  }

  render() {
    const { subId, sku, route, insurancePlan } = this.props;

    return (
      <div>
        <div className={styles.Back}>
          <Back to={route(subId, sku)} />
        </div>
        <div>
          <DeviceInfo deviceId={sku} />
  
          <Box className={styles.makeClaim}>
            <PlanInfo insurancePlan={insurancePlan} />
            <BottomButton onClick={this.handleConfirm} target="_blank">Confirm Plan Selection</BottomButton>
          </Box>
        </div>
      </div>
    );
  }
}

export default (InsuranceConfirm);
