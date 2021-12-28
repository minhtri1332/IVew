export interface RawFile {
  height: number | string;
  mime: string;
  modificationDate: string;
  name: string;
  path: string;
  size: string;
  type: string;
  uri: string;
  width: number | string;
}
export const urlProduct = 'https://api.cxview.ai:8081';
export const urlProductMain = 'https://api.cxview.ai';

// https://api.cxview.ai:8081
// https://api.cxview.ai

class ServiceClass {
  private urlProduct: string = 'https://api.cxview.ai';

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
