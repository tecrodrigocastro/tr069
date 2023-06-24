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



let fabricante = declare("DeviceID.Manufacturer", { value: 1 }).value[0];

if (fabricante == 'ZTE') {
    let ppp = declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.2.Username", { value: 1 }).value[0];
    if (ppp == 'tr069') {
        let maclan = declare("InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.1.MACAddress", { value: 1 }).value[0];
        let macwan = declare("VirtualParameters.MAC", { value: 1 }).value[0];
        let respmacwan = ext("getMacwan", "getMacwan", macwan)
        if (respmacwan.status != 404) {
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID", { value: 1 }, { value: respmacwan.ssid });
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.SSID", { value: 1 }, { value: respmacwan.ssid5g });
            commit()
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.KeyPassphrase", { value: 1 }, { value: respmacwan.password });
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.KeyPassphrase", { value: 1 }, { value: respmacwan.password });
            commit()
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.2.Password", { value: 1 }, { value: respmacwan.senha });
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.2.Username", { value: 1 }, { value: respmacwan.login });
            declare("Tags." + respmacwan.login, null, { value: true });
            commit()
        } else {
            let resplan = ext("getClientes", "getCliente", maclan);
            log(resplan.ppp)
            log(resplan.ppppass)
            log(resplan.ssid)
            log(resplan.ssid5g)
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID", { value: 1 }, { value: resplan.ssid });
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.SSID", { value: 1 }, { value: resplan.ssid5g });
            commit()
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.KeyPassphrase", { value: 1 }, { value: resplan.password });
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.KeyPassphrase", { value: 1 }, { value: resplan.password });
            commit()
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.2.Password", { value: 1 }, { value: resplan.ppppass });
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.2.Username", { value: 1 }, { value: resplan.ppp });
            declare("Tags." + resplan.ppp, null, { value: true });
            commit()
        }
    }
}
else if (fabricante == 'TP-Link') {
    let ppp = declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username", { value: 1 }).value[0];
    if (ppp == 'tr069') {
        let maclan = declare("InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.1.MACAddress", { value: 1 }).value[0];
        let macwan = declare("VirtualParameters.MAC", { value: 1 }).value[0];
        let respmacwan = ext("getMacwan", "getMacwan", macwan)
        if (respmacwan.status != 404) {
            let senha_wifi = "Tuxnet" + respmacwan.senha
            log(respmacwan.login)
            log(respmacwan.senha)
            log(respmacwan.ssid)
            log(respmacwan.ssid5g)
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID", { value: 1 }, { value: respmacwan.ssid });
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID", { value: 1 }, { value: respmacwan.ssid5g });
            commit()
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_PreSharedKey", { value: 1 }, { value: senha_wifi });
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.X_TP_PreSharedKey", { value: 1 }, { value: senha_wifi });
            commit()
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password", { value: 1 }, { value: respmacwan.senha });
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username", { value: 1 }, { value: respmacwan.login });
            declare("Tags." + respmacwan.login, null, { value: true });
            commit()
        } else {
            let resplan = ext("getClientes", "getCliente", maclan);
            log(resplan.ppp)
            log(resplan.ppppass)
            log(resplan.ssid)
            log(resplan.ssid5g)
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID", { value: 1 }, { value: resplan.ssid });
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID", { value: 1 }, { value: resplan.ssid5g });
            commit()
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_PreSharedKey", { value: 1 }, { value: resplan.password });
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.X_TP_PreSharedKey", { value: 1 }, { value: resplan.password });
            commit()
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password", { value: 1 }, { value: resplan.ppppass });
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username", { value: 1 }, { value: resplan.ppp });
            declare("Tags." + resplan.ppp, null, { value: true });
            commit()
        }

    }
}





