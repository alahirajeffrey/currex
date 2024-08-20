import bip39 from "bip39";

export default class WalletService {
  constructor() {}

  async generateSeedPhrase() {
    return bip39.generateMnemonic();
  }
}
