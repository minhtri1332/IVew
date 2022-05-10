export const urlProduct = "https://api";
export const urlProductMain = "https://api";

class ServiceClass {
  private urlProduct: string = "https://api.gw.trilucmaster.com/api/v1";

  getUrl = () => {
    return this.urlProduct;
  };

  change = async () => {
    const newLocale =
      this.urlProduct === urlProduct
        ? (this.urlProduct = urlProductMain)
        : (this.urlProduct = urlProduct);
    this.urlProduct = newLocale;
  };
}

const LocaleServiceUrl = new ServiceClass();
export default LocaleServiceUrl;
