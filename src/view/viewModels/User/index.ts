import { BaseVM } from "../BaseVM";
import { makeObservable, observable } from "mobx";

import { IUserEntity } from "../../../data/User/entity/types";
import { IUserService } from "../../../data/User/service/types";
import { IUserVM } from "./types";
import { INotificationsVM } from "../types";
import { IFormValues } from "src/view/UI/pages/login/types";
import Cookies from "js-cookie";
import { CONSTANTS } from "src/constants";
import { User } from "../../../data/User/entity";

export class UserVM extends BaseVM implements IUserVM {
  user: IUserEntity | null = null;
  get authorized(): boolean {
    return !!Cookies.get(CONSTANTS.tokenCookieKey);
  }

  constructor(
    notificationsVM: INotificationsVM,
    private service: IUserService
  ) {
    super(notificationsVM);
    this.user = new User({ id: 0 });
    makeObservable(this, {
      user: observable,
    });
  }

  login = async (data: IFormValues): Promise<void> => {
    this.setLoading();
    this.unsetError();

    try {
      await this.service.login(data);
      this.notify.successNotification("Добро пожаловать!");
    } catch (err) {
      this.setError(err);
    } finally {
      this.unsetLoading();
    }
  };

  logout = async (): Promise<void> => {
    this.setLoading();
    this.unsetError();

    try {
      await this.service.logout();
      this.notify.successNotification("До скорых встреч!");
    } catch (err) {
      this.setError(err);
    } finally {
      this.unsetLoading();
    }
  };
}
