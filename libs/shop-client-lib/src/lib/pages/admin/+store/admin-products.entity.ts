import {AdminProductModel} from "./admin-product.model";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";

function selectId(product: AdminProductModel): number {
  return product.id!;
}

function sortComparer(productA: AdminProductModel, productB: AdminProductModel): number {
  return productA.name.localeCompare(productB.name);
}

export const adminProductsAdapter: EntityAdapter<AdminProductModel> = createEntityAdapter<AdminProductModel>({
  selectId,
  sortComparer
});
