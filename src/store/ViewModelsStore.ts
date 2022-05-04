import { IStoreServices, IStoreViewModels, IViewModels } from "./types";
import { AgencyVM } from "../view/viewModels/Agency";
import { UserVM } from "../view/viewModels/User";
import { NotificationsVM } from "../view/viewModels/NotificationsVM";

export class ViewModelsStore implements IStoreViewModels {
  private store: IViewModels = {};
  get notifications() {
    if (this.store.notifications) {
      return this.store.notifications;
    }

    this.store.notifications = new NotificationsVM();
    return this.store.notifications;
  }

  get agency() {
    if (this.store.agency) {
      return this.store.agency;
    }

    this.store.agency = new AgencyVM(this.notifications, this.services.agency);
    return this.store.agency;
  }

  get user() {
    if (this.store.user) {
      return this.store.user;
    }

    this.store.user = new UserVM(this.notifications, this.services.user);
    return this.store.user;
  }

  constructor(private services: IStoreServices) {}
}