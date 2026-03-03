import {
	Model,
  Types,
	Connection,
} from 'mongoose';
import {
  ICompany,
	getCompanyModel,
} from '../models/company.model';
import { CompanyPayrollDTO } from '../types';

export class CompanyPayrollQueryRepository {
	private companyModel: Model<ICompany>;

	constructor(connection: Connection) {
		this.companyModel = getCompanyModel(connection);
	}

  async findMatricesAndFiliaisWithPayrolls() {
    return this.companyModel.aggregate<CompanyPayrollDTO>([
      { $match: { companyType: 'matriz' } },
      {
        $lookup: {
          from: 'payrolls',
          localField: '_id',
          foreignField: 'companyId',
          as: 'payrolls',
        },
      },
      {
        $unionWith: {
          coll: 'companies',
          pipeline: [
            { $match: { companyType: 'filial' } },
            {
              $lookup: {
                from: 'payrolls',
                localField: '_id',
                foreignField: 'companyId',
                as: 'payrolls',
              },
            },
          ],
        },
      },
    ]);
  }

  async findMatricesAndFiliaisWithPayrollsById(userId: string | Types.ObjectId) {
    const objectUserId = new Types.ObjectId(userId);
    
    return this.companyModel.aggregate<CompanyPayrollDTO>([
      {
        $lookup: {
          from: 'user-companies',
          localField: '_id',
          foreignField: 'companyId',
          as: 'userLink',
        },
      },
      {
        $match: {
          companyType: 'matriz',
          'userLink.userId': objectUserId,
        },
      },

      {
        $lookup: {
          from: 'companies',
          localField: '_id',
          foreignField: 'parentId',
          as: 'filiais',
        },
      },

      {
        $addFields: {
          allCompanies: {
            $concatArrays: [
              ['$$ROOT'],
              '$filiais',
            ],
          },
        },
      },

      { $unwind: '$allCompanies' },

      {
        $replaceRoot: {
          newRoot: '$allCompanies',
        },
      },

      {
        $lookup: {
          from: 'payrolls',
          localField: '_id',
          foreignField: 'companyId',
          as: 'payrolls',
        }
      },
    ]);
  }
}