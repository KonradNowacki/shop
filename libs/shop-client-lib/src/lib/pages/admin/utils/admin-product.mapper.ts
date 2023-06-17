import {AdminProductDto} from "@shop/common-api";
import {AdminProductModel} from "../+store/admin-product.model";

export class AdminProductMapper {
  static dtoToModel(product: AdminProductDto): AdminProductModel {
    const { id, name, price, category } = product;
    return { id, name, price, category, image: null };
  }

  static dtosToModel(products: AdminProductDto[]): AdminProductModel[] {
    return products.map(AdminProductMapper.dtoToModel)
  }
}
