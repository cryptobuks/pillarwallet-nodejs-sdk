import { AxiosPromise } from 'axios';

import { Configuration } from './configuration';
import { HttpEndpoints } from './constants/httpEndpoints';
// Request Configuration
import { default as getConfiguration } from '../utils/requester-configurations/get';

// Import Validation Schemas
const investmentsDepositRequestSchema = require('../schemas/investments/depositRequest.json');
const icoListSchema = require('../schemas/investments/icoList.json');

export class Investments extends Configuration {
  /**
   * @name depositRequest
   * @description method to call deposit request api endpoint on platform-investments
   *
   * @param {InvestmentsDepositRequest} params
   * @returns {AxiosPromise}
   */
  depositRequest(params: InvestmentsDepositRequest): AxiosPromise {
    let slug: string = HttpEndpoints.INVESTMENTS_DEPOSIT_REQUEST;
    slug = slug.replace(/{walletId}/, params.walletId);
    slug = slug.replace(/{currency}/, params.currency);

    return this.executeRequest({
      params,
      sendParams: false,
      schema: investmentsDepositRequestSchema,
      defaultRequest: getConfiguration,
      url: `${Configuration.accessKeys.investmentsUrl}${slug}`,
    });
  }

  /**
   * @name icoList
   * @description Retrieve a list of ICO offerings available for a specific user
   *
   * @param {IcoList} params
   * @returns {AxiosPromise}
   */
  icoList(params: IcoList): AxiosPromise {
    return this.executeRequest({
      params,
      sendParams: false,
      schema: icoListSchema,
      defaultRequest: getConfiguration,
      url: `${Configuration.accessKeys.investmentsUrl}${
        HttpEndpoints.INVESTMENTS_USER_ICO
      }/${params.userId}/icos`,
    });
  }
}
