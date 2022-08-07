import Api from "../core/app/client/AppClient";

export const useProducts = () => {
  const saveProducts = async object => {
    try {
      const result = await Api.saveProducts(object);
      return result;
    } catch (error) {
      console.log("saveProducts:error", error);
      throw error;
    }
  };

  const deleteProduct = async id => {
    try {
      const result = await Api.deleteProduct(id);
      return result;
    } catch (error) {
      console.log("deleteProduct:error", error);
      throw error;
    }
  };

  return {
    saveProducts,
    deleteProduct
  };
};
