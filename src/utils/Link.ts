import {Linking} from "react-native";

export const Link = {
  phone: (phoneNumber: string) => Linking.openURL(`tel:${phoneNumber}`),
  email: (email: string) => Linking.openURL(`mailto:${email}`),
  url: Linking.openURL,
  address: (address: string) => Linking.openURL(`https://maps.google.com/?q=${address}`)
}

export default Link;
