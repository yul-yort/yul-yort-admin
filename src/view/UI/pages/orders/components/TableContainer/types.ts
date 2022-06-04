import { IOrderItemEntity } from "src/data/Order/entity/types";
import { ILocalityEntity } from "src/data/Locality/entity/types";

export interface IListProps {
  list: IOrderItemEntity[];
  filterByAgency: (value: string) => void;
  filterByPhone: (value: string) => void;
  localities: ILocalityEntity[];
  localitiesLoading: boolean;
  getLocalities: () => Promise<void>;
}
