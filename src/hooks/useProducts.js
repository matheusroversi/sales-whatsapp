import Api from "../core/app/client/AppClient";

export const useProducts = () => {
  const saveProducts = async object => {
    try {
      const result = await Api.saveProducts(object);

      return result;
    } catch (error) {
      console.log("saveProducts error", error);
      return error;
    }
  };

  return {
    saveProducts
  };
};
