import { Connection } from 'mongoose';

import { connectToDatabase } from './mongodb';

import { UserRepository } from '@/features/payroll/repositories/user.repository';
import { PayrollRepository } from '@/features/payroll/repositories/payroll.repository';
import { CompanyRepository } from '@/features/payroll/repositories/company.repository';
import { UserCompanyRepository } from '@/features/payroll/repositories/user-company.repository';
import { CompanyPayrollQueryRepository } from '@/features/payroll/repositories/company-payroll.query.repository';

import { UserService } from '@/features/payroll/services/user.service';
import { PayrollService } from '@/features/payroll/services/payroll.service';
import { CompanyService } from '@/features/payroll/services/company.service';
import { UserCompanyService } from '@/features/payroll/services/user-company.service';
import { CompanyPayrollService } from '@/features/payroll/services/company-payroll.query.service';

type Services = {
  connection: Connection | null;
  userService: UserService | null;
  payrollService: PayrollService | null;
  companyService: CompanyService | null;
  userCompanyService: UserCompanyService | null;
  companyPayrollService: CompanyPayrollService | null;
};

const globalForServices = globalThis as {
  services?: Services;
};

const services =
  globalForServices.services ?? {
    connection: null,
    userService: null,
    payrollService: null,
    companyService: null,
    userCompanyService: null,
    companyPayrollService: null,
  };

globalForServices.services = services;

async function getConnection(): Promise<Connection> {
  if (services.connection) {
    return services.connection;
  }

  services.connection = await connectToDatabase(
    'main',
    process.env.MONGODB_URI!
  );

  return services.connection;
}

export async function getPayrollService() {
  if (services.payrollService) {
    return services.payrollService;
  }

  const connection = await getConnection();

  const repository = new PayrollRepository(connection);

  services.payrollService = new PayrollService(repository);

  return services.payrollService;
}

export async function getCompanyService() {
  if (services.companyService) {
    return services.companyService;
  }

  const connection = await getConnection();

  const repository = new CompanyRepository(connection);

  services.companyService = new CompanyService(repository);

  return services.companyService;
}

export async function getCompanyPayrollService() {
  if (services.companyPayrollService) {
    return services.companyPayrollService;
  }

  const connection = await getConnection();

  const repository = new CompanyPayrollQueryRepository(connection);

  services.companyPayrollService = new CompanyPayrollService(repository);

  return services.companyPayrollService;
}

export async function getUserService() {
  if (services.userService) {
    return services.userService;
  }
  
  const connection = await getConnection();

  const repository = new UserRepository(connection);

  services.userService = new UserService(repository);

  return services.userService;
}

export async function getUserCompanyService() {
  if (services.userCompanyService) {
    return services.userCompanyService;
  }
  
  const connection = await getConnection();

  const repository = new UserCompanyRepository(connection);

  services.userCompanyService = new UserCompanyService(repository);

  return services.userCompanyService;
}