import {
	Types,
	Schema,
	Connection,
} from 'mongoose';
import { getModel } from '@/database/model-registry';
import { MODEL_NAME as COMPANY } from '@/shared/constants/company';
import { MODEL_NAME as PAYROLL } from '@/shared/constants/payroll';

interface ISummary {
	title: string;
	value: number;
};

interface IDetails {
	obligation: string;
	amount: number;
	dueDate: Date;
	documentType: string;
};

interface IEvolution {
	month: string;
	amount: number;
};

interface IIndicators {
	employees: number;
	admitted: number;
	dismissed: number;
	avgCostPerEmployee: number;
};

export interface IPayroll {
	companyId: Types.ObjectId;
	competence: string;
	paymentTermLabel: string;
	sentAt: Date;
	summary: ISummary[];
	details: IDetails[];
	evolution: IEvolution[];
	indicators: IIndicators;
	createdAt: Date;
	updatedAt: Date;
};

const SummarySchema = new Schema<ISummary>(
	{ 
		title: {
			type: String,
			required: true,
			trim: true,
		},
		value: {
			type: Number,
			required: true,
		}
	},
	{ _id: false }
);

const DetailSchema = new Schema<IDetails>(
	{
		obligation: {
			type: String,
			required: true,
			trim: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		dueDate: {
			type: Date,
			required: true,
		},
		documentType: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ _id: false }
);

const EvolutionSchema = new Schema<IEvolution>(
	{
		month: {
			type: String,
			required: true,
			trim: true,
		},
		amount: {
			type: Number,
			required: true,
		},
	},
	{ _id: false }
);

const IndicatorsSchema = new Schema<IIndicators>(
	{
		employees: {
			type: Number,
			required: true,
		},
		admitted: {
			type: Number,
			required: true,
		},
		dismissed: {
			type: Number,
			required: true,
		},
		avgCostPerEmployee: {
			type: Number,
			required: true,
		},
	},
	{ _id: false }
);

const payrollSchema = new Schema<IPayroll>({
	companyId: {
			type: Schema.Types.ObjectId,
			ref: COMPANY,
			required: true,
			index: true,
		},

		competence: {
			type: String,
			required: true,
			match: /^\d{4}-(0[1-9]|1[0-2])$/,
			index: true,
		},

		paymentTermLabel: {
			type: String,
			required: true,
		},

		sentAt: {
			type: Date,
			required: true,
		},

		summary: {
			type: [SummarySchema],
			default: [],
			required: true,
		},

		details: {
			type: [DetailSchema],
			default: [],
			required: true,
		},

		evolution: {
			type: [EvolutionSchema],
			default: [],
			required: true,
		},

		indicators: {
			type: IndicatorsSchema,
			required: true,
		},
	},
	{ timestamps: true, versionKey: false, }
);

payrollSchema.index(
  { companyId: 1, competence: 1 },
  { unique: true }
);

payrollSchema.set('toJSON', {
  virtuals: true,
});

payrollSchema.set('toObject', {
  virtuals: true,
});

payrollSchema.set('minimize', false);

export function getPayrollModel(connection: Connection) {
	return getModel(connection, PAYROLL, payrollSchema);
}
