const hourly = Date.now(120000);

// Refresh basic parameters hourly
declare("InternetGatewayDevice.DeviceInfo.HardwareVersion", { path: hourly, value: hourly });
declare("InternetGatewayDevice.DeviceInfo.SoftwareVersion", { path: hourly, value: hourly });
declare("VirtualParameters.Ip", { path: hourly, value: hourly });
declare("VirtualParameters.MAC", { path: hourly, value: hourly });
declare("VirtualParameters.ppp_username", { path: hourly, value: hourly });
declare("InternetGatewayDevice.LANDevice.*.LANEthernetInterfaceConfig.*.MACAddress", { path: hourly, value: hourly });
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANIPConnection.*.ExternalIPAddress", { path: hourly, value: hourly });
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.SSID", { path: hourly, value: hourly });
// Don't refresh password field periodically because CPEs always report blank passowrds for security reasons
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.KeyPassphrase", { path: hourly, value: hourly });
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.PreSharedKey", { path: hourly, value: hourly });
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.X_TP_PreSharedKey", { path: hourly, value: hourly });
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.X_CUDY_Password", { path: hourly, value: hourly });
declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.HostName", { path: hourly, value: hourly });
declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.IPAddress", { path: hourly, value: hourly });
declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.MACAddress", { path: hourly, value: hourly });
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.Username", { path: hourly, value: hourly });
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.Password", { path: hourly, value: hourly });
declare("cwmp.connectionRequestAuth", { path: hourly, value: hourly });
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.Channel", { path: hourly, value: hourly });
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.AutoChannelEnable", { path: hourly, value: hourly });
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.X_TP_Band", { path: hourly, value: hourly });


// Obtem o modelo do roteador
let fabricante = declare("DeviceID.Manufacturer", { value: 1 }).value[0];

// Variável para definir o padrão do pppoe que a empresa usara dentro do preset do roteador
let default_user_pppoe = 'tr069';

//Condicional para roteador ZTE (Testado apenas em roteadores H199A e H198A)
if (fabricante == 'ZTE') {
    let ppp = declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.2.Username", { value: 1 }).value[0];
    if (ppp == default_user_pppoe) {
        let para_ssid24 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID";
        let para_ssid5 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.SSID";
        let para_key24 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.KeyPassphrase";
        let para_key5 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.KeyPassphrase";
        let para_ppp_user = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.2.Username";
        let para_ppp_pass = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.2.Password";
        configRoteador(para_ssid24,para_ssid5,para_key24,para_key5,para_ppp_user,para_ppp_pass)
    }
}
//Condicional para roteador TP-LINK (Testado apenas em roteadores ac750 e ac1200)
else if (fabricante == 'TP-Link') {
    let ppp = declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username", { value: 1 }).value[0];
    if (ppp == default_user_pppoe) {
        let para_ssid24 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID";
        let para_ssid5 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID";
        let para_key24 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_PreSharedKey";
        let para_key5 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.X_TP_PreSharedKey";
        let para_ppp_user = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username";
        let para_ppp_pass = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password";
        configRoteador(para_ssid24,para_ssid5,para_key24,para_key5,para_ppp_user,para_ppp_pass)
    }
}
//Condicional para roteador Cudy (Testado apenas em roteadores X6 US V2.0)
else if (fabricante == 'Cudy') {
    let ppp = declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username", { value: 1 }).value[0];
    if (ppp == default_user_pppoe) {
        let para_ssid24 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID";
        let para_ssid5 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID";
        let para_key24 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_CUDY_Password";
        let para_key5 = "InInternetGatewayDevice.LANDevice.1.WLANConfiguration.2.X_CUDY_Password";
        let para_ppp_user = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username";
        let para_ppp_pass = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password";
        configRoteador(para_ssid24,para_ssid5,para_key24,para_key5,para_ppp_user,para_ppp_pass)
    }
}
//Condicional para roteador Huawei (Testado apenas em roteadores AX2)
else if (fabricante == 'Huawei') {
    let ppp = declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username", { value: 1 }).value[0];
    if (ppp == default_user_pppoe) {
        let para_ssid24 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID";
        let para_ssid5 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID";
        let para_key24 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.PreSharedKey";
        let para_key5 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.PreSharedKey";
        let para_ppp_user = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username";
        let para_ppp_pass = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password";
        configRoteador(para_ssid24,para_ssid5,para_key24,para_key5,para_ppp_user,para_ppp_pass)
    }
}
//Condicional para roteador Dlink (Testado apenas em roteadores DIR-841)
else if (fabricante == 'D-LINK') {
    let ppp = declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username", { value: 1 }).value[0];
    if (ppp == default_user_pppoe) {
        let para_ssid24 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID";
        let para_ssid5 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.SSID";
        let para_key24 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.KeyPassphrase";
        let para_key5 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.KeyPassphrase";
        let para_ppp_user = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username";
        let para_ppp_pass = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password";
        configRoteador(para_ssid24,para_ssid5,para_key24,para_key5,para_ppp_user,para_ppp_pass)
    }
}
//Condicional para roteador Dlink (Testado apenas em roteadores MR30G)
else if (fabricante == 'MERCUSYS') {
    let ppp = declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username", { value: 1 }).value[0];
    if (ppp == default_user_pppoe) {
        let para_ssid24 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID";
        let para_ssid5 = "IInternetGatewayDevice.LANDevice.1.WLANConfiguration.3.SSID";
        let para_key24 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.KeyPassphrase";
        let para_key5 = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.KeyPassphrase";
        let para_ppp_user = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username";
        let para_ppp_pass = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password";
        configRoteador(para_ssid24,para_ssid5,para_key24,para_key5,para_ppp_user,para_ppp_pass)
    }
}

// Função para consultar dados do ERP e seta os parametros no roteador
function configRoteador(para_ssid24,para_ssid5,para_key24,para_key5,para_ppp_user,para_ppp_pass){
    let maclan = declare("InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.1.MACAddress", { value: 1 }).value[0];
    let macwan = declare("VirtualParameters.MAC", { value: 1 }).value[0];
    let respmacwan = ext("getMacwan", "getMacwan", macwan)
    if (respmacwan.status != 404) {
        log(respmacwan.login)
        log(respmacwan.senha)
        log(respmacwan.ssid)
        log(respmacwan.ssid5g)
        log(respmacwan.password)
        declare(para_ssid24, { value: 1 }, { value: respmacwan.ssid });
        declare(para_ssid5, { value: 1 }, { value: respmacwan.ssid5g });
        commit()
        declare(para_key24, { value: 1 }, { value: respmacwan.password });
        declare(para_key5, { value: 1 }, { value: respmacwan.password });
        commit()
        declare(para_ppp_pass, { value: 1 }, { value: respmacwan.senha });
        declare(para_ppp_user, { value: 1 }, { value: respmacwan.login });
        declare("Tags." + respmacwan.login, null, { value: true });
        commit()
    } else {
        let resplan = ext("getClientes", "getCliente", maclan);
        log(resplan.ppp)
        log(resplan.ppppass)
        log(resplan.ssid)
        log(resplan.ssid5g)
        log(resplan.password)
        declare(para_ssid24, { value: 1 }, { value: resplan.ssid });
        declare(para_ssid5, { value: 1 }, { value: resplan.ssid5g });
        commit()
        declare(para_key24, { value: 1 }, { value: resplan.password });
        declare(para_key5, { value: 1 }, { value: resplan.password });
        commit()
        declare(para_ppp_pass, { value: 1 }, { value: resplan.ppppass });
        declare(para_ppp_user, { value: 1 }, { value: resplan.ppp });
        declare("Tags." + resplan.ppp, null, { value: true });
        commit()
    }
}