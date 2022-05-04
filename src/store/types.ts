import { IAgencyService } from "../data/services/Agency/types";
import { IAgencyRepository } from "../data/repositories/Agency/types";
import { IAgencyVM } from "../view/viewModels/Agency/types";
import { IApi } from "../libs/api/types";
import { Agency } from "../data/entities/Agency";
import { INotificationsVM } from "../view/viewModels/types";
import { IUserService } from "../data/services/User/types";
import { User } from "../data/entities/User";
import { IUserRepository } from "../data/repositories/User/types";
import { IUserVM } from "../view/viewModels/User/types";

export interface ILibs {
  api?: IApi;
}
export interface IStoreLibs extends Required<ILibs> {}

export interface IDomains {
  agency?: Agency;
  user?: User;
}

export interface IStoreDomains extends Required<IDomains> {}

export interface IRepositories {
  agency?: IAgencyRepository;
  user?: IUserRepository;
}

export interface IStoreRepositories extends Required<IRepositories> {}

export interface IServices {
  agency?: IAgencyService;
  user?: IUserService;
}

export interface IStoreServices extends Required<IServices> {}

export interface IViewModels {
  agency?: IAgencyVM;
  notifications?: INotificationsVM;
  user?: IUserVM;
}

export interface IStoreViewModels extends Required<IViewModels> {}