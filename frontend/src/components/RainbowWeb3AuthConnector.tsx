import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import { chainConfig, web3AuthInstance } from "@/lib/wagmi-config";

const name = "Login Via Social";
const iconUrl = "https://web3auth.io/docs/content-hub/logo-ethereum.png";

//@ts-ignore
export const rainbowWeb3AuthConnector = ({ chains }) => {
  // Create Web3Auth Instance

  // Add openlogin adapter for customisations
  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig: chainConfig() },
  });
  const openloginAdapterInstance = new OpenloginAdapter({
    privateKeyProvider,
    adapterSettings: {
      uxMode: "redirect",
      whiteLabel: {
        appName: "Articulaa",
        logoLight: "https://web3auth.io/images/web3auth-logo.svg",
        logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
        defaultLanguage: "en",
        //dark: true, // whether to enable dark mode. defaultValue: false
      },
    },
  });
  web3AuthInstance.configureAdapter(openloginAdapterInstance);

  // Add Torus Wallet Plugin
  const torusPlugin = new TorusWalletConnectorPlugin({
    torusWalletOpts: {
      buttonPosition: "bottom-left",
    },
    walletInitOptions: {
      whiteLabel: {
        theme: { isDark: false, colors: { primary: "#00a8ff" } },
        logoDark: iconUrl,
        logoLight: iconUrl,
      },
      useWalletConnect: true,
      enableLogging: true,
    },
  });
  web3AuthInstance.addPlugin(torusPlugin);
  return {
    id: "web3auth",
    name,
    iconUrl,
    iconBackground: "#fff",
    createConnector: () => {
      const connector = new Web3AuthConnector({
        chains: chains,
        options: {
          web3AuthInstance,
          loginParams: {
            loginProvider: "google",
          },
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: "google",
              loginMethods: {
                google: {
                  name: "google",
                },
                facebook: {
                  name: "facebook",
                  // showOnModal: false,
                },
              },
            },
            [WALLET_ADAPTERS.WALLET_CONNECT_V2]: {
              label: "Wallet Connect",
              showOnModal: false,
            },
            [WALLET_ADAPTERS.TORUS_EVM]: {
              label: "Torus EVM",
              showOnModal: false,
            },
            [WALLET_ADAPTERS.METAMASK]: {
              label: "Metamask",
              showOnModal: false,
            },
            // [WALLET_ADAPTERS.COINBASE]: {
            //   label: "Coinbase",
            //   showOnModal: false,
            // },
          },
        },
      });
      return {
        connector,
      };
    },
  };
};

// // Web3Auth Libraries
// import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
// import { Web3Auth } from "@web3auth/modal";
// import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
// import { OpenloginAdapter, OPENLOGIN_NETWORK } from "@web3auth/openlogin-adapter";
// import { CHAIN_NAMESPACES, WALLET_ADAPTERS  } from "@web3auth/base";
// import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
// import { Chain } from "wagmi";

// export default function Web3AuthConnectorInstance(chains: Chain[]) {
//   // Create Web3Auth Instance
//   const iconUrl = "https://web3auth.io/docs/contents/logo-ethereum.png";
//   const chainConfig = {
//     chainNamespace: CHAIN_NAMESPACES.EIP155,
//     chainId: "0x" + chains[0].id.toString(16),
//     rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
//     displayName: chains[0].name,
//     tickerName: chains[0].nativeCurrency?.name,
//     ticker: chains[0].nativeCurrency?.symbol,
//     blockExplorer: chains[0].blockExplorers?.default.url[0] as string,
//   };

//   const web3AuthInstance = new Web3Auth({
//     clientId: "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ",
//     chainConfig,
//     // uiConfig refers to the whitelabeling options, which is available only on Growth Plan and above
//     // Please remove this parameter if you're on the Base Plan
//     uiConfig: {
//       appName: "W3A",
//       // appLogo: "https://web3auth.io/images/web3auth-logo.svg", // Your App Logo Here
//       theme: {
//         primary: "red",
//       },
//       mode: "dark",
//       logoLight: "https://web3auth.io/images/web3auth-logo.svg",
//       logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
//       defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
//       loginGridCol: 3,
//       primaryButton: "externalLogin", // "externalLogin" | "socialLogin" | "emailLogin"
//       modalZIndex: "2147483647",
//     },
//     web3AuthNetwork: OPENLOGIN_NETWORK.SAPPHIRE_MAINNET,
//     enableLogging: true,
//   });

//   // Add openlogin adapter for customisations
//   const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });
//   const openloginAdapterInstance = new OpenloginAdapter({
//     privateKeyProvider,
//     adapterSettings: {
//       uxMode: "redirect",
//     },
//   });
//   web3AuthInstance.configureAdapter(openloginAdapterInstance);

//   // Add Torus Wallet Plugin (optional)
//   const torusPlugin = new TorusWalletConnectorPlugin({
//     torusWalletOpts: {
//       buttonPosition: "bottom-left",
//     },
//     walletInitOptions: {
//       whiteLabel: {
//         theme: {
//           isDark: false,
//           colors: {
//             primary: "#00a8ff",
//           },
//         },
//         logoDark: iconUrl,
//         logoLight: iconUrl,
//       },
//       useWalletConnect: true,
//       enableLogging: true,
//     },
//   });
//   web3AuthInstance.addPlugin(torusPlugin);

//   return new Web3AuthConnector({
//     chains: chains as any,
//     options: {
//       web3AuthInstance,
//       modalConfig: {
//         [WALLET_ADAPTERS.OPENLOGIN]: {
//           label: "Social Login",
//           loginMethods: {
//             facebook: {
//               name: "facebook",
//               showOnModal: false,
//             },
//           },
//         },
//         [WALLET_ADAPTERS.WALLET_CONNECT_V2]: {
//           label: "Wallet Connect",
//           showOnModal: false,
//         },
//         [WALLET_ADAPTERS.TORUS_EVM]: {
//           label: "Torus EVM",
//           showOnModal: false,
//         },
//         [WALLET_ADAPTERS.METAMASK]: {
//           label: "Metamask",
//           showOnModal: false,
//         },
//         [WALLET_ADAPTERS.COINBASE]: {
//           label: "Coinbase",
//           showOnModal: false,
//         },
//       },
//     },
//   });
// }
