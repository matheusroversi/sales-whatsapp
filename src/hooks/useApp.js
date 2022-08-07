import Api from "../core/app/client/AppClient";

export const useProducts = () => {
  const reloadData = async () => {
    try {
      await Api.requestProducts(object);

      return result;
    } catch (error) {
      console.log("saveProducts:error", error);
      throw error;
    }
  };

  return {
    reloadData
  };
};
